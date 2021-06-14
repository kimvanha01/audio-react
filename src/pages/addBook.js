import React, { Component } from "react";
import Header from "../elements/header";
import Sidebar from "../elements/sidebar";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";

export default class AddPage extends Component {
  state = {
    categoryId: "",
    title: "",
    author: "",
    intro: "",
    coverImage: undefined,
    faceBookImage: undefined,
    audioMp3: undefined,
    redirect: false,
    toDashboard: false,
    isLoading: false,
  };

  handleChange = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    this.setState({
      ...this.state,
      [name]: value,
    });
  };

  handleUploadFile = (event) => {
    // event.preventDefault();
    let name = event.target.name;
    this.setState({
      ...this.state,
      [name]: event.target.files[0],
    });
    document.getElementById(name + "Label").innerHTML =
      event.target.files[0].name;
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ isLoading: true });
    const url = "http://localhost:8080/api/v1/admin/upload-file-s3";
    const book = {
      categoryId: this.state.categoryId,
      title: this.state.title,
      author: this.state.author,
      intro: this.state.intro,
    };

    const formData = new FormData();
    formData.append('book', JSON.stringify(book));
    formData.append('coverImage', this.state.coverImage);
    formData.append('faceBookImage', this.state.faceBookImage);
    formData.append('audioMp3', this.state.audioMp3);

    const config = {
      headers: { "content-type": "multipart/form-data" },
    };

    axios
      .post(url, formData, config)
      .then((result) => {
        this.setState({ isLoading: false });
        console.log(result.data);
        if (result.data.errorCode === "200") {
          alert("Upload Book Successfully");
          this.setState({ redirect: true, isLoading: false });
        } else {
          this.setState({ toDashboard: true });
          alert("Wrong");
        }
      })
      .catch((error) => {
        this.setState({ toDashboard: true });
        alert(error);
      });
  };

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to="/book/list" />;
    }
  };

  render() {
    const isLoading = this.state.isLoading;
    if (this.state.toDashboard === true) {
      // return <Redirect to="/dashboard" />;
    }
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
                <li className="breadcrumb-item active">Add</li>
              </ol>
            </div>
            <div className="container-fluid">
              <div className="card mx-auto">
                <div className="card-header">Book Add</div>
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
                            />
                            <label htmlFor="inputAuthor">Enter Author</label>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-label-group">
                            <input
                              onChange={this.handleChange}
                              type="text"
                              name="intro"
                              id="inputIntro"
                              className="form-control"
                              placeholder="Enter Company"
                              required="required"
                            />
                            <label htmlFor="inputIntro">Enter Intro</label>
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
                      {isLoading ? (
                        <span
                          className="spinner-border spinner-border-sm"
                          role="status"
                          aria-hidden="true"
                        ></span>
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
