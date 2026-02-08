import { Button, Card, Form, Input } from "antd";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useForm } from "antd/es/form/Form";

function TicketMutate() {
  const ticketId = useParams().id;
  const { t } = useTranslation();
  const [form] = useForm();

  const onFinish = (values: any) => {
    console.log(values);
    form.resetFields();
  };

  return (
    <Card
      title={
        ticketId ? `${t("editingTicket")}: ${ticketId}` : t("creatingNewTicket")
      }
      style={{ margin: "14px" }}
    >
      <Form form={form} onFinish={onFinish}>
        <Form.Item
          name={"name"}
          label="form.name"
          rules={[{ required: true, message: "message.required" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={"email"}
          label="form.email"
          rules={[
            { required: true, message: "message.required" },
            { type: "email", message: "message.email_error" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={"subject"}
          label="form.subject"
          rules={[{ required: true, message: "message.required" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={"message"}
          label="form.message"
          rules={[{ required: true, message: "message.required" }]}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit"> {t("button.submit")}</Button>
        </Form.Item>
      </Form>
    </Card>
  );
}

export default TicketMutate;
