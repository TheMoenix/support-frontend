import { Flex, Typography } from "antd";

const { Title } = Typography;

function TicketList() {
  return (
    <Flex justify="center" align="center">
      <Title type="success">Listing Tickets</Title>
    </Flex>
  );
}

export default TicketList;
