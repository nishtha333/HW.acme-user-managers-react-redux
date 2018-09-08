import React from 'react'
import { Link } from 'react-router-dom'

const Nav = ({ users, managers, location }) => {

    const path = location.pathname;

    return (
        <ul>
            <li className={ path === "/users" ? 'selected': ''}>
                <Link to="/users">Users ({users.length})</Link>
            </li>
            <li className={ path === "/managers" ? 'selected': ''}>
                <Link to="/managers">Managers ({managers.length})</Link>
            </li>
            <li className={ path === "/users/create" ? 'selected': ''}>
                <Link to="/users/create">Create New User</Link>
            </li>
        </ul>
    )
}

export default Nav