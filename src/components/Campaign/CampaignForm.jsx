import React, { useEffect } from "react";
import { Form, Input, Select, DatePicker, Button, notification } from "antd";
import moment from "moment";
import { createCampaign, updateCampaign } from "../../api";

const { Option } = Select;

const CampaignForm = ({ setCampaigns, onSuccess, initialValues }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({
        ...initialValues,
        date: moment(initialValues.date),
      });
    }
  }, [initialValues, form]);

  const handleFinish = async (values) => {
    const campaignData = {
      ...values,
      date: values.date.format("YYYY-MM-DD"),
    };

    try {
      if (initialValues) {
        const { data } = await updateCampaign(initialValues._id, campaignData);
        setCampaigns((prev) =>
          prev.map((campaign) => (campaign._id === data._id ? data : campaign))
        );
      } else {
        const { data } = await createCampaign(campaignData);
        setCampaigns((prev) => [...prev, data]);
      }
      form.resetFields();
      onSuccess();
    } catch (error) {
      notification.error({
        message: `Failed to ${initialValues ? "update" : "create"} campaign`,
        description: error.response?.data?.message || error,
      });
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-lg">
        <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          {initialValues ? "Update Campaign" : "Add Campaign"}
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md">
        <Form
          form={form}
          onFinish={handleFinish}
          layout="vertical"
          className="space-y-6"
        >
          <Form.Item
            name="date"
            label="Date"
            initialValue={moment()}
            rules={[{ required: true }]}
          >
            <DatePicker className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </Form.Item>
          <Form.Item
            name="campaignType"
            label="Campaign Type"
            rules={[{ required: true }]}
          >
            <Select className="block w-full rounded-md border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
              <Option value="CL">CL</Option>
              <Option value="TT">TT</Option>
              <Option value="GG">GG</Option>
              <Option value="FS">FS</Option>
              <Option value="IT">IT</Option>
              <Option value="CR">CR</Option>
              <Option value="DA">DA</Option>
              <Option value="JM">JM</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="campaignCode"
            label="Campaign Code"
            rules={[{ required: true }]}
          >
            <Input className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </Form.Item>
          <Form.Item
            name="landingPages"
            label="Number of Landing Pages"
            rules={[{ required: true }]}
          >
            <Input
              type="number"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </Form.Item>
          <Form.Item
            name="preparedBy"
            label="Prepared By"
            rules={[{ required: true }]}
          >
            <Select className="block w-full rounded-md border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
              <Option value="Atul Tingre">Atul Tingre</Option>
              <Option value="Nandkishor Kadam">Nandkishor Kadam</Option>
              <Option value="Avinash Mahajan">Avinash Mahajan</Option>
            </Select>
          </Form.Item>
          <Form.Item name="status" label="Status" rules={[{ required: true }]}>
            <Select className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
              <Option value="Not yet started">Not yet started</Option>
              <Option value="In progress">In progress</Option>
              <Option value="Completed">Completed</Option>
            </Select>
          </Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            {initialValues ? "Update Campaign" : "Add Campaign"}
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default CampaignForm;
