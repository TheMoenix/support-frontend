import { BrowserRouter } from "react-router-dom";
import { AppRoute } from "./Routes";

function App() {
  return (
    <BrowserRouter>
      <AppRoute />
    </BrowserRouter>
  );
}

export default App;
