import React, { Component } from 'react'

class CreateUser extends Component {

    constructor() {
        super()
        this.state = {
            name: '',
            managerId: -1
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit(event) {
        event.preventDefault()
        const user = { name: this.state.name, managerId: (this.state.managerId === -1 ? null : this.state.managerId) }
        this.props.createUser(user)
            .then(() => this.props.history.push("/users"))
    }

    render() {
        const { users } = this.props
        const { name, managerId } = this.state
        const { handleChange, handleSubmit } = this

        return (
            <form onSubmit={handleSubmit}>
                <input name="name" value={name} onChange={handleChange} />
                <select name="managerId" value={managerId} onChange={handleChange}>
                    <option key={-1} value={-1}>--none--</option>
                    {
                        users.map(user => <option key={user.id} value={user.id}>{user.name}</option>)
                    }
                </select>
                <button type="sumbit">Save</button>
            </form>
        )
    }
}

export default CreateUser