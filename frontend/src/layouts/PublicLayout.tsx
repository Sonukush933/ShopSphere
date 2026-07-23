import { Outlet } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import TopBar from "../components/layout/TopBar";


function PublicLayout() {
  return (
   <main className="min-h-screen bg-background">
  <TopBar />

  <Navbar />

  <Outlet />


</main>
  );
}

export default PublicLayout;