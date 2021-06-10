import React, { Component } from 'react';
import axios from 'axios';
import {Link, Redirect} from 'react-router-dom';

export default class Register extends Component {

    state = {
        role: 'ROLE_ADMIN',
        username: '',
        password: '',
        redirect: false,
        authError: false,
        isLoading: false,
    };

    handleUsernameChange = event => {
        this.setState({ username: event.target.value });
    };
    handlePwdChange = event => {
        this.setState({ password: event.target.value });
    };


    handleSubmit = event => {
        event.preventDefault();
        this.setState({isLoading: true});
        const url = 'http://localhost:8080/api/v1/users/sign-up';
        const username = this.state.username;
        const password = this.state.password;
        const role = this.state.role;
        let bodyFormData = new FormData();
        bodyFormData.set('username', username);
        bodyFormData.set('role', role);
        bodyFormData.set('password', password);
        axios.post(url, { username: this.state.username , password: this.state.password, role:this.state.role })
            .then(result => {
                this.setState({isLoading: false});
                if (result.data.status !== 'fail') {
                    this.setState({redirect: true, authError: true});
                }else {
                    this.setState({redirect: false, authError: true});
                }
            })
            .catch(error => {
                console.log(error);
                this.setState({ authError: true, isLoading: false });
            });
    };

    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to="/" />
        }
    };

    render() {
        const isLoading = this.state.isLoading;
        return (
            <div className="container">
                <div className="card card-login mx-auto mt-5">
                    <div className="card-header">Register</div>
                    <div className="card-body">
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <div className="form-label-group">
                                    <input type="text" id="role" className="form-control" placeholder="role"  name="role" value="ROLE_CUSTOMER" readOnly={true} required/>
                                    <label htmlFor="role">Name</label>
                                </div>
                            </div>

                            <div className="form-group">
                                <div className="form-label-group">
                                    <input id="inputUsername" className={"form-control " + (this.state.authError ? 'is-invalid' : '')} placeholder="Username address" type="text" name="username" onChange={this.handleUsernameChange} autoFocus required/>
                                    <label htmlFor="inputUsername">Username address</label>
                                    <div className="invalid-feedback">
                                        Please provide a valid Username. or Username Exis
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="form-label-group">
                                    <input type="password" className="form-control" id="inputPassword" placeholder="******"  name="password" onChange={this.handlePwdChange} required/>
                                    <label htmlFor="inputPassword">Password</label>
                                </div>
                            </div>

                            <div className="form-group">
                                <button className="btn btn-primary btn-block" type="submit" disabled={this.state.isLoading ? true : false}>Register &nbsp;&nbsp;&nbsp;
                                    {isLoading ? (
                                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                    ) : (
                                        <span></span>
                                    )}
                                </button>
                            </div>
                        </form>
                        <div className="text-center">
                            <Link className="d-block small mt-3" to={''}>Login Your Account</Link>
                            <Link className="d-block small" to={'#'}>Forgot Password?</Link>
                        </div>
                    </div>
                </div>
                {this.renderRedirect()}
            </div>
        );
    }
}


