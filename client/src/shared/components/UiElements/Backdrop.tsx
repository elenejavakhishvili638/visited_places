import "./Backdrop.css"
import { createPortal } from 'react-dom'

type Props = {
  closeDrawer: () => void
}

export const Backdrop = ({ closeDrawer }: Props) => {
  return createPortal(
    <div className="backdrop" onClick={closeDrawer}></div>,
    document.getElementById('backdrop')!
  );
}