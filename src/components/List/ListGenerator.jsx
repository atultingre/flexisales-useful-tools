import { useState } from "react";
import { Button, Input, notification, Radio } from "antd";

const ListGenerator = () => {
  const [content, setContent] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");
  const [listType, setListType] = useState("ul-bold"); // Default to bold unordered list
  const [previewHtml, setPreviewHtml] = useState("");

  const handleGenerateCode = () => {
    // Remove bullets and trim each line
    const cleanedContent = content
      .split(/\n+/)
      .map((line) => line.replace(/^[•o]+\s*/, "").trim())
      .filter((line) => line);

    // Check if the first line is a heading or part of the list
    const firstLineIsHeading = /^[A-Za-z\s]+:$/.test(cleanedContent[0]);

    // Extract heading if it exists
    const heading = firstLineIsHeading ? cleanedContent[0] : null;

    // Filter out the heading if it exists
    const filteredContent = firstLineIsHeading
      ? cleanedContent.slice(1)
      : cleanedContent;

    // Determine list type based on selection
    const isBold = listType.includes("bold");
    const listTag = listType.includes("ol") ? "ol" : "ul";

    // Create HTML code with the filtered content
    const htmlCode = `
${heading ? `<p class="mb-3 last:mb-0">${heading}</p>` : ""}
<${listTag} id="list">
${filteredContent
  .map((item) => {
    if (isBold) {
      const [boldPart, ...rest] = item.split(":");
      return `<li><b>${boldPart.trim()}:</b> ${rest.join(":").trim()}</li>`;
    }
    return `<li>${item}</li>`;
  })
  .join("\n")}
</${listTag}>`;

    setGeneratedCode(htmlCode.trim());
    setPreviewHtml(htmlCode.trim());

    notification.success({
      message: "Code Generated",
      description: "The HTML code has been generated successfully.",
    });
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(generatedCode);
    notification.success({
      message: "Copied",
      description: "The generated code has been copied to the clipboard.",
    });
  };

  const handleClear = () => {
    setContent("");
    setGeneratedCode("");
    setPreviewHtml("");
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">HTML List Generator</h2>
      <Radio.Group
        onChange={(e) => setListType(e.target.value)}
        value={listType}
        className="mb-4"
      >
        <Radio value="ul-bold" className="font-bold">
          Unordered List Bold with :
        </Radio>
        <Radio value="ul-normal" className="font-bold">
          Unordered List Normal
        </Radio>
        <Radio value="ol-bold">Ordered List Bold with :</Radio>
        <Radio value="ol-normal">Ordered List Normal</Radio>
      </Radio.Group>
      <Input.TextArea
        rows={5}
        placeholder="Paste your content here"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="mb-4 p-2 border border-gray-300 rounded"
      />
      <div className="flex flex-col md:flex-row gap-3 w-full mb-4">
        <Button type="primary" className="w-full" onClick={handleGenerateCode}>
          Generate Code
        </Button>
        <Button type="primary" className="w-full" onClick={handleCopyToClipboard}>
          Copy to Clipboard
        </Button>
        <Button type="dashed" className="w-full" danger onClick={handleClear}>
          Clear All
        </Button>
      </div>
      <div className="flex flex-col md:flex-row space-x-4">
        <div className="w-full pl-2">
          <h3 className="text-lg font-semibold mb-2">Generated Code</h3>
          <Input.TextArea
            rows={6}
            placeholder="Generated HTML code will appear here"
            value={generatedCode}
            readOnly
            className="p-2 border border-gray-300 rounded"
          />
        </div>
        {generatedCode && (
          <div className="w-full pr-2">
            <h3 className="text-lg font-semibold mb-2">Preview</h3>
            <div
              className="p-2 border border-gray-300 rounded"
              dangerouslySetInnerHTML={{ __html: previewHtml }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ListGenerator;
