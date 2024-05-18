import Loader from "@/components/shared/Loader";
import { useUserContext } from "@/context/AuthContext";
import { Outlet, useNavigate } from "react-router-dom";
export function AuthLayout() {
  const { isAuthenticated, isLoading } = useUserContext();
  const navigate = useNavigate();
  if (isLoading) {
    return <Loader />;
  }
  if (isAuthenticated) {
    navigate("/");
  }
  return (
    <>
      <>
        <section className="flex flex-1 justify-center items-center flex-col py-10">
          <Outlet />
        </section>
        <img
          src="/assets/images/side-img.svg"
          alt="logo"
          className="hidden xl:block h-screen w-1/2 object-cover bg-no-repeat"
        />
      </>
    </>
  );
}
