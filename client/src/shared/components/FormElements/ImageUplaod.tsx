import { useRef, useState, useEffect } from "react"
import Button from "./Button"
import "./ImageUplaod.css"

type Props = {
    id: string,
    center: boolean,
    onInput: (id: string, value: string | File, isValid: boolean) => void,
    errorText: string
}

const ImageUplaod = (props: Props) => {
    const { id, center, onInput, errorText } = props
    const imageRef = useRef<HTMLInputElement | null>(null)
    const [file, setFile] = useState<File>()
    const [isValid, setIsValid] = useState<boolean>(false)
    const [preview, setPreview] = useState<string | ArrayBuffer | undefined>()

    useEffect(() => {
        if (!file) {
            return;
        }
        const fileReader = new FileReader();
        fileReader.onload = () => {
            if (typeof fileReader.result === "string" || fileReader.result instanceof ArrayBuffer) {
                setPreview(fileReader.result);
            }
        };
        fileReader.readAsDataURL(file)
    }, [file])

    const pickHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        let pickedFile
        let fileIsValid = isValid
        if (event.target.files && event.target.files.length === 1) {
            pickedFile = event.target.files?.[0]
            setFile(pickedFile)
            setIsValid(true)
            fileIsValid = true
        } else {
            setIsValid(false)
            fileIsValid = false
        }
        if (pickedFile) {
            onInput(id, pickedFile, fileIsValid)
        }
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
                    {typeof preview === "string" && <img src={preview} alt="preview" />}
                    {!preview && <p>Please pick an image.</p>}
                </div>
                <Button type="button" onClick={pickImageHandler}>PICK IMAGE</Button>
            </div>
            {!isValid && <p>{errorText}</p>}
        </div>
    )
}

export default ImageUplaod