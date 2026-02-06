import { BrowserRouter } from "react-router-dom";
import { AppRoute } from "./Routes";
import { Layout } from "antd";
import AppHeader from "./components/AppHeader";
import AppFooter from "./components/AppFooter";

const { Content } = Layout;

function App() {
  return (
    <BrowserRouter>
      <Layout style={{ minHeight: "100vh" }}>
        <AppHeader />
        <Content>
          <AppRoute />
        </Content>
        <AppFooter />
      </Layout>
    </BrowserRouter>
  );
}

export default App;
