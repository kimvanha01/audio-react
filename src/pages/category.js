import React, { Component } from 'react';
import Header from "../elements/header";
import Sidebar from "../elements/sidebar";
import {Link, Redirect} from 'react-router-dom';
import axios from 'axios';
// import { List, ListItem } from '@material-ui/core';

export default class Category extends Component {
    state = {
        categories: [],
        books:[],
        toDashboard: false,
        isLoading: false
    };

    constructor(props) {
        super(props);
        // this.url = 'https://gowtham-rest-api-crud.herokuapp.com/employees';
        this.url = 'http://40.90.168.71:8080/category/list';
        this.accessToken = localStorage.getItem('accessToken');
    }

    componentDidMount() {
        axios.get(this.url) // , { params: { accessToken: this.accessToken}}
            .then(response => {
                const categories = response.data;
                console.log(categories);
                this.setState({ categories });
            })
            .catch(error => {
                this.setState({ toDashboard: true });
                console.log(error);
            });
    }

    handleClickDelete = event => {
        axios.delete(this.url + '/' + event.target.value , { params: { accessToken: this.accessToken}})
            .then(response => {
                this.componentDidMount();
                this.setState({ isLoading: true})
            })
            .catch( error => {
                console.log(error.toString());
                this.setState({ toDashboard: true });
            });
    };

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
                                    <Link to={'/dashboard'} >categories Manage</Link>
                                </li>
                                <li className="breadcrumb-item active">List Categories</li>
                                <li className="ml-auto"><Link to={'add'}>Add Categories</Link></li>
                            </ol>
                            <div className="card mb-3">
                                <div className="card-header"><i className="fas fa-table"></i>
                                    &nbsp;&nbsp;List Categories
                                </div>
                                <div className="card-body">
                                    <table className="table table-bordered">
                                        <thead>
                                            {}
                                        <tr>
                                            <th>id</th>
                                            <th>Name</th>

                                            <th className="text-center">Action</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.categories.map((category , index)=> 
                                                <tr key={category.id}>
                                                    <td>{index + 1}</td>
                                                    {/* <td><a href={"#"}></a></td> */}
                                                    <td> <Link to={{ pathname: 'category/book', search: '?id=' + category.id }}>{category.name}</Link> </td>
                                                    <td className="text-center">
                                                        <Link className="btn btn-sm btn-info" to={{ pathname: 'edit', search: '?id=' + category.id }}>Edit</Link>
                                                        &nbsp; | &nbsp;
                                                        <button value={category.id} className="btn btn-sm btn-danger" disabled={ index === 0  ? true : false} onClick={this.handleClickDelete} >Delete</button>
                                                    </td>
                                                </tr>)
                                            }
                                        </tbody>
                                    </table>
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