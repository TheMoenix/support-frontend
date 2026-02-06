import { Layout, Button, Space, Typography, Flex } from "antd";
import { useNavigate } from "react-router-dom";

const { Header } = Layout;
const { Text } = Typography;

export default function AppHeader() {
  const navigate = useNavigate();

  return (
    <Header>
      <Flex justify="space-between" align="center">
        <Text style={{ color: "white", fontSize: "20px" }}>Support</Text>
        <Space>
          <Button type="link" onClick={() => navigate("/create")}>
            Create Ticket
          </Button>
          <Button type="link" onClick={() => navigate("/list")}>
            List Tickets
          </Button>
        </Space>
      </Flex>
    </Header>
  );
}
