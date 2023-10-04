import { useContext } from "react"
import "./NavLinks.css"
import { NavLink } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"

type Props = {
    closeDrawer?: () => void
}

function NavLinks({ closeDrawer }: Props) {
    const auth = useContext(AuthContext)
    return (
        <ul className="nav-links">
            <li>
                <NavLink to="/" onClick={closeDrawer}>ALL USERS</NavLink>
            </li>
            {auth.isLoggedIn && (
                <>
                    <li>
                        <NavLink to="/u2/places" onClick={closeDrawer}>MY PLACES</NavLink>
                    </li>
                    <li>
                        <NavLink to="/places/new" onClick={closeDrawer}>ADD PLACES</NavLink>
                    </li>
                </>
            )}
            {!auth.isLoggedIn && (
                <li>
                    <NavLink to="/auth" onClick={closeDrawer}>AUTHENTICATE</NavLink>
                </li>
            )}
            {auth.isLoggedIn && (
                <li>
                    <button onClick={auth.logout}>LOGOUT</button>
                </li>
            )}
        </ul>
    )
}

export default NavLinks