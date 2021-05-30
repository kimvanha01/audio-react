import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export default class Sidebar extends Component {
    render() {
        return (
            <div id="wrapper">
                <ul className="sidebar navbar-nav">
                    <li className="nav-item active">
                        <Link to={'/dashboard'} className="nav-link"><i className="fas fa-fw fa-tachometer-alt"></i>
                            <span>&nbsp;Dashboard</span></Link>
                    </li>
                    <li className="nav-item dropdown">
                        <Link className="nav-link dropdown-toggle" to={''}  id="pagesDropdown" role="button"
                           data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i className="fas fa-fw fa-folder"></i>
                            <span>&nbsp;Book Manage</span>
                        </Link>
                        <div className="dropdown-menu" aria-labelledby="pagesDropdown">
                            <h6 className="dropdown-header">Category</h6>
                            <a className="dropdown-item" href="/category">List Category</a>
                            <div className="dropdown-divider"></div>
                            <h6 className="dropdown-header">Book</h6>
                            <a className="dropdown-item" href="/book/list">List Book</a>
                        </div>
                    </li>
                    <li className="nav-item">
                        <Link to={'/fileupload'} className="nav-link"><i className="fas fa-fw fa-file-archive"></i>
                            <span>&nbsp;File Upload</span></Link>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="tables.html">
                            <i className="fas fa-fw fa-table"></i>
                            <span>&nbsp;Tables</span></a>
                    </li>
                </ul>
            </div>
        );
    }
}
