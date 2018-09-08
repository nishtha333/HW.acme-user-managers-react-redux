import React, { Component } from 'react'
import {HashRouter as Router, Route} from 'react-router-dom'
import axios from 'axios'
import Nav from './Nav'
import Users from './Users'
import Managers from './Managers'
import CreateUser from './CreateUser'

class App extends Component {

    constructor() {
        super()
        this.state = {
            users: []
        }
        this.deleteUser = this.deleteUser.bind(this)
        this.createUser = this.createUser.bind(this)
    }

    componentDidMount() {
        axios.get('/api/users')
            .then(response => response.data)
            .then((users) => this.setState({users}))
    }

    deleteUser(id) {
        axios.delete(`/api/users/${id}`)
            .then(() => this.setState({
                users: this.state.users.filter(user => user.id !== id)
            }))
    }

    createUser(user) {
        return axios.post('/api/users', user)
            .then(response => response.data)
            .then(user => 
                    this.setState({
                        users: [...this.state.users, user]
                    })
            )
    }

    render() {
        const { users } = this.state
        const { deleteUser, createUser } = this

        const managers = () => {
            return users.filter(user => user.managerId !== null)
                .map(user => users.find( _user => _user.id === user.managerId))
            }

        return (
            <Router>
                <div>
                    <Route path="/" render={({location}) => <Nav users={users} managers={managers()} location={location} />}/>
                    <Route path="/users" render={() => <Users users={users} managers={managers()} deleteUser={deleteUser} />}/>
                    <Route path="/managers" render={() => <Managers managers={managers()} />}/>
                    <Route path="/users/create" render={({history}) => <CreateUser history={history} users={users} createUser={createUser}/>}/>
                </div>
            </Router>
        )
    }
}

export default App