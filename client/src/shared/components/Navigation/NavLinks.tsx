import "./NavLinks.css"
import { NavLink } from "react-router-dom"

type Props = {
    closeDrawer?: () => void
}

function NavLinks({ closeDrawer }: Props) {
    return (
        <ul className="nav-links">
            <li>
                <NavLink to="/" onClick={closeDrawer}>ALL USERS</NavLink>
            </li>
            <li>
                <NavLink to="/u2/places" onClick={closeDrawer}>MY PLACES</NavLink>
            </li>
            <li>
                <NavLink to="/places/new" onClick={closeDrawer}>ADD PLACES</NavLink>
            </li>
            <li>
                <NavLink to="/auth" onClick={closeDrawer}>AUTHENTICATE</NavLink>
            </li>
        </ul>
    )
}

export default NavLinks