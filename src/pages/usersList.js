import React, { Component } from 'react';
import Header from "../elements/header";
import Sidebar from "../elements/sidebar";
import {Link, Redirect} from 'react-router-dom';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import axios from 'axios';

export default class UserList extends Component {
    state = {
        users: [],
        toDashboard: false,
        isLoading: false,
        
    };

    constructor(props) {
        super(props);
        this.url = 'http://localhost:8080/api/v1/api/v1/admin/users/list?limit=10&offset=0';
        this.accessToken = localStorage.getItem('accessToken');
    }

    componentDidMount() {
        const offset = this.props.location.search[4];
        axios.get(this.url ) 
            .then(response => {
                const dataRes = response.data.data;
                console.log(dataRes);
                const users = dataRes.listRecord;  
                const totalPages = dataRes.totalPages;
                console.log(users);
                this.setState({ users });
            })
            .catch(error => {
                this.setState({ toDashboard: true });
                console.log(error);
            });
    }

    // handleClickDelete = event => {
    //     axios.delete(this.url + '/' + event.target.value , { params: { accessToken: this.accessToken}})
    //         .then(response => {
    //             this.componentDidMount();
    //             this.setState({ isLoading: true})
    //         })
    //         .catch( error => {
    //             console.log(error.toString());
    //             this.setState({ toDashboard: true });
    //         });
    // };

    render() {
        if (this.state.toDashboard === true) {
            return <Redirect to='/' />
        }
        return (
            <div>
                <Header/>
                <div id="wrapper">
                    <Sidebar/>
                    <div id="content-wrapper">
                        <div className="container-fluid">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item">
                                    <Link to={'/dashboard'} >users Manage</Link>
                                </li>
                                <li className="breadcrumb-item active">List users</li>
                                <li className="ml-auto"><Link to={'add'}>Add user</Link></li>
                            </ol>
                            <div className="card mb-3">
                                <div className="card-header"><i className="fas fa-table"></i>
                                    &nbsp;&nbsp;users List
                                </div>
                                <div className="card-body">
                                    <table className="table table-bordered">
                                        <thead>
                                            {}
                                        <tr>
                                            <th>No.</th>
                                            <th>ID</th>
                                            <th>Name</th>
                                            <th>Status</th>
                                            
                                 
                                            <th className="text-center">Action</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.users.map(( user, index)=> 
                                                <tr key={user.id}>
                                                    <td>{index + 1}</td>
                                                    <td>{user.id }</td>
                                                    <td>{user.username}</td>
                                                    <td>{user.status}</td>
                                                    
                                                    <td className="text-center">
                                                        <Link className="btn btn-sm btn-info" to={{ pathname: '/user', search: '?id=' + user.id }}>Edit</Link>
                                                        &nbsp; | &nbsp;
                                                        <button value={user.id} className="btn btn-sm btn-danger" disabled={ index === 0  ? true : false} onClick={this.handleClickDelete} >Delete</button>
                                                    </td>
                                                </tr>)
                                            }
                                        </tbody>
                                    </table>
                                    <Pagination size="sm" aria-label="Page navigation">
                                    <PaginationItem>
                                        <PaginationLink first href="#" />
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationLink previous href="#" />
                                    </PaginationItem>
                                    <PaginationItem>
                                    {/* <Link to={{ pathname: '/users/list', search: '&offset=1'  }}>
                                    1
                                        </Link> */}
                                       <PaginationLink href="#">
                                        1
                                        </PaginationLink>
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationLink href="#">
                                        2
                                        </PaginationLink>
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationLink href="#">
                                        3
                                        </PaginationLink>
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationLink next href="#" />
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationLink last href="#" />
                                    </PaginationItem>
                                    </Pagination>
                                </div>
                                <div className="card-footer small text-muted">Updated yesterday at 11:59 PM</div>
                            </div>
                        </div>
                        <footer className="sticky-footer">
                            <div className="container my-auto">
                                <div className="copyright text-center my-auto">
                                    <span>Copyright © Your Website 2019</span>
                                </div>
                            </div>
                        </footer>
                    </div>
                </div>
            </div>
        );
    }
}