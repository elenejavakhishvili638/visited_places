import "./Avatar.css"
type Props = {
  image: string;
  width?: string;
  height?: string;
  className?: string;
  style?: React.CSSProperties;
  alt: string;
}

const Avatar = ({ image, width, height, className, alt, style }: Props) => {
  return (
    <div className={`avatar ${className}`} style={style}>
      <img src={image} alt={alt} style={{ width: width, height: height }} />
    </div>
  )
}

export default Avatar