import { ReactNode } from 'react'
import "./MainHeader.css"

type Props = {
    children: ReactNode
}

const MainHeader = ({ children }: Props) => {
    return (
        <header className='main-header'>
            {children}
        </header>
    )
}

export default MainHeader