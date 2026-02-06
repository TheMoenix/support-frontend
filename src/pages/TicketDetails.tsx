import { Flex, Typography } from "antd";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

const { Title } = Typography;

function TicketDetails() {
  const ticketId = useParams().id;
  const { t } = useTranslation();

  return (
    <Flex justify="center" align="center">
      <Title type="warning">
        {t("ticketId")}: {ticketId}
      </Title>
    </Flex>
  );
}

export default TicketDetails;
