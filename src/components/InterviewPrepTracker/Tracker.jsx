import React, { useEffect, useMemo, useState } from "react";
import {
  Search,
  CheckCircle2,
  Circle,
  Cloud,
  Download,
  Upload,
  RotateCcw,
  BookOpen,
  Target,
  TrendingUp,
  ChevronDown,
  ChevronRight,
  StickyNote,
  Database,
  Laptop,
  X,
} from "lucide-react";
import { allSections } from "./data.js";
import "./styles1.css";

const STORAGE_KEY = "fullstack-interview-tracker-v1";
const API_BASE =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api/progress";

function loadProgress() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch {
    return {};
  }
}
function makeId(section, group, text) {
  return `${section}::${group}::${text}`;
}
function downloadJSON(data) {
  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "interview-progress.json";
  a.click();
  URL.revokeObjectURL(url);
}

export default function Tracker() {
  const [progress, setProgress] = useState(loadProgress);
  const [active, setActive] = useState(allSections[0].name);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [expanded, setExpanded] = useState({});
  const [syncId, setSyncId] = useState(
    localStorage.getItem("interview-sync-id") || "",
  );
  const [cloudState, setCloudState] = useState({
    status: "idle",
    message: "Cloud backup is optional.",
  });
  const [showCloud, setShowCloud] = useState(false);
  const [showNotes, setShowNotes] = useState(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);
  useEffect(() => {
    localStorage.setItem("interview-sync-id", syncId);
  }, [syncId]);

  const records = useMemo(() => {
    return allSections.flatMap((section) =>
      section.groups.flatMap((group) =>
        group.items.map((item) => ({
          ...item,
          section: section.name,
          group: group.name,
          id: makeId(section.name, group.name, item.text),
        })),
      ),
    );
  }, []);
  const completed = records.filter((r) => progress[r.id]?.done).length;
  const percent = records.length
    ? Math.round((completed / records.length) * 100)
    : 0;
  const activeSection =
    allSections.find((s) => s.name === active) || allSections[0];
  const sectionStats = (name) => {
    const items = records.filter((r) => r.section === name);
    const done = items.filter((r) => progress[r.id]?.done).length;
    return {
      done,
      total: items.length,
      pct: items.length ? Math.round((done / items.length) * 100) : 0,
    };
  };
  const visibleGroups = activeSection.groups
    .map((group) => ({
      ...group,
      items: group.items
        .map((item) => ({
          ...item,
          id: makeId(activeSection.name, group.name, item.text),
        }))
        .filter((item) => {
          const done = !!progress[item.id]?.done;
          const matchesQuery =
            `${item.text} ${group.name} ${activeSection.name}`
              .toLowerCase()
              .includes(query.toLowerCase());
          const matchesFilter =
            filter === "all" ||
            (filter === "done" && done) ||
            (filter === "todo" && !done);
          return matchesQuery && matchesFilter;
        }),
    }))
    .filter((g) => g.items.length);

  function toggleItem(id) {
    setProgress((old) => ({
      ...old,
      [id]: {
        ...old[id],
        done: !old[id]?.done,
        updatedAt: new Date().toISOString(),
      },
    }));
  }
  function updateNote(id, note) {
    setProgress((old) => ({
      ...old,
      [id]: { ...old[id], note, updatedAt: new Date().toISOString() },
    }));
  }
  function resetProgress() {
    if (confirm("Reset all checklist progress and notes on this device?"))
      setProgress({});
  }
  async function cloudRequest(method, body) {
    if (!syncId.trim()) {
      setCloudState({ status: "error", message: "Enter a Sync ID first." });
      return;
    }
    setCloudState({ status: "loading", message: "Connecting to cloud..." });
    try {
      const response = await fetch(
        `${API_BASE}/${encodeURIComponent(syncId.trim())}`,
        {
          method,
          headers: { "Content-Type": "application/json" },
          ...(body ? { body: JSON.stringify(body) } : {}),
        },
      );
      const data = await response.json().catch(() => ({}));
      if (!response.ok)
        throw new Error(data.error || `Request failed (${response.status})`);
      if (method === "PUT")
        setCloudState({
          status: "success",
          message: "Progress backed up to MongoDB.",
        });
      else if (data.progress) {
        if (
          confirm(
            "Replace this browser's current progress with the cloud copy?",
          )
        ) {
          setProgress(data.progress);
          setCloudState({
            status: "success",
            message: "Progress restored from MongoDB.",
          });
        } else
          setCloudState({
            status: "idle",
            message: "Restore cancelled; local progress kept.",
          });
      } else
        setCloudState({
          status: "idle",
          message: "No cloud backup found for this Sync ID.",
        });
    } catch (err) {
      setCloudState({
        status: "error",
        message: `${err.message}. Check that the API is running and MongoDB is configured.`,
      });
    }
  }
  function importJSON(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(reader.result);
        if (!parsed || typeof parsed !== "object" || Array.isArray(parsed))
          throw new Error("Invalid progress file");
        if (confirm("Import this file and replace current progress?"))
          setProgress(parsed);
      } catch {
        alert("Could not read that progress file.");
      }
      event.target.value = "";
    };
    reader.readAsText(file);
  }

  return (
    <div className="app-shell">
      {/* <header className="topbar">
        <div className="brand">
          <div className="brand-mark">
            <BookOpen size={20} />
          </div>
          <div>
            <strong>PrepTrack</strong>
            <span>Full Stack Interview Preparation</span>
          </div>
        </div>
        <div className="top-actions">
          <button
            className="ghost-button"
            onClick={() => setShowCloud((v) => !v)}
          >
            <Cloud size={16} /> Cloud backup
          </button>
          <button
            className="icon-button"
            title="Export progress"
            onClick={() => downloadJSON(progress)}
          >
            <Download size={17} />
          </button>
          <label className="icon-button upload-label" title="Import progress">
            <Upload size={17} />
            <input
              type="file"
              accept="application/json"
              onChange={importJSON}
            />
          </label>
        </div>
      </header> */}

      {/* {showCloud && (
        <section className="cloud-panel">
          <div className="cloud-heading">
            <div>
              <Database size={18} />
              <strong>Optional MongoDB cloud backup</strong>
            </div>
            <button className="plain-icon" onClick={() => setShowCloud(false)}>
              <X size={17} />
            </button>
          </div>
          <p>
            Local storage works without a backend. Add a Sync ID to back up or
            restore progress through your own MongoDB API.
          </p>
          <div className="cloud-controls">
            <input
              value={syncId}
              onChange={(e) => setSyncId(e.target.value)}
              placeholder="Choose a private Sync ID"
            />
            <button
              className="primary-button"
              disabled={cloudState.status === "loading"}
              onClick={() => cloudRequest("PUT", { progress })}
            >
              Sync to cloud
            </button>
            <button
              className="secondary-button"
              disabled={cloudState.status === "loading"}
              onClick={() => cloudRequest("GET")}
            >
              Restore from cloud
            </button>
          </div>
          <div className={`cloud-status ${cloudState.status}`}>
            {cloudState.message}
          </div>
          <small>
            Do not use a password as your Sync ID. This starter API has no user
            authentication; add auth before exposing it publicly.
          </small>
        </section>
      )} */}

      <main className="main">
        <section className="welcome">
          <div>
            <div className="eyebrow">YOUR LEARNING WORKSPACE</div>
            <h1>Make every study session count.</h1>
            <p>
              Track theory, coding practice, projects, and interview readiness
              in one place.
            </p>
          </div>
          <div className="welcome-icon">
            <Target size={42} />
          </div>
        </section>

        <section className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon purple">
              <Target size={18} />
            </div>
            <span>Overall progress</span>
            <strong>{percent}%</strong>
            <div className="progress-track">
              <div style={{ width: `${percent}%` }} />
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon green">
              <CheckCircle2 size={18} />
            </div>
            <span>Completed items</span>
            <strong>
              {completed}
              <small> / {records.length}</small>
            </strong>
            <em>Keep building consistency</em>
          </div>
          <div className="stat-card">
            <div className="stat-icon blue">
              <BookOpen size={18} />
            </div>
            <span>Topics covered</span>
            <strong>{allSections.length}</strong>
            <em>Frontend, backend & beyond</em>
          </div>
          <div className="stat-card">
            <div className="stat-icon orange">
              <TrendingUp size={18} />
            </div>
            <span>Topics started</span>
            <strong>
              {allSections.filter((s) => sectionStats(s.name).done > 0).length}
            </strong>
            <em>At least one item completed</em>
          </div>
        </section>

        <div className="workspace">
          <aside className="sidebar">
            <div className="side-title">
              YOUR CURRICULUM <span>{allSections.length}</span>
            </div>
            <div className="topic-list">
              {allSections.map((section) => {
                const s = sectionStats(section.name);
                return (
                  <button
                    key={section.name}
                    className={`topic-link ${active === section.name ? "active" : ""}`}
                    onClick={() => setActive(section.name)}
                  >
                    <span className="topic-name">{section.name}</span>
                    <span className="topic-meta">
                      {s.done}/{s.total}
                    </span>
                    <span className="mini-track">
                      <i style={{ width: `${s.pct}%` }} />
                    </span>
                  </button>
                );
              })}
            </div>
            <button className="reset-button" onClick={resetProgress}>
              <RotateCcw size={15} /> Reset all progress
            </button>
          </aside>

          <section className="content-panel">
            <div className="content-heading">
              <div>
                <div className="eyebrow">STUDY TOPIC</div>
                <h2>{activeSection.name}</h2>
                <p>
                  {sectionStats(active).done} of {sectionStats(active).total}{" "}
                  completed
                </p>
              </div>
              <div
                className="topic-ring"
                style={{ "--pct": `${sectionStats(active).pct}%` }}
              >
                <span>{sectionStats(active).pct}%</span>
              </div>
            </div>
            <div className="toolbar">
              <div className="search-box">
                <Search size={17} />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search questions and tasks..."
                />
                {query && (
                  <button onClick={() => setQuery("")}>
                    <X size={14} />
                  </button>
                )}
              </div>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="all">All items</option>
                <option value="todo">To do</option>
                <option value="done">Completed</option>
              </select>
            </div>
            {visibleGroups.length === 0 ? (
              <div className="empty-state">
                <Search size={24} />
                <strong>No matching items</strong>
                <span>Try another search or filter.</span>
              </div>
            ) : (
              visibleGroups.map((group, idx) => (
                <div className="task-group" key={group.name}>
                  <button
                    className="group-heading"
                    onClick={() =>
                      setExpanded((old) => ({
                        ...old,
                        [`${active}-${group.name}`]:
                          old[`${active}-${group.name}`] === false
                            ? true
                            : false,
                      }))
                    }
                  >
                    <span>
                      {expanded[`${active}-${group.name}`] === false ? (
                        <ChevronRight size={17} />
                      ) : (
                        <ChevronDown size={17} />
                      )}
                    </span>
                    <strong>{group.name}</strong>
                    <small>
                      {group.items.filter((i) => progress[i.id]?.done).length}/
                      {group.items.length}
                    </small>
                  </button>
                  {expanded[`${active}-${group.name}`] !== false && (
                    <div className="task-list">
                      {group.items.map((item) => {
                        const done = !!progress[item.id]?.done;
                        const hasNote = !!progress[item.id]?.note;
                        return (
                          <div
                            className={`task-row ${done ? "is-done" : ""}`}
                            key={item.id}
                          >
                            <button
                              className="check-button"
                              aria-label={
                                done ? "Mark incomplete" : "Mark complete"
                              }
                              onClick={() => toggleItem(item.id)}
                            >
                              {done ? (
                                <CheckCircle2 size={20} />
                              ) : (
                                <Circle size={20} />
                              )}
                            </button>
                            <span className="task-text">{item.text}</span>
                            <button
                              className={`note-button ${hasNote ? "has-note" : ""}`}
                              title="Add note"
                              onClick={() => setShowNotes(item.id)}
                            >
                              <StickyNote size={16} />
                            </button>
                            {showNotes === item.id && (
                              <div className="note-editor">
                                <div>
                                  <strong>Study note</strong>
                                  <button onClick={() => setShowNotes(null)}>
                                    <X size={15} />
                                  </button>
                                </div>
                                <textarea
                                  autoFocus
                                  value={progress[item.id]?.note || ""}
                                  onChange={(e) =>
                                    updateNote(item.id, e.target.value)
                                  }
                                  placeholder="Add an explanation, code link, or revision note..."
                                />
                                <button
                                  className="primary-button"
                                  onClick={() => setShowNotes(null)}
                                >
                                  Save note
                                </button>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              ))
            )}
            <div className="content-footer">
              <Laptop size={16} /> Progress saves automatically in this browser.
            </div>
          </section>
        </div>
        <footer>
          PrepTrack · Your progress stays on this device unless you choose cloud
          backup.
        </footer>
      </main>
    </div>
  );
}
