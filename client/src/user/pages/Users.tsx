import { Person } from "../../types/userTypes"
import UsersList from "../components/UsersList"

function Users() {
    const USERS: Person[] = [{
        id: "ui",
        name: "elene",
        image: "https://media.cntraveler.com/photos/5c2cfc9f6b0c2057eb60d579/16:9/w_1920%2Cc_limit/Edinburgh%2520Castle_GettyImages-157509228.jpg",
        places: 3
    }]
    return (
        <div>
            <UsersList users={USERS} />
        </div>
    )
}

export default Users