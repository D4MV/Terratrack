import { auth } from "@/auth";
import LogOutButton from "@/components/logout";

const AdminPage = async() =>{
    const session = await auth()

    if(session?.user?.role !== "admin"){
        return <div>no tienes los permisos correspondientes</div>
    }

    return(
        <div className="container">
            <pre>{JSON.stringify(session, null, 2)}</pre>
            <LogOutButton></LogOutButton>
        </div>
    )
};

export default AdminPage;