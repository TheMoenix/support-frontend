import { Flex, Typography } from "antd";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

const { Title } = Typography;

function TicketMutate() {
  const ticketId = useParams().id;
  const { t } = useTranslation();

  return (
    <Flex justify="center" align="center">
      <Title type="success">
        {ticketId
          ? `${t("editingTicket")}: ${ticketId}`
          : t("creatingNewTicket")}
      </Title>
    </Flex>
  );
}

export default TicketMutate;
