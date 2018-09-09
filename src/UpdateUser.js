import React, { Component } from 'react'

class UpdateUser extends Component {

    constructor(props) {
        super(props)

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.fetchUser = this.fetchUser.bind(this)

        this.state = this.fetchUser(this.props.id)
    }

    fetchUser(id) {
        const user = this.props.fetchUser(Number(id))  
        return {
            name: user.name, 
            managerId: user.managerId !== null ? user.managerId : "-1"
        }
    }

    componentDidUpdate(prevProps) {
        if(this.props.id !== prevProps.id) {
            this.setState(this.fetchUser(this.props.id))
        }
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit(event) {
        event.preventDefault()
        const user = { 
            id: this.props.id, 
            name: this.state.name, 
            managerId: (this.state.managerId === "-1" ? null : Number(this.state.managerId))
        }
        this.props.updateUser(user)
        this.props.history.push('/users')
    }

    render() {
        const { users } = this.props
        const { name, managerId } = this.state
        const { handleChange, handleSubmit } = this

        return (
            <form onSubmit={handleSubmit}>
                <input name="name" value={name} onChange={handleChange} />
                <select name="managerId" value={managerId} onChange={handleChange}>
                    <option key="-1" value="-1">--none--</option>
                    {
                        users.map(user => <option key={user.id} value={user.id}>{user.name}</option>)
                    }
                </select>
                <button type="submit">Update</button>
            </form>
        )
    }
}

export default UpdateUser