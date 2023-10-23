import { useRef } from "react"
import Button from "./Button"
import "./ImageUplaod.css"

type Props = {
    id: string,
    center: boolean
}

const ImageUplaod = (props: Props) => {
    const { id, center } = props
    const imageRef = useRef<HTMLInputElement | null>(null)

    const pickHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.files?.[0])
    }

    const pickImageHandler = () => {
        imageRef.current?.click()
    }


    return (
        <div className="form-control">
            <input
                ref={imageRef}
                type="file"
                id={id}
                style={{ display: "none" }}
                accept=".jpg,.png,.jpeg"
                onChange={pickHandler}
            />
            <div className={`image-upload ${center && "center"}`}>
                <div className="image-upload__preview">
                    <img src="" alt="preview" />
                </div>
                <Button type="button" onClick={pickImageHandler}>PICK IMAGE</Button>
            </div>
        </div>
    )
}

export default ImageUplaod