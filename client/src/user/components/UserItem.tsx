import "./UserItem.css"

type Props = {
    id: string,
    image: string,
    name: string,
    placeCount: number
}

function UserItem({ image, id, name, placeCount }: Props) {
    return (
        <div>
            <img src={image} />
            <p>{id}</p>
            <p>{name}</p>
            <p>{placeCount}</p>
        </div>
    )
}

export default UserItem