import "./UserItem.css"
import Avatar from "../../shared/components/UiElements/Avatar"
import { Link } from "react-router-dom"
import Card from "../../shared/components/UiElements/Card"

type Props = {
    image: string,
    name: string,
    placeCount: number,
    id: string
}

function UserItem({ image, name, placeCount, id }: Props) {
    return (
        <li className="user-item">
            <Card className="user-item__content">
                <Link to={`/${id}/places`}>
                    <div className="user-item__image" >
                        <Avatar image={"http://localhost:5000/" + image} alt={name} />
                    </div>
                    <div className="user-item__info">
                        <h2>{name}</h2>
                        <h3>{placeCount} {placeCount === 1 ? "Place" : "Places"}</h3>
                    </div>
                </Link>
            </Card>
        </li>
    )
}

export default UserItem