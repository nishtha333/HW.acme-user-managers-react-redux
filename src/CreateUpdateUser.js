import React, { Component } from 'react'

class CreateUpdateUser extends Component {

    constructor(props) {
        super(props)

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.fetchUser = this.fetchUser.bind(this)

        if(this.props.id) {
            this.state = this.fetchUser(this.props.id)
        }
        else {
            this.state = { name: '', managerId: '-1' }
        }
    }

    fetchUser(id) {
        const user = this.props.fetchUser(Number(id))  
        return {
            id: user.id,
            name: user.name, 
            managerId: user.managerId !== null ? user.managerId : "-1"
        }
    }

    componentDidUpdate(prevProps) {
        if(this.props.updateUser && this.props.id !== prevProps.id) {
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
        const name = this.state.name
        const managerId = (this.state.managerId === "-1" ? null : Number(this.state.managerId)) 

        if(this.props.id) {
            this.props.updateUser({id: this.props.id, name, managerId})
        }
        else {
            this.props.createUser({name, managerId})
        }
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
                <button type="submit">{this.props.id ? "Update" : "Save"}</button>
            </form>
        )
    }
}

export default CreateUpdateUser