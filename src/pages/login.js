import React, {Component} from 'react';
import axios from 'axios';
import {Link, Redirect} from 'react-router-dom';
import TitleComponent from "./title";

export default class Login extends Component {

    state = {
        username: '',
        password: '',
        redirect: false,
        authError: false,
        isLoading: false,
        // location: {},
    };

    handleUsernameChange = event => {
        this.setState({username: event.target.value});
    };
    handlePwdChange = event => {
        this.setState({password: event.target.value});
    };

    handleSubmit =  async (event) => {
        event.preventDefault();
        this.setState({isLoading: true});
        const url = 'http://localhost:8080/api/v1/users/log-in';
        const username = this.state.username;
        const password = this.state.password;
        let bodyFormData = new FormData();
        bodyFormData.append('username', username);
        bodyFormData.append('password', password);

        console.log(username, password);
        const config = {     
            headers: { 'content-type': 'application/json' }
        }    
        
        axios.post(url, { username: this.state.username , password: this.state.password }, config)
            .then( res => {
                console.log(res);

                if(res.data.data){
                    localStorage.setItem('token', res.data.data.accessToken);
                    this.setState({redirect: true, isLoading: false});
                    localStorage.setItem('isLoggedIn', true);
                }
            }

            )
            .catch(error => {
                console.log('and here..')
                console.log(error);
                this.setState({authError: true, isLoading: false});
            });
    };

    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to='/dashboard'/>
        }
    };

    render() {
        const isLoading = this.state.isLoading;
        return (
            <div className="container">
                <TitleComponent title="AUCMS Login "></TitleComponent>
                <div className="card card-login mx-auto mt-5">
                    <div className="card-header">Login</div>

                    <div className="card-body">
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <div className="form-label-group">
                                    <input className={"form-control " + (this.state.authError ? 'is-invalid' : '')} id="inputUsername" placeholder="Username address" type="text" name="username" onChange={this.handleUsernameChange} autoFocus required/>
                                    <label htmlFor="inputUsername">Username</label>
                                    <div className="invalid-feedback">
                                        Please provide a valid Username.
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="form-label-group">
                                    <input type="password" className={"form-control " + (this.state.authError ? 'is-invalid' : '')} id="inputPassword" placeholder="******" name="password" onChange={this.handlePwdChange} required/>
                                    <label htmlFor="inputPassword">Password</label>
                                    <div className="invalid-feedback">
                                        Please provide a valid Password.
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="checkbox">
                                    <label>
                                        <input type="checkbox" value="remember-me"/>Remember Password
                                    </label>
                                </div>
                            </div>
                            <div className="form-group">
                                <button className="btn btn-primary btn-block" type="submit" disabled={this.state.isLoading ? true : false}>Login &nbsp;&nbsp;&nbsp;
                                    {isLoading ? (
                                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                    ) : (
                                        <span></span>
                                    )}
                                </button>
                            </div>
                            <div className="form-group">
                                <div className="form-group">
                                    <b>Username:</b> admin
                                </div>
                                <div className="form-group">
                                    <b>password :</b> Namdinh2110@
                                </div>
                            </div>
                        </form>
                        <div className="text-center">
                            <Link className="d-block small mt-3" to={'register'}>Register an Account</Link>
                            <a className="d-block small" href="forgot-password.html">Forgot Password?</a>
                        </div>
                    </div>
                </div>
                {this.renderRedirect()}
            </div>
        );
    }
}
