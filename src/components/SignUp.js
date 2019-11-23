import React from 'react';
import { TextInput, Button, Icon, Preloader, Modal } from 'react-materialize';
import { } from './common';

import makeRequest from '../utilities/makeRequest.js';

class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = { loading: false, username: "", email: "", password: "", password_verify: "", validated: false, error: "", showModal: false, modalContent: "" };

        // This binding is necessary to make `this` work in the callback
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.signUp = this.signUp.bind(this);
    }

    handleChange(event, property) {
        this.setState({ [property]: event.target.value }, () => {
            const { username, email, password, password_verify } = this.state;
            const validated = username.length > 4 && email.length > 4 && password.length > 6 && password_verify.length > 6 && password_verify === password;
            this.setState({ validated });
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.signUp();
    }

    async signUp() {
        const { username, email, password } = this.state;
        if (this.state.validated) {
            const body = { username, email, password };
            this.setState({ loading: true });
            let response = await makeRequest('https://doggo-express-server.herokuapp.com/api/v1/signup', body);
            if (response.error) {
                this.setState({ error: response.error_message, loading: false, validated: false });
            } else {
                this.setState({ loading: false, validated: false, error: "", showModal: true, modalContent: "Account Succesfully Created" });
            }
        } else {
            // throw error
        }
    }

    render() {
        if (!this.state.loading) {
            return (
                <form onSubmit={this.signUp}>
                    <h1>Sign Up</h1>
                    <TextInput label="Username" icon="account_box" value={this.state.value} onChange={event => this.handleChange(event, "username")} validate required />
                    <TextInput label="Email" icon="email" value={this.state.value} onChange={event => this.handleChange(event, "email")} email validate required />
                    <TextInput label="Password" icon="lock" type="password" value={this.state.value} onChange={event => this.handleChange(event, "password")} validate required />
                    <TextInput label="Re-enter Password" icon="lock" type="password" value={this.state.value} onChange={event => this.handleChange(event, "password_verify")} validate required />
                    <Button waves="light" style={{ marginRight: '5px' }} type="submit" onClick={this.handleSubmit} disabled={!this.state.validated}>Sign Up<Icon left>send</Icon></Button>
                    <p className="red-text text-lighten-1">{this.state.error}</p>
                    <Modal header="Doggo Account" open={this.state.showModal}>{this.state.modalContent}</Modal>
                </form>
            );
        } else {
            return (
                <div style={{ textAlign: "center", marginTop: "25%" }}>
                    <Preloader size="big" />
                    <p>Building Dog House...</p>
                </div >
            )
        }
    }
}

export default SignUp;