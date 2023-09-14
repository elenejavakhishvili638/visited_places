import { Person } from "../../types/userTypes"
import UsersList from "../components/UsersList"

function User() {
    const USERS: Person[] = [{
        id: "ui",
        name: "elene",
        image: "sss",
        places: 3
    }]
    return (
        <div>
            <UsersList users={USERS} />
        </div>
    )
}

export default User