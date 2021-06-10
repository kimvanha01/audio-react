


import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import Header from "../elements/header";
import Sidebar from "../elements/sidebar";
export default  class EditBook extends Component {

    state = {
        books:[],
        id:''
    }

    constructor(props) {
        super(props);
        this.url = 'http://localhost:8080/book';
    }
    
    componentDidMount() {
        const id = this.props.location.search[4];
        console.log(id);
        console.log(this.props.location);
        axios.get('http://localhost:8080/book?id='+id) // , { params: { accessToken: this.accessToken}}
            .then(response => {
                const books = response.data;
                console.log(books);
                this.setState({ books });
            })
            .catch(error => {
                this.setState({ toDashboard: true });
                console.log(error);
            });
    }

    render() {
        const books = this.state.books;
        console.log(typeof(books));
        return (
            <div>
              <Header />
              <div id="wrapper">
                <Sidebar></Sidebar>
                <div id="content-wrapper">
                  <div className="container-fluid">
                    <ol className="breadcrumb">
                      <li className="breadcrumb-item">
                        <Link to={"/dashboard"}>Dashboard</Link>
                      </li>
                      <li className="breadcrumb-item active">Edit</li>
                    </ol>
                  </div>
                  <div className="container-fluid">
                    <div className="card mx-auto">
                      <div className="card-header">Edit Book </div>
                      <div className="card-body">
                        <form onSubmit={this.handleSubmit}>
                          <div className="form-group">
                            <div className="form-row">
                              <div className="col-md-6">
                                <div className="form-label-group">
                                  <input
                                    onChange={this.handleChange}
                                    type="text"
                                    id="inputName"
                                    name="title"
                                    className="form-control"
                                    placeholder="Enter name"
                                    required="required"
                                    autoFocus="autofocus"
                                    value={books.title}
                                  />
                                  <label htmlFor="inputName">Enter name</label>
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="form-label-group">
                                  <input
                                    onChange={this.handleChange}
                                    name="categoryId"
                                    type="text"
                                    id="inpCategory"
                                    className="form-control"
                                    placeholder="Enter Phone"
                                    required="required"
                                    
                                  />
                                  <label htmlFor="inpCategory">Enter Category</label>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="form-group">
                            <div className="form-row">
                              <div className="col-md-6">
                                <div className="form-label-group">
                                  <input
                                    onChange={this.handleChange}
                                    type="text"
                                    name="author"
                                    id="inputAuthor"
                                    className="form-control"
                                    placeholder="Email address"
                                    required="required"
                                    value={books.author}
                                  />
                                  <label htmlFor="inputAuthor">Enter Author</label>
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="form-label-group">
                                  <textarea rows={5}
                                    onChange={this.handleChange}
                                    type="text"
                                    name="intro"
                                    id="inputIntro"
                                    className="form-control"
                                    
                                    required="required"
                                    value={books.intro}
                                  />
                                 
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="form-group">
                            <div className="form-row">
                              <div className="col-md-4">
                                <div className="input-group input-group-lg">
                                  <div className="custom-file">
                                    <input
                                      type="file"
                                      name="coverImage"
                                      onChange={this.handleUploadFile}
                                      className="custom-file-input"
                                      id="coverImgInput"
                                     
                                    />
                                    <label
                                      className="custom-file-label"
                                      id="coverImageLabel"
                                      htmlFor="coverImgInput"
                                    >
                                      Cover Image
                                    </label>
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-4">
                                <div className="input-group input-group-lg">
                                  <div className="custom-file">
                                    <input
                                      type="file"
                                      name="faceBookImage"
                                      onChange={this.handleUploadFile}
                                      className="custom-file-input"
                                      id="fbImageInput"
                                     
                                    />
                                    <label
                                      className="custom-file-label"
                                      id="faceBookImageLabel"
                                      htmlFor="fbImageInput"
                                    >
                                      Face Book Image
                                    </label>
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-4">
                                <div className="input-group input-group-lg">
                                  <div className="custom-file">
                                    <input
                                      type="file"
                                      name="audioMp3"
                                      onChange={this.handleUploadFile}
                                      className="custom-file-input"
                                      id="audioInput"
                                    />
                                    <label
                                      className="custom-file-label"
                                      id="audioMp3Label"
                                      htmlFor="audioInput"
                                    >
                                      Audio mp3
                                    </label>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <button
                            className="btn btn-primary btn-block"
                            type="submit"
                            disabled={this.state.isLoading ? true : false}
                          >
                            Upload Book &nbsp;&nbsp;&nbsp;
                            {/* {isLoading ? (
                              <span
                                className="spinner-border spinner-border-sm"
                                role="status"
                                aria-hidden="true"
                              ></span>
                            ) : (
                              <span></span>
                            )} */}
                          </button>
                        </form>
                        {/* {this.renderRedirect()} */}
                      </div>
                    </div>
                  </div>
      
                  <footer className="sticky-footer">
                    <div className="container my-auto">
                      <div className="copyright text-center my-auto">
                        <span>
                          Copyright © Your Website{" "}
                          <div>{new Date().getFullYear()}</div>
                        </span>
                      </div>
                    </div>
                  </footer>
                </div>
              </div>
            </div>
          );
        }
}

