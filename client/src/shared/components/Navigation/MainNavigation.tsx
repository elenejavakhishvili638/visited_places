import { Link } from "react-router-dom"
import MainHeader from "./MainHeader"
import "./MainNavigation.css"
import { AiOutlineMenu } from "react-icons/ai"
import NavLinks from "./NavLinks"
import SideDrawer from "./SideDrawer"

const MainNavigation = () => {
    return (
        <>
            <SideDrawer>
                <nav className="main-navigation__drawer-nav">
                    <NavLinks></NavLinks>
                </nav>
            </SideDrawer>
            <MainHeader>
                <button className="main-navigation__menu-btn">
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