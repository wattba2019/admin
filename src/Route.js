import React, { Component } from 'react';
import { Route, Router } from 'react-router-dom';
import { connect } from "react-redux";
import history from './History';
//routs
import Signup from './authentication/signup';
import Signin from './authentication/signin';
import Sendverificationmail from './authentication/sendverificationmail';
// import Verify from './components/Verify';
// import home from './components/home';

class Routers extends Component {
 
    render() {
        return (
            <Router history={history}>
                <div>
                    <Route exact path="/" component={Signin} />
                    <Route exact path="/Signin" component={Signin} />
                    <Route exact path="/Signup" component={Signup} />
                    <Route exact path="/Sendverificationmail" component={Sendverificationmail} />
                    {/* <Route exact path="/home" component={home} />
                    <Route exact path="/forgetPassword" component={ForgetPassword} /> */}
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



