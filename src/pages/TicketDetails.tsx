import { Card, Col, Descriptions, Row, Tag, message } from "antd";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { getTicket, type Ticket } from "../api/ticketApi";

function TicketDetails() {
  const ticketId = useParams().id;
  const { t } = useTranslation();
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (ticketId) {
      fetchTicket();
    }
  }, [ticketId]);

  const fetchTicket = async () => {
    if (!ticketId) return;

    setLoading(true);
    try {
      const data = await getTicket(ticketId);
      setTicket(data);
    } catch (error) {
      console.error("Error fetching ticket:", error);
      message.error("Failed to load ticket details");
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    const colorMap: Record<string, string> = {
      open: "blue",
      "in-progress": "orange",
      resolved: "green",
      closed: "gray",
    };
    return colorMap[status];
  };

  const getStatusLabel = (status: string) => {
    const statusKeyMap: Record<string, string> = {
      open: "status.open",
      "in-progress": "status.inProgress",
      resolved: "status.resolved",
      closed: "status.closed",
    };
    return t(statusKeyMap[status]);
  };

  if (loading) {
    return (
      <Row justify="center" style={{ padding: "14px" }}>
        <Col xs={24} md={16}>
          <Card loading={loading} />
        </Col>
      </Row>
    );
  }

  if (!ticket) {
    return (
      <Row justify="center" style={{ padding: "14px" }}>
        <Col xs={24} md={16}>
          <Card>{t("ticketNotFound")}</Card>
        </Col>
      </Row>
    );
  }

  return (
    <Row justify="center" style={{ padding: "14px" }}>
      <Col xs={24} md={16}>
        <Card title={`${t("ticketId")}: ${ticket.id}`}>
          <Descriptions bordered column={1}>
            <Descriptions.Item label={t("table.name")}>
              {ticket.name}
            </Descriptions.Item>
            <Descriptions.Item label={t("table.email")}>
              {ticket.email}
            </Descriptions.Item>
            <Descriptions.Item label={t("table.subject")}>
              {ticket.subject}
            </Descriptions.Item>
            <Descriptions.Item label={t("form.message")}>
              {ticket.message}
            </Descriptions.Item>
            <Descriptions.Item label={t("table.status")}>
              <Tag color={getStatusColor(ticket.status)}>
                {getStatusLabel(ticket.status)}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label={t("table.createdAt")}>
              {new Date(ticket.createdAt).toLocaleString()}
            </Descriptions.Item>
            <Descriptions.Item label={t("updatedAt")}>
              {new Date(ticket.updatedAt).toLocaleString()}
            </Descriptions.Item>
          </Descriptions>
        </Card>
      </Col>
    </Row>
  );
}

export default TicketDetails;
