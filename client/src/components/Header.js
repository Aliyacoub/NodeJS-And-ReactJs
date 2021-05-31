import React from "react";
import { withRouter, Link } from "react-router-dom";
import axios from "axios"

class Header extends React.Component {

    constructor(props) {

        super(props);
        this.logout = this.logout.bind(this);
    }


    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('id');
        axios.defaults.headers.common = { 'Authorization': '' };
        this.props.history.push('/');//move to home page
    }



    render() {


        if (localStorage.getItem('token')) {
            return (

                <div className="navbar">

                    <ul>

                        <li><Link to="/"> الصفحة الرئيسية </Link></li>

                        <li><Link to="/post/create"> انشاء تدوينة </Link></li>

                        <li><a href="#logout" onClick={this.logout}>تسجيل الخروج</a></li>

                    </ul>

                </div>

            )
        }
        return (
            <div className="navbar">

                <ul>
                    <li><Link to="/"> الصفحة الرئيسية </Link></li>

                    <li><Link to="/Login"> تسجيل الدخول </Link></li>

                    <li><Link to="/Register"> التسجيل  </Link></li>

                </ul>

            </div>
        );
    }

}



export default withRouter(Header);