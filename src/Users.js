import React from 'react'
import { Link } from 'react-router-dom'

const Users = ({ users, managers, deleteUser }) => {

    return (
        <ul>
        {
            users.map(user => <li key={user.id}>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
                {!user.managerId ? '' : ` is managed by ${managers.find(mgr => mgr.id === user.managerId).name}`}
                <button onClick={() => deleteUser(user.id)}>X</button>
            </li>)
        }
        </ul>
    )

}

export default Users