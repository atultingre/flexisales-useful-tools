import { useState } from "react";
import { Button, Input, notification, Radio } from "antd";

const ListGenerator = () => {
  const [content, setContent] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");
  const [listType, setListType] = useState("ol"); // Default to "ol" for ordered list
  const [previewHtml, setPreviewHtml] = useState("");

  const handleGenerateCode = () => {
    // Remove bullets and trim each line
    const cleanedContent = content
      .split(/\n+/)
      .map((line) =>
        line
          .replace(/^[•o]+\s*/, "") // Remove specific bullets like •, o, 
          .trim()
      )
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
    const listTag = listType === "ol" ? "ol" : "ul";

    // Create HTML code with the filtered content
    const htmlCode = `
${heading ? `<p class="mb-3 last:mb-0"><b>${heading}</b></p>` : ""}
<${listTag}>
${filteredContent
  .map((item) => {
    const [boldPart, ...rest] = item.split(":");
    return `<li><b>${boldPart.trim()}:</b> ${rest.join(":").trim()}</li>`;
  })
  .join("\n")}
</${listTag}>`;

    setGeneratedCode(htmlCode.trim());
    setPreviewHtml(htmlCode.trim()); // Update preview with generated code

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
    setPreviewHtml(""); // Clear preview
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">HTML Code Generator</h2>
      <Radio.Group
        onChange={(e) => setListType(e.target.value)}
        value={listType}
        className="mb-4"
      >
        <Radio value="ol">Ordered List</Radio>
        <Radio value="ul">Unordered List</Radio>
      </Radio.Group>
      <Input.TextArea
        rows={10}
        placeholder="Paste your content here"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="mb-4 p-2 border border-gray-300 rounded"
      />
      <div className="flex space-x-2 mb-4">
        <Button type="primary" onClick={handleGenerateCode}>
          Generate Code
        </Button>
        <Button type="primary" onClick={handleCopyToClipboard}>
          Copy to Clipboard
        </Button>
        <Button type="danger" onClick={handleClear}>
          Clear All
        </Button>
      </div>
      <div className="flex space-x-4">
        <div className="w-1/2 pl-2">
          <h3 className="text-lg font-semibold mb-2">Generated Code</h3>
          <Input.TextArea
            rows={10}
            placeholder="Generated HTML code will appear here"
            value={generatedCode}
            readOnly
            className="p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="w-1/2 pr-2">
          <h3 className="text-lg font-semibold mb-2">Preview</h3>
          <div
            className="p-2 border border-gray-300 rounded"
            dangerouslySetInnerHTML={{ __html: previewHtml }}
          />
        </div>
      </div>
    </div>
  );
};

export default ListGenerator;
