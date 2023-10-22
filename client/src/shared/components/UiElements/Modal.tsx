import { createPortal } from "react-dom"
import "./Modal.css"
import { Backdrop } from "./Backdrop"
import { CSSTransition } from "react-transition-group"
import { forwardRef } from "react"

type Props = {
    show: boolean
    className?: string,
    style?: React.CSSProperties,
    headerClass?: string,
    onSubmit?: () => void,
    children?: React.ReactNode,
    contentClass?: string,
    footerClass?: string,
    footer?: React.ReactNode,
    onCancel?: () => void,
    header?: string
}
type CompProps = {
    className?: string,
    style?: React.CSSProperties,
    headerClass?: string,
    onSubmit?: () => void,
    children?: React.ReactNode,
    contentClass?: string,
    footerClass?: string,
    footer?: React.ReactNode,
    header?: string
}

function Modal({ show, onCancel, className, style, headerClass, onSubmit, children, contentClass, footerClass, footer, header }: Props) {
    return (
        <>
            {show && (
                <Backdrop closeDrawer={onCancel} />
            )}
            <CSSTransition
                in={show}
                mountOnEnter
                unmountOnExit
                timeout={200}
                classNames="modal"
            >
                <ModalOverlay
                    className={className}
                    style={style}
                    headerClass={headerClass}
                    onSubmit={onSubmit}
                    children={children}
                    contentClass={contentClass}
                    footerClass={footerClass}
                    footer={footer}
                    header={header}
                />
            </CSSTransition>
        </>
    )

}

const ModalOverlay = forwardRef<HTMLDivElement, CompProps>(({ className, style, headerClass, onSubmit, children, contentClass, footerClass, footer, header }: CompProps, ref) => {
    const content = (
        <div ref={ref} className={`modal ${className}`} style={style}>
            <header className={`modal__header ${headerClass}`}>
                <h2>{header}</h2>
            </header>
            <form onSubmit={onSubmit ? onSubmit : (event => event.preventDefault())}>
                <div className={`modal__content ${contentClass}`}>
                    {children}
                </div>
                <footer className={`modal__footer ${footerClass}`}>
                    {footer}
                </footer>
            </form>
        </div>
    );
    return createPortal(content, document.getElementById('modal')!)
})
export default Modal