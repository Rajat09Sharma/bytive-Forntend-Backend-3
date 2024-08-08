import { Modal } from "antd";
import { Button, Form, Input, Divider } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { modalActions, reFetchActions } from "../store";
import {  useRef, useState } from "react";
import { editUserDetails, fetchUserById } from "../http";
import LoadingIndigator from "./LoadingIndigator";
import useFetchUsers from "../hook/useFetchUsers";


export default function ModalForm() {

  const [isSubmitting, setIsSubmitting] = useState(false);


  const submitRef = useRef();

  const isModalOpen = useSelector((state) => state.modal.isModalOpen);
  const id = useSelector(state => state.id.id);
  const { usersData: user, isLoading, error } = useFetchUsers(() => fetchUserById(id), null, null);

  const dispatch = useDispatch();

  function handleOk() {
    if (submitRef.current) {
      submitRef.current.click();
    }
  }

  const onFinish = async (values, id) => {
    // console.log('Success:', values);
    setIsSubmitting(true);
    const response = await editUserDetails(values, id);
    if (response) {
      console.log(response);

      setIsSubmitting(false);
      dispatch(reFetchActions.handleReFetch());
      dispatch(modalActions.handleOk());
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };


  return (
    <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={() => dispatch(modalActions.handleCancle())} cancelButtonProps={{ style: { display: isSubmitting && "none" } }} okText={isSubmitting && "updating...."} >
      {isLoading && <LoadingIndigator />}
      {error && <p>Failed to fetch user details.</p>}
      {!isLoading && !error && <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          remember: true,
        }}
        fields={[
          {
            name: ["name"],
            value: user ? user.name : ""
          },
          {
            name: ["email"],
            value: user ? user.email : ""
          },
          {
            name: ["phone"],
            value: user ? user.phone : ""
          },
          {
            name: ["website"],
            value: user ? user.website : ""
          }
        ]}
        onFinish={(values) => onFinish(values, id)}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Divider />

        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: 'Please input your name!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: 'Please input your email!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Phone"
          name="phone"
          rules={[
            {
              required: true,
              message: 'Please input your phone!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Website"
          name="website"
          rules={[
            {
              required: true,
              message: 'Please input your website!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Divider />

        <Button ref={submitRef} type="primary" htmlType="submit" style={{ display: "none" }}>
          Submit
        </Button>

      </Form>}

    </Modal>
  )
}



