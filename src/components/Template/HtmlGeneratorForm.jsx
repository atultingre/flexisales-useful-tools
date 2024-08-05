import React, { useState } from "react";
import { Input, Button, Form } from "antd";
import "antd/dist/reset.css"; // Import Ant Design styles
import "tailwindcss/tailwind.css"; // Import Tailwind CSS styles

const HtmlGeneratorForm = () => {
  const [form] = Form.useForm();
  const [htmlCode, setHtmlCode] = useState("");
  const [preview, setPreview] = useState("");

  const handleGenerate = () => {
    const values = form.getFieldsValue();
    const generatedHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <title>${values.title}</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link href="https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.2.19/tailwind.min.css" rel="stylesheet">
</head>
<body class="bg-blue-50">
  <div class="container mx-auto p-5">
    <div class="header flex justify-between items-center py-4 bg-white">
      <img src="${values.logoUrl}" alt="logo-img" class="w-32">
    </div>
    <hr class="border-t-2 border-blue-600 my-4">
    <div class="text-center">
      <h2 class="text-2xl font-semibold">${values.headerTitle}</h2>
    </div>
    <div class="flex flex-wrap mt-8">
      <div class="w-full md:w-2/3 px-4">
        <div class="text-justify">
          <p class="mb-4">${values.content}</p>
          ${values.ulLiContent}
          <p class="mb-4">${values.content2}</p>
          <div class="text-center">
            <img src="${values.bannerImage}" class="banner-img w-4/5 mx-auto mt-6" alt="Image">
          </div>
        </div>
      </div>
      <div class="w-full md:w-1/3 mt-8 md:mt-0 px-4">
        <div class="form-back p-6 bg-white shadow-lg rounded-lg">
          <h3 class="text-lg font-semibold text-center mb-4">${values.formTitle}</h3>
          ${values.formHtml}
        </div>
      </div>
    </div>
  </div>
</body>
</html>`;

    setHtmlCode(generatedHtml);
    setPreview(generatedHtml);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(htmlCode).then(() => {
      alert("HTML code copied to clipboard!");
    });
  };

  const handleClear = () => {
    form.resetFields();
    setHtmlCode("");
    setPreview("");
  };

  return (
    <div className="p-5">
      <Form form={form} layout="vertical" className="space-y-4">
        <Form.Item name="title" label="Page Title">
          <Input />
        </Form.Item>
        <Form.Item name="logoUrl" label="Logo URL">
          <Input />
        </Form.Item>
        <Form.Item name="headerTitle" label="Header Title">
          <Input />
        </Form.Item>
        <Form.Item name="content" label="Main Content">
          <Input.TextArea rows={4} />
        </Form.Item>
        <Form.Item name="ulLiContent" label="List Content">
          <Input.TextArea rows={4} />
        </Form.Item>
        <Form.Item name="content2" label="Additional Content">
          <Input.TextArea rows={4} />
        </Form.Item>
        <Form.Item name="bannerImage" label="Banner Image URL">
          <Input />
        </Form.Item>
        <Form.Item name="formTitle" label="Form Title">
          <Input />
        </Form.Item>
        <Form.Item name="formHtml" label="Form HTML">
          <Input.TextArea rows={4} />
        </Form.Item>
        <Button type="primary" onClick={handleGenerate}>
          Generate HTML
        </Button>
        <Button onClick={handleCopy} className="ml-2">
          Copy to Clipboard
        </Button>
        <Button onClick={handleClear} className="ml-2">
          Clear
        </Button>
      </Form>
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Preview:</h3>
        <iframe
          title="HTML Preview"
          srcDoc={preview}
          className="w-full h-96 border border-gray-300"
        />
      </div>
    </div>
  );
};

export default HtmlGeneratorForm;
