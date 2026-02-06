import { Flex, Typography } from "antd";
import { useTranslation } from "react-i18next";

const { Title } = Typography;

function TicketList() {
  const { t } = useTranslation();

  return (
    <Flex justify="center" align="center">
      <Title type="success">{t("listingTickets")}</Title>
    </Flex>
  );
}

export default TicketList;
