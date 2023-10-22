import './LoadingSpinner.css';

type Props = {
  asOverlay: boolean
}

const LoadingSpinner = ({ asOverlay }: Props) => {
  return (
    <div className={`${asOverlay && 'loading-spinner__overlay'}`}>
      <div className="lds-dual-ring"></div>
    </div>
  );
};

export default LoadingSpinner;
