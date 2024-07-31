import { Button, Input, notification } from "antd";
import { useState } from "react";

const BulkLinkOpener = () => {
  const [links, setLinks] = useState("");

  const handleOpenLinks = () => {
    // Split the input by new lines or commas, trim each link, and filter out empty strings
    const linksArray = links
      .split(/[\n,]+/)
      .map((link) => link.trim())
      .filter((link) => link);

    // Ensure all links have a protocol
    const processedLinks = linksArray.map(link => {
      // Add http:// if protocol is missing
      if (!/^https?:\/\//i.test(link)) {
        return `http://${link}`;
      }
      return link;
    });

    // Check if there are any valid links
    if (processedLinks.length === 0) {
      notification.error({
        message: "No Links Found",
        description: "Please enter at least one valid link.",
      });
      return;
    }

    // Open each link in a new tab with a delay to handle pop-up blockers
    processedLinks.forEach((link, index) => {
      setTimeout(() => {
        window.open(link, "_blank");
      }, index * 100); // Adjust delay if needed (in milliseconds)
    });

    notification.success({
      message: "Links Opened",
      description: `${processedLinks.length} link(s) have been opened in new tabs.`,
    });
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Bulk Link Opener</h2>
      <div className="mb-4">
        <Input.TextArea
          rows={10}
          placeholder="Paste your links here, separated by new lines or commas"
          value={links}
          onChange={(e) => setLinks(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        />
      </div>
      <Button type="primary" onClick={handleOpenLinks} className="w-full">
        Open Links
      </Button>
    </div>
  );
};

export default BulkLinkOpener;
