import React, { Component } from 'react';
import Header from "../elements/header";
import Sidebar from "../elements/sidebar";
import {Link, Redirect} from 'react-router-dom';
import axios from 'axios';

export default class bookByCategory extends Component {
    state = {
        books: [],
        categories:[],
        id:'',
        toDashboard: false,
        isLoading: false
    };

    constructor(props) {
        super(props);
        this.url = 'http://40.90.168.71:8080/category/book';
        this.accessToken = localStorage.getItem('accessToken');
    }

    componentDidMount() {
        const id = this.props.location.search[4];
        console.log(id);
        console.log(this.props.location);
        axios.get('http://40.90.168.71:8080/category/book?id='+id) // , { params: { accessToken: this.accessToken}}
            .then(response => {
                const categories = response.data;
                console.log(categories);
                const books = categories.books;
                this.setState({ books });
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
        // if (this.state.toDashboard === true) {
        //     return <Redirect to='/' />
        // }
        return (
            <div>
                <Header/>
                <div id="wrapper">
                    <Sidebar/>
                    <div id="content-wrapper">
                        <div className="container-fluid">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item">
                                    <Link to={'/dashboard'} >Books Manage</Link>
                                </li>
                                <li className="breadcrumb-item active">List Books</li>
                                <li className="ml-auto"><Link to={'add'}>Add Book</Link></li>
                            </ol>
                            <div className="card mb-3">
                                <div className="card-header"><i className="fas fa-table"></i>
                                    &nbsp;&nbsp;Books List
                                </div>
                                <div className="card-body">
                                    <table className="table table-bordered">
                                        <thead>
                                            {}
                                        <tr>
                                            <th>id</th>
                                            <th>Name</th>
                                            <th>Author</th>
                                            <th>Cover Image</th>
                                            <th>Status</th>
                                            <th>Image</th>
                                            <th>Intro</th>
                                            <th className="text-center">Action</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.books.map((book, index)=> 
                                                <tr key={book.id}>
                                                    <td>{index + 1}</td>
                                                    <td>{book.title}</td>
                                                    <td>{book.author}</td>
                                                    <td><img style={{width: 200}} alt={book.title} src={book.coverImage} /></td>
                                                    <td>{book.status ? 'Active' : ''}</td>
                                                    <td><img style={{width: 200}} alt={book.title} src={book.image} /></td>
                                                    <td>{book.intro}</td>
                                                    <td className="text-center">
                                                        <Link className="btn btn-sm btn-info" to={{ pathname: 'edit', search: '?id=' + book.id }}>Edit</Link>
                                                        &nbsp; | &nbsp;
                                                        <button value={book.id} className="btn btn-sm btn-danger" disabled={ index === 0  ? true : false} onClick={this.handleClickDelete} >Delete</button>
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
