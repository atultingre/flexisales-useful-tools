import React from "react";
import { Form, Input, Button, notification } from "antd";
import { useNavigate } from "react-router-dom";
import { login } from "../../api";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const onFinishLogin = async (values) => {
    try {
      const response = await login(values.employeeId, values.password);

      if (response) {
        const userInfo = response.data;
        localStorage.setItem("userInfo", JSON.stringify(userInfo));
        navigate("/");
        setUser(userInfo);
      }
    } catch (error) {
      notification.error({
        message: "Logging in Failed",
        description: error.response?.data?.message || error,
      });
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          alt="Your Company"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          className="mx-auto h-10 w-auto"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <Form
          form={form}
          onFinish={onFinishLogin}
          layout="vertical"
          className="space-y-6"
        >
          <Form.Item
            name="employeeId"
            label="Employee ID"
            rules={[{ required: true }]}
          >
            <Input
              id="employeeId"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true }]}
          >
            <Input.Password
              id="password"
              className="flex w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Login
          </Button>
        </Form>

        {/* <p className="mt-10 text-center text-sm text-gray-500">
          Not a member?{' '}
          <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
            Start a 14 day free trial
          </a>
        </p> */}
      </div>
    </div>
  );
};

export default Login;
