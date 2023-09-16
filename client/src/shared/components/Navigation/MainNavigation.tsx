import { Link } from "react-router-dom"
import MainHeader from "./MainHeader"
import "./MainNavigation.css"
import { AiOutlineMenu } from "react-icons/ai"


const MainNavigation = () => {
    return (
        <MainHeader>
            <button className="main-navigation__menu-btn">
                <AiOutlineMenu />
            </button>
            <h1 className="main-navigation__title">
                <Link to="/">
                    Your places
                </Link>
            </h1>
            <nav>...</nav>
        </MainHeader>
    )
}

export default MainNavigation