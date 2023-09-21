import { createPortal } from "react-dom"
import "./SideDrawer.css"

type Props = {
    children: React.ReactNode
}

function SideDrawer({ children }: Props) {
    const drawer = <aside className='side-drawer'>
        {children}
    </aside>
    return createPortal(drawer, document.getElementById("side-drawer")!);
}

export default SideDrawer