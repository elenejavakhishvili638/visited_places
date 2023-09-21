import { createPortal } from "react-dom"
import "./SideDrawer.css"
import { CSSTransition } from "react-transition-group"

type Props = {
    children: React.ReactNode,
    show: boolean,
}

const SideDrawer = ({ children, show }: Props) => {
    const drawer = <CSSTransition in={show} timeout={200} classNames="slide-in-left" mountOnEnter unmountOnExit>
        <aside className='side-drawer'>
            {children}
        </aside>
    </CSSTransition>
    return createPortal(drawer, document.getElementById("side-drawer")!);
}

export default SideDrawer