import "./UsersList.css"
import UserItem from "./UserItem"
import { Person } from "../../types/userTypes"
import Card from "../../shared/components/UiElements/Card"

type Props = {
    users: Person[]
}

export default function UsersList({ users }: Props) {
    if (users.length === 0) {
        return (<div className='center'>
            <Card style={{ padding: "1rem" }}>
                <h2>No users found.</h2>
            </Card>
        </div>)
    }
    return (
        <ul className="users-list">
            {users.map((user) => {
                return <UserItem key={user.id} id={user.id} image={user.image} name={user.name} placeCount={user.places} />
            })}
        </ul>
    )
}