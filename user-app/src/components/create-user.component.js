import React, { Component } from 'react';
import axios from 'axios';

export default class CreateUser extends Component {
    constructor(props) {
        super(props);
        this.onChangeUserName = this.onChangeUserName.bind(this);
        this.onChangeUserSurname = this.onChangeUserSurname.bind(this);
        this.onChangeUserEmail = this.onChangeUserEmail.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            user_name: '',
            user_surname: '',
            user_email: ''
        }
    }
    onChangeUserName(e) {
        this.setState({
            user_name: e.target.value
        });
    }
    onChangeUserSurname(e) {
        this.setState({
            user_surname: e.target.value
        });
    }
    onChangeUserEmail(e) {
        this.setState({
            user_email: e.target.value
        });
    }
    onSubmit(e) {
        e.preventDefault();

        const newUser = {
            user_name: this.state.user_name,
            user_surname: this.state.user_surname,
            user_email: this.state.user_email
        };

        // call post api
        axios.post('http://localhost:4000/users/add', newUser)
            .then(res => {
                if (res.status !== 200) {
                    console.log('an error occured with status code: ' + res.status);
                    return;
                }
                // handle success    
                alert('user added successfully');
                this.setState({
                    user_name: '',
                    user_surname: '',
                    user_email: ''
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    render() {
        return (
            <div style={{ marginTop: 10 }}>
                <h3>Create New User</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Name: </label>
                        <input type="text"
                            className="form-control"
                            value={this.state.user_name}
                            onChange={this.onChangeUserName}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>SurName: </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.user_surname}
                            onChange={this.onChangeUserSurname}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Email: </label>
                        <input
                            type="email"
                            className="form-control"
                            value={this.state.user_email}
                            onChange={this.onChangeUserEmail}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create User" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}