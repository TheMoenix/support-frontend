import { Flex, Typography } from "antd";
import { useParams } from "react-router-dom";

const { Title } = Typography;

function TicketDetails() {
  const ticketId = useParams().id;

  return (
    <Flex
      justify="center"
      align="center"
      style={{
        height: "100vh",
      }}
    >
      <Title type="warning">Ticket ID: {ticketId}</Title>
    </Flex>
  );
}

export default TicketDetails;
