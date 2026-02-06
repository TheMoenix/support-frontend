import { Flex, Typography } from "antd";
import { useParams } from "react-router-dom";

const { Title } = Typography;

function TicketMutate() {
  const ticketId = useParams().id;
  return (
    <Flex justify="center" align="center">
      <Title type="success">
        {ticketId ? `Editing Ticket ID: ${ticketId}` : "Creating New Ticket"}
      </Title>
    </Flex>
  );
}

export default TicketMutate;
