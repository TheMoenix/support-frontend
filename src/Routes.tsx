import { Route, Routes } from "react-router-dom";
import TicketMutate from "./pages/TicketMutate";
import TicketList from "./pages/TicketList";
import TicketDetails from "./pages/TicketDetails";

export const AppRoutes = [];

export function AppRoute() {
  return (
    <Routes>
      <Route path="/" element={<TicketMutate />} index />
      <Route path="/create" element={<TicketMutate />} />
      <Route path="/:id/edit" element={<TicketMutate />} />

      <Route path="/list" element={<TicketList />} />

      <Route path="/:id" element={<TicketDetails />} />
    </Routes>
  );
}
