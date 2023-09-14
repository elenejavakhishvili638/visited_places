import "./UsersList.css"
import UserItem from "./UserItem"
import { Person } from "../../types/userTypes"

type Props = {
    users: Person[]
}

export default function UsersList({ users }: Props) {
    if (users.length === 0) {
        return (<div className='center'>
            <h2>No users found.</h2>
        </div>)
    }
    return (
        <ul>
            {users.map((user) => {
                return <UserItem key={user.id} image={user.image} name={user.name} id={user.id} placeCount={user.places} />
            })}
        </ul>
    )
}