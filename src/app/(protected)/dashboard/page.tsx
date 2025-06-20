import { auth } from "../../../../auth"
import LogOutButton from "@/components/logout"
 
export default async function DashboardPage() {
  const session = await auth()
 
  if (!session) {
    return(
        <h1>not authorized</h1>
    )
  }
 
  return (
    <div className="container">
      <pre>{JSON.stringify(session, null, 2)}</pre>
      <LogOutButton></LogOutButton>
    </div>
  )
}