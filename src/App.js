import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import Index from "./pages/index";
import AddPage from "./pages/addBook";
import EditBook from "./pages/editBook";
import Register from "./pages/register";
import NotFound from "./pages/notfound";
import FileUploadPage from "./pages/fileupload";
import  Category  from './pages/category';
import bookByCategory from './pages/bookByCategory';
import UserList from './pages/usersList';

// function setToken(userToken) {
//     sessionStorage.setItem('token', JSON.stringify(userToken));
//   }

//   function getToken() {
//     const tokenString = sessionStorage.getItem('token');
//     const userToken = JSON.parse(tokenString);
//     return userToken?.token
// }

function App(){

    // const token = getToken();

    // if(!token) {
    //   return <Login setToken={setToken} />
    // }

        return (
            <div className="App">
                <Router>
                    <Switch>
                        <Route exact path='/' component={Login} />
                        <Route path='/dashboard' component={Dashboard} />
                        <Route exact path='/category' component={Category} />
                        <Route path='/category/book' component={bookByCategory} />
                        <Route path='/book/list' component={Index}/>
                        <Route path='/register' component={Register} />
                        <Route path='/book/add' component={AddPage} />
                        <Route path='/book' component={EditBook} />
                        <Route path='/users/list' component={UserList} />
                        <Route path='/fileupload/' component={FileUploadPage} />
                        <Route path='*' component={NotFound} />
                    </Switch>
                </Router>
            </div>
        );
    }

export default App;
