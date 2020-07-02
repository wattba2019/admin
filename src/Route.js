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
import AutoComplete from './components/autoComplete';
import { setUserCredentials, } from "./store/action/action";

class Routers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            authUser: false,
        }
    }

    componentWillMount() {
        let user = localStorage.getItem('userProfile')
        this.props.setUserCredentials(JSON.parse(user))
        if (user != null) {
            this.setState({
                authUser: true,
            })
        }
        else {
            this.setState({
                authUser: false,
            })
        }
    }

    render() {
        const { authUser } = this.state
        return (
            <Router history={history}>
                {
                    (authUser) ? (
                        <div>
                            <Route exact path="/" component={Home} />
                            <Route path="/Home" component={Home} />
                            <Route path="/Signin" component={Signin} />
                            <Route path="/Signup" component={Signup} />
                            <Route path="/Sendverificationmail" component={Sendverificationmail} />
                            <Route path="/VerifyCode" component={VerifyCode} />
                            <Route path="/ChangePassword" component={ChangePassword} />
                        </div>

                    ) : <div>
                            {/* <Route exact path="/" component={AutoComplete} /> */}
                            <Route exact path="/" component={Signin} />
                            <Route path="/Signin" component={Signin} />
                            <Route path="/Signup" component={Signup} />
                            <Route path="/Sendverificationmail" component={Sendverificationmail} />
                            <Route path="/VerifyCode" component={VerifyCode} />
                            <Route path="/ChangePassword" component={ChangePassword} />
                            <Route path="/Home" component={Home} />

                        </div>
                }
            </Router>
        )
    }
}

let mapStateToProps = state => {
    return {
        userProfile: state.root.userProfile,
    };
};
function mapDispatchToProps(dispatch) {
    return ({
        setUserCredentials: (user) => {
            dispatch(setUserCredentials(user));
        },
    })
}
export default connect(mapStateToProps, mapDispatchToProps)(Routers);



