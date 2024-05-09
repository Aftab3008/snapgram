import { Link,useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { useSignOutAccount } from "@/lib/react-query/queriesAndMutations";
import { useEffect } from "react";
import { useUserContext } from "@/context/AuthContext";


export default function Topbar() {
  const {mutate:signout,isSuccess} = useSignOutAccount();
  const {user}=useUserContext();
    const navigate = useNavigate();
    useEffect(() => {
        if(isSuccess){
            navigate(0)
        }
    },[isSuccess,navigate])
  return (
    <section className="topbar">
      <div className="flex-between py-4 px-5">
        <Link to="/" className="flex gap-3 items-center">
            <img 
            src="/assets/images/logo.svg"
            alt="logo"
            height={325}
            width={130}
            />
        </Link>
        <div className="flex gap-4">
            <Button variant="ghost" className="shad-button_ghost" onClick={()=>signout}>
                <img
                src="/assets/icons/logout.svg"
                alt="logout"
                />
            </Button>
            <Link to={`/profile/${user.id}`} className="flex-center gap-3">
                <img
                src={user.imageUrl || "/assets/images/profile-placeholder.svg"}
                alt="profile"
                className="rounded-full h-8 w-8"
                />
            </Link>
        </div>
      </div>
    </section>
  )
}
