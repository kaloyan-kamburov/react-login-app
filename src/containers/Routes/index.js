import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Redirect } from 'react-router-dom';

import HomeContainer from '../../containers/Home/';
import RegisterContainer from '../../containers/Register/';
import LoginContainer from '../../containers/Login/';
import ProfileContainer from '../../containers/Profile/';
import UsersContainer from '../../containers/Admin/Users/';
import UserEditContainer from '../../containers/Admin/Users/edit';
import CategoriesContainer from '../../containers/Admin/Categories/';
import CategoryAddContainer from '../../containers/Admin/Categories/add';
import CategoryEditContainer from '../../containers/Admin/Categories/edit';
import ProductsContainer from '../../containers/Admin/Products/';
import ProductAddContainer from '../../containers/Admin/Products/add';
import ProductEditContainer from '../../containers/Admin/Products/edit';

class Routes extends Component {
    render() {
        return(
            <div>
                <Switch>
                    <Route exact path='/' component={HomeContainer}/>
                    <Route path='/register' component={RegisterContainer}/>
                    <Route path='/login' component={LoginContainer}/>
                    <Route path='/profile' component={ProfileContainer}/> 
                    
                    <Route exact path='/admin/users' component={UsersContainer}/> 
                    <Route path='/admin/users/edit/:id' component={UserEditContainer} />
                    
                    <Route exact path='/admin/categories/' component={CategoriesContainer} />
                    <Route exact path='/admin/categories/edit/:id' component={CategoryEditContainer} />
                    <Route path='/admin/categories/add/' component={CategoryAddContainer} />  
                    
                    <Route exact path='/admin/products/' component={ProductsContainer} /> 
                    <Route exact path='/admin/products/edit/:id' component={ProductEditContainer} />
                    <Route path='/admin/products/add' component={ProductAddContainer} /> 
                    <Redirect to='/' />
                </Switch>
            </div> 
        )
    }
}

export default Routes;