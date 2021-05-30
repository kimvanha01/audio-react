import React, { Component } from 'react';
import axios from 'axios';
import {Link, Redirect} from 'react-router-dom';
import Header from "../elements/header";
import Sidebar from "../elements/sidebar";

export default class EditBook extends Component {

    constructor(props) {
        super(props);
        this.url = 'http://40.90.168.71:8080/book';
        this.token = localStorage.getItem('token');
    }

    state = {
        id: '',
        redirect: false,
        isLoading: false
    };

    componentDidMount() {
        const id = this.props.location.search[1];
        axios.get(this.url + '?'  + id, { params: { token: this.token}})
            .then(response => {
                const book = response.data.book;
                this.setState({id: book.id });
                document.getElementById('title').value = book.title;
                document.getElementById('author').value = book.author;
                document.getElementById('imageCover').value = book.imageCover;
                document.getElementById('status').value = book.status;
                document.getElementById('image').value = book.image;
                document.getElementById('mp3').value = book.mp3;
                document.getElementById('intro').value = book.intro;
            })
            .catch(error => {
                this.setState({ toDashboard: true });
                console.log(error);
            });
        
    }

    handleSubmit = event => {
        event.preventDefault();
        this.setState({isLoading: true});
        const token = localStorage.getItem('token');
        const url = 'http://40.90.168.71:8080/book?'+ this.state.id;
        const title = document.getElementById('title').value;
        const author = document.getElementById('author').value;
        const imageCover = document.getElementById('imageCover').value;
        const status = document.getElementById('status').value;
        const image = document.getElementById('image').value;
        const mp3 = document.getElementById('mp3').value;
        const intro = document.getElementById('intro').value;
        axios.put(url, { title:title, author:author, imageCover:imageCover, status:status, image:image, mp3:mp3, intro:intro, token:token })
            .then(result => {
                if (result.data.status) {
                    this.setState({redirect: true, isLoading: false})
                }
            })
            .catch(error => {
                this.setState({ toDashboard: true });
                console.log(error);
            });
    };

    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to='/dashboard' />
        }
    };

    render() {
        const isLoading = this.state.isLoading;
        if (this.state.toDashboard === true) {
            return <Redirect to='/' />
        }
        return (
            <div>
                <Header/>
                <div id="wrapper">
                    <Sidebar></Sidebar>
                    <div id="content-wrapper">
                        <div className="container-fluid">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item">
                                    <Link to={'/dashboard'} >Dashboard</Link>
                                </li>
                                <li className="breadcrumb-item active">Edit</li>
                            </ol>
                        </div>
                        <div className="container-fluid">
                            <div className="card mx-auto">
                                <div className="card-header">Edit Book</div>
                                <div className="card-body">
                                    <form onSubmit={this.handleSubmit}>
                                        <div className="form-group">
                                            <div className="form-row">
                                                <div className="col-md-6">
                                                    <div className="form-label-group">
                                                        <input type="text" id="title" className="form-control" placeholder="Enter title" required="required" autoFocus="autofocus" />
                                                        <label htmlFor="inputTitle">Enter Title</label>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-label-group">
                                                        <input type="text" id="author" className="form-control" placeholder="Enter Author" required="required" />
                                                        <label htmlFor="inputAuthor">Enter Author</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="form-row">
                                                <div className="col-md-6">
                                                    <div className="form-label-group">
                                                    <input type="file" name="file" id="imageCover" />
                                                        <label htmlFor="imageCover">Image Cover</label>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                <div className="form-label-group">
                                                    <label htmlFor="status">Select</label>
                                                        <input type="select" name="select" id="status">
                                                        <option>1</option>
                                                        <option>2</option>
                                                        <option>3</option>
                                                        </input>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="form-row">
                                                <div className="col-md-6">
                                                    <div className="form-label-group">
                                                    <input type="file" name="file" id="image" />
                                                        <label htmlFor="inputbookId">Image</label>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-label-group">
                                                    
                                                        <label htmlFor="inputLoca">Audio mp3</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="form-row">
                                                <div className="col-md-6">
                                                    <div className="form-label-group">
                                                        <input type="textarea" id="intro" className="form-control" placeholder="Enter Intro" required="required" />
                                                        <label htmlFor="inputIntro">Intro</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <button className="btn btn-primary btn-block" type="submit" disabled={this.state.isLoading ? true : false}>Update Book &nbsp;&nbsp;&nbsp;
                                            {isLoading ? (
                                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                            ) : (
                                                <span></span>
                                            )}
                                        </button>
                                    </form>
                                    {this.renderRedirect()}
                                </div>
                            </div>
                        </div>

                        <footer className="sticky-footer">
                            <div className="container my-auto">
                                <div className="copyright text-center my-auto">
                                    <span>Book Audio</span>
                                </div>
                            </div>
                        </footer>
                    </div>
                </div>
            </div>
        );
    }
}


