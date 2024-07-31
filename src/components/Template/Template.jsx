import React, { useState } from "react";

const Template = () => {
  const [title, setTitle] = useState(
    "Accelerate Cloud Innovation With A Robust Security Framework"
  );
  const [content, setContent] = useState(
    "As organizations fast-track cloud adoption, they encounter a broader attack surface and heightened cybersecurity risks. This white paper details how a strong cloud security framework empowers organizations to harness cloud cybersecurity and innovate confidently."
  );

  const [topics, setTopics] = useState([
    "Balancing digital tech integration with an expanding attack surface",
    "Embracing a holistic cybersecurity approach for built-in security and compliance",
    "Using AI analytics and shared intelligence to preempt attacks",
    "Crafting incident response and recovery plans to protect data, systems, and reputation",
  ]);

  const handleTopicChange = (index, value) => {
    const newTopics = [...topics];
    newTopics[index] = value;
    setTopics(newTopics);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="container mx-auto p-4 flex flex-col md:flex-row">
        <div className="flex-1 bg-white p-6 rounded-lg shadow-lg mb-6 md:mb-0">
          <h1 className="text-2xl font-bold mb-4">{title}</h1>
          <textarea
            className="w-full p-2 border border-gray-300 rounded mb-4"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <ul className="list-disc pl-6">
            {topics.map((topic, index) => (
              <li key={index} className="mb-2">
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={topic}
                  onChange={(e) => handleTopicChange(index, e.target.value)}
                />
              </li>
            ))}
          </ul>
        </div>
        <div className="w-full md:w-1/3 bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4">Download this White Paper!</h2>
          <form className="space-y-4">
            <input
              type="email"
              placeholder="Corporate E-mail Address"
              className="w-full p-2 border border-gray-300 rounded"
            />
            <input
              type="text"
              placeholder="First Name"
              className="w-full p-2 border border-gray-300 rounded"
            />
            <input
              type="text"
              placeholder="Last Name"
              className="w-full p-2 border border-gray-300 rounded"
            />
            <input
              type="text"
              placeholder="Company Name"
              className="w-full p-2 border border-gray-300 rounded"
            />
            <input
              type="text"
              placeholder="Job Title"
              className="w-full p-2 border border-gray-300 rounded"
            />
            <input
              type="text"
              placeholder="No of employees"
              className="w-full p-2 border border-gray-300 rounded"
            />
            <input
              type="text"
              placeholder="Industry"
              className="w-full p-2 border border-gray-300 rounded"
            />
            <input
              type="text"
              placeholder="Address"
              className="w-full p-2 border border-gray-300 rounded"
            />
            <input
              type="text"
              placeholder="City"
              className="w-full p-2 border border-gray-300 rounded"
            />
            <input
              type="text"
              placeholder="Country"
              className="w-full p-2 border border-gray-300 rounded"
            />
            <input
              type="text"
              placeholder="State"
              className="w-full p-2 border border-gray-300 rounded"
            />
            <input
              type="text"
              placeholder="Zip Code"
              className="w-full p-2 border border-gray-300 rounded"
            />
            <input
              type="text"
              placeholder="Phone"
              className="w-full p-2 border border-gray-300 rounded"
            />
            <div className="flex items-center">
              <input type="checkbox" id="deloitte1" className="mr-2" />
              <label htmlFor="deloitte1">
                I agree to receive email reports, articles...
              </label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" id="deloitte2" className="mr-2" />
              <label htmlFor="deloitte2">
                I agree to receive email reports, articles...
              </label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" id="techtarget" className="mr-2" />
              <label htmlFor="techtarget">
                Yes, I'd like TechTarget, Inc. to provide my contact
                information...
              </label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" id="businessInterests" className="mr-2" />
              <label htmlFor="businessInterests">
                I am completing this form in connection with my business
                interests
              </label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" id="techtargetPolicy" className="mr-2" />
              <label htmlFor="techtargetPolicy">
                I agree to TechTarget's Terms of Use, Privacy Policy...
              </label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" id="processingInfo" className="mr-2" />
              <label htmlFor="processingInfo">
                I agree to my information being processed by TechTarget...
              </label>
            </div>
            <button
              type="submit"
              className="w-full p-2 bg-blue-500 text-white rounded"
            >
              Download Now
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Template;
