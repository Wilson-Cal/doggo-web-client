import React from 'react';
import { TextInput, Button, Icon, Preloader, Row, Col } from 'react-materialize';
import { Link, withRouter } from "react-router-dom";
import { } from './common';

import makeRequest from '../utilities/makeRequest.js';

class LogIn extends React.Component {

    constructor(props) {
        super(props);
        this.state = { loading: false, email: "", password: "", error: "", validated: false };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.logIn = this.logIn.bind(this);
    }

    handleChange(event, property) {
        this.setState({ [property]: event.target.value }, () => {
            const { email, password } = this.state;
            const emailRegex = /@.+\..{3}$/g;
            const validated = email.length > 0 && password.length > 0 && emailRegex.test(email);
            this.setState({ validated });
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.logIn();
    }

    async logIn() {
        const { email, password, validated } = this.state;
        if (validated) {
            this.setState({ loading: true });
            let body = { email, password }
            let requestObj = {
                method: 'POST',
                body: JSON.stringify(body)
            };
            let response = await makeRequest('https://doggo-express-server.herokuapp.com/api/v1/login', requestObj);
            if (!response.match) {
                this.setState({ error: "Invalid Email or Password", loading: false, validated: false });
            } else {
                this.props.setCookie('doggo-auth', response.cookieValue, { expires: new Date((Date.now() + 86400000)) });
                this.props.setUser("Temp Username", email);
                this.setState({ loading: false, validated: false, error: '' });
            }
        }
    }

    render() {
        if (!this.state.loading) {
            return (
                <div className="center-align" style={{ margin: 'auto', width: '50%', padding: '100px 0' }}>
                    <form>
                        <h1>Log In</h1>
                        <TextInput label="Email" icon="email" value={this.state.value} onChange={event => this.handleChange(event, "email")} email validate required />
                        <TextInput label="Password" icon="lock" type="password" value={this.state.value} onChange={event => this.handleChange(event, "password")} validate required />
                        <Row>
                            <Col s={12} l={6}>
                                <Button waves="light" style={{ width: '100%', marginBottom: '10px' }} className="orange lighten-1" type="submit" onClick={this.handleSubmit} disabled={!this.state.validated}>Log In<Icon left>send</Icon></Button>
                            </Col>
                            <Col s={12} l={6}>
                                <Link to='/signup'><Button style={{ width: '100%' }} className='orange lighten-1'>Sign Up<Icon left>send</Icon></Button></Link>
                            </Col>
                        </Row>

                        <p className="red-text text-lighten-1">{this.state.error}</p>
                    </form>
                </div>
            )
        } else {
            return (
                <div style={{ textAlign: "center", marginTop: "25%" }}>
                    <Preloader size="big" />
                    <p>Finding Dog House...</p>
                </div >
            )
        }

    }
}

export default withRouter(LogIn);