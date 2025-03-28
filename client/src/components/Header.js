import React from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import Payments from "./Payments";

class Header extends React.Component {
    renderContent() {
        switch(this.props.auth) {
            case null:
                return;
            case false:
                return <li><a href="/auth/google">Login With Google</a></li>;
            default:
                return [ 
                    <li key="1"><Payments /></li>,
                    <li key="3" style={{margin: "0 10px"}}>Credits: {this.props.auth.credits}</li>, 
                    <li key="2"> <a href="/api/logout">Logout</a></li>
                ];
        }
    }
    render() {
        return (
            <nav>
                <div className="nav-wrapper">
                    <Link to={this.props.auth ? "/surveys" : "/"} className="left brand-logo">
                        SurveyFlow!
                    </Link>
                    <ul id="nav-mobile" className="right">
                        {this.renderContent()}
                    </ul>
                </div>  
            </nav>
        );
    }
}

function mapStateToProps(state) {
    return {auth: state.auth};
} 

export default connect(mapStateToProps)(Header); 