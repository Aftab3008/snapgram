import Bottombar from "@/components/shared/Bottombar";
import LeftSidebar from "@/components/shared/LeftSidebar";
import Topbar from "@/components/shared/Topbar";
import { useUserContext } from "@/context/AuthContext";
import { Outlet, useNavigate } from "react-router-dom";

export default function RootLayout() {
  const { isAuthenticated } = useUserContext();
  const navigate = useNavigate();
  if (!isAuthenticated) {
    navigate("/sign-in");
  }
  return (
    <div className="w-full md:flex">
      <Topbar />
      <LeftSidebar />

      <section className="flex flex-1 h-full">
        <Outlet />
      </section>

      <Bottombar />
    </div>
  );
}
