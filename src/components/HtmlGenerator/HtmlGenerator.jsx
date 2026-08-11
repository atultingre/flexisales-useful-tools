import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import toast from "react-hot-toast";

const HtmlGenerator = () => {
  const [content, setContent] = useState("");
  const [generatedHtml, setGeneratedHtml] = useState("");

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ align: [] }],
      ["link"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    "bullet",
    "align",
    "link",
  ];

  const generateHTML = () => {
    if (!content.trim()) {
      setGeneratedHtml("");
      return;
    }

    const parser = new DOMParser();
    const doc = parser.parseFromString(content, "text/html");

    const output = [];

    Array.from(doc.body.children).forEach((element) => {
      const tagName = element.tagName.toLowerCase();

      // Paragraph
      if (tagName === "p") {
        const text = element.innerHTML.trim();

        if (text) {
          output.push(`<p>${text}</p>`);
        }
      }

      // Headings
      else if (["h1", "h2", "h3"].includes(tagName)) {
        output.push(`<${tagName}>${element.innerHTML.trim()}</${tagName}>`);
      }

      // Unordered list
      else if (tagName === "ul") {
        const items = Array.from(element.querySelectorAll(":scope > li"))
          .map((li) => `  <li>${li.innerHTML.trim()}</li>`)
          .join("\n");

        if (items) {
          output.push(`<ul>\n${items}\n</ul>`);
        }
      }

      // Ordered list
      else if (tagName === "ol") {
        const items = Array.from(element.querySelectorAll(":scope > li"))
          .map((li) => `  <li>${li.innerHTML.trim()}</li>`)
          .join("\n");

        if (items) {
          output.push(`<ol>\n${items}\n</ol>`);
        }
      }

      // Other elements
      else {
        output.push(element.outerHTML);
      }
    });

    setGeneratedHtml(output.join("\n"));
  };

  const copyHTML = async () => {
    try {
      await navigator.clipboard.writeText(generatedHtml);

      toast.success("HTML copied successfully!");
    } catch (error) {
      console.error("Copy failed:", error);

      toast.error("Failed to copy HTML");
    }
  };

  return (
    <div className=" " style={{ padding: "10px" }}>
      <div className="mx-auto max-w-7xl">
        {/* <h1 className="mb-6 text-1xl font-bold">HTML Generator</h1> */}

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Rich Text Editor */}
          <div className="rounded-xl bg-white p-2 shadow">
            <h2 className="mb-4 text-xl font-semibold">Content Editor</h2>

            <ReactQuill
              theme="snow"
              value={content}
              onChange={setContent}
              modules={modules}
              formats={formats}
              placeholder="Write or paste your content here..."
              className="h-[450px] mb-14"
            />

            <div className="mb-4 flex items-center gap-5">
              <button
                onClick={generateHTML}
                className="rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white hover:bg-blue-700"
              >
                Generate HTML
              </button>

              <button
                onClick={() => {
                  setContent("");
                  setGeneratedHtml("");
                  toast.success("Content cleared successfully!");
                }}
                className="rounded-lg bg-red-600 px-5 py-2.5 font-medium text-white hover:bg-red-700"
              >
                Clear
              </button>

              {generatedHtml && (
                <button
                  onClick={copyHTML}
                  className="rounded-lg bg-gray-800 px-5 py-2.5 text-sm text-white hover:bg-gray-900"
                >
                  Copy HTML
                </button>
              )}
            </div>
          </div>

          {/* HTML Output */}
          <div className="rounded-xl bg-white p-2 shadow">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold">Generated HTML</h2>
            </div>

            <pre className="h-[500px] overflow-auto rounded-lg bg-gray-900 p-5 text-sm text-green-400">
              <code>{generatedHtml}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HtmlGenerator;
