import React, { Component } from 'react'
import {HashRouter as Router, Route, Switch} from 'react-router-dom'
import Nav from './Nav'
import Users from './Users'
import Managers from './Managers'
import CreateUpdateUser from './CreateUpdateUser'
import store, { fetchUsers, deleteUser, createUser, updateUser } from './store'

class App extends Component {

    constructor() {
        super()
        this.deleteUser = this.deleteUser.bind(this)
        this.createUser = this.createUser.bind(this)
        this.updateUser = this.updateUser.bind(this)
    }

    componentDidMount() {
        this.unsubscribe = store.subscribe(() => this.setState(store.getState()))
        store.dispatch(fetchUsers())
    }

    componentWillUnmount() {
        this.unsubscribe()
    }

    deleteUser(id) {
        store.dispatch(deleteUser(id))
    }

    createUser(user) {
        store.dispatch(createUser(user));    
    }

    updateUser(user) {
        store.dispatch(updateUser(user))
    }

    render() {
        const { users } = store.getState()
        const { deleteUser, createUser, updateUser } = this

        const managers = () => {
            return users.filter(user => user.managerId !== null)
                .map(user => users.find( _user => _user.id === user.managerId))
        }

        const fetchUser = (id) => {
            return users.find(user => user.id === id)
        }

        return (
            <Router>
                <div>
                    <Route path="/" render={({location}) => <Nav users={users} managers={managers()} location={location} />}/>
                    <Route path="/users" render={() => <Users users={users} managers={managers()} deleteUser={deleteUser} />}/>
                    <Route path="/managers" render={() => <Managers managers={managers()} />}/>
                    <Switch>
                        <Route path="/users/create" render={({history}) => <CreateUpdateUser history={history} users={users} 
                            createUser={createUser} />}/>
                        <Route path="/users/:id" render={({history, match}) => <CreateUpdateUser history={history} users={users} 
                            updateUser={updateUser} id={match.params.id} fetchUser={fetchUser} />}/>
                    </Switch>
                </div>
            </Router>
        )
    }
}

export default App