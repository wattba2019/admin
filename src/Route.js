import React, { Component } from 'react';
import { Route, Router } from 'react-router-dom';
import { connect } from "react-redux";
import history from './History';
//routs
import Signup from './authentication/signup';
import Signin from './authentication/signin';
import Sendverificationmail from './authentication/sendverificationmail';
import VerifyCode from './authentication/verifycode';
import ChangePassword from './authentication/changepassword';
import Home from './app/home';

class Routers extends Component {
    render() {
        return (
            <Router history={history}>
                <div>
                    <Route path="/Home" component={Home} />
                    <Route exact path="/" component={Home} />
                    <Route path="/Signin" component={Signin} />
                    <Route path="/Signup" component={Signup} />
                    <Route path="/Sendverificationmail" component={Sendverificationmail} />
                    <Route path="/VerifyCode" component={VerifyCode} />
                    <Route path="/ChangePassword" component={ChangePassword} />
                </div>
            </Router>
        )
    }
}

let mapStateToProps = state => {
    return {
    };
};
function mapDispatchToProps(dispatch) {
    return ({
    })
}
export default connect(mapStateToProps, mapDispatchToProps)(Routers);



