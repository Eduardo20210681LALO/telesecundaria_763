import { Outlet } from "react-router-dom"
import Nav2 from "../components/Nav2"

function Layout() {
  return (
    <>
        <Nav2/>
        <main>
            <Outlet/>
        </main>
    </>
  )
}

export default Layout