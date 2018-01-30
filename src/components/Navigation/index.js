import React from 'react';
import { Link } from 'react-router-dom'

export default class Navigation extends React.Component {
   
    render() {
        return (
            <div>
                dsa
                <Link to="/">
                    home
                </Link><br/>
                <Link to="/register">
                    reg
                </Link>
                
            </div>
        );
    }
}