import { BrowserRouter } from "react-router-dom";
import { AppRoute } from "./Routes";
import { ConfigProvider, Layout, theme } from "antd";
import AppHeader from "./components/AppHeader";
import AppFooter from "./components/AppFooter";
import { I18nextProvider, useTranslation } from "react-i18next";
import { Language, Theme } from "./common/constants";
import { useEffect } from "react";

const { Content } = Layout;

function App() {
  const { i18n } = useTranslation();
  const language: Language =
    (localStorage.getItem("language") as Language) || Language.ENGLISH;
  const themeMode: Theme =
    (localStorage.getItem("theme") as Theme) || Theme.LIGHT;
  const { defaultAlgorithm, darkAlgorithm } = theme;

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language, i18n]);

  return (
    <I18nextProvider i18n={i18n}>
      <ConfigProvider
        direction={language === Language.ARABIC ? "rtl" : "ltr"}
        theme={{
          algorithm:
            themeMode === Theme.DARK ? darkAlgorithm : defaultAlgorithm,
          token: {
            colorPrimary: "#15514F",
            colorSuccess: "#4ea64e",
            colorWarning: "#c5871f",
            colorError: "#9c3b3b",
            colorLink: "#27918D",
            colorInfo: "#27918D",

            fontSize: 16,
          },
        }}
      >
        <BrowserRouter>
          <Layout style={{ minHeight: "100vh" }}>
            <AppHeader />
            <Content>
              <AppRoute />
            </Content>
            <AppFooter />
          </Layout>
        </BrowserRouter>
      </ConfigProvider>
    </I18nextProvider>
  );
}

export default App;
