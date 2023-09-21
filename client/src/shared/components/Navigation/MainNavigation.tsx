import { Link } from "react-router-dom"
import MainHeader from "./MainHeader"
import "./MainNavigation.css"
import { AiOutlineMenu } from "react-icons/ai"
import NavLinks from "./NavLinks"
import SideDrawer from "./SideDrawer"
import { useState } from "react"
import { Backdrop } from "../UiElements/Backdrop"

const MainNavigation = () => {
    const [sideDrawer, setSideDrawer] = useState(false)

    const openSideDrawer = () => {
        setSideDrawer(true)
    }

    const closeSideDrawer = () => {
        setSideDrawer(false)
    }
    return (
        <>
            {sideDrawer && <Backdrop closeDrawer={closeSideDrawer} />}
            <SideDrawer show={sideDrawer}>
                <nav className="main-navigation__drawer-nav">
                    <NavLinks closeDrawer={closeSideDrawer}></NavLinks>
                </nav>
            </SideDrawer>
            <MainHeader>
                <button className="main-navigation__menu-btn" onClick={openSideDrawer}>
                    <AiOutlineMenu />
                </button>
                <h1 className="main-navigation__title">
                    <Link to="/">
                        Your places
                    </Link>
                </h1>
                <nav className="main-navigation__header-nav">
                    <NavLinks />
                </nav>
            </MainHeader>
        </>
    )
}

export default MainNavigation