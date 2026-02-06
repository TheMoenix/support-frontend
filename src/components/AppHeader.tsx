import { Layout, Button, Space, Typography, Flex, Switch, theme } from "antd";
import { useNavigate } from "react-router-dom";
import { Language, Theme } from "../common/constants";
import { MoonOutlined, SunOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

const { Header } = Layout;
const { Text } = Typography;

export default function AppHeader() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const currentLanguage =
    (localStorage.getItem("language") as Language) || Language.ENGLISH;
  const currentTheme = (localStorage.getItem("theme") as Theme) || Theme.LIGHT;

  const handleLanguageToggle = (checked: boolean) => {
    const newLanguage = checked ? Language.ARABIC : Language.ENGLISH;
    localStorage.setItem("language", newLanguage);
    window.location.reload();
  };

  const handleThemeToggle = (checked: boolean) => {
    const newTheme = checked ? Theme.DARK : Theme.LIGHT;
    localStorage.setItem("theme", newTheme);
    window.location.reload();
  };

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Header style={{ background: colorBgContainer }}>
      <Flex justify="space-between" align="center">
        <Space size="large">
          <Text style={{ fontSize: "25px" }}>{t("title")}</Text>
          <Space>
            <Button type="link" onClick={() => navigate("/create")}>
              {t("createTicket")}
            </Button>
            <Button type="link" onClick={() => navigate("/list")}>
              {t("listTickets")}
            </Button>
          </Space>
        </Space>
        <Space>
          <Switch
            checked={currentTheme === Theme.DARK}
            onChange={handleThemeToggle}
            checkedChildren={<MoonOutlined />}
            unCheckedChildren={<SunOutlined />}
          />
          <Switch
            checked={currentLanguage === Language.ARABIC}
            onChange={handleLanguageToggle}
            checkedChildren="AR"
            unCheckedChildren="EN"
          />
        </Space>
      </Flex>
    </Header>
  );
}
