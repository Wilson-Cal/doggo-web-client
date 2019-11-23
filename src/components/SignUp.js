import React from 'react';
import { TextInput, Button, Icon, Preloader } from 'react-materialize';
import { } from './common';

class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = { loading: false, username: "", email: "", password: "", password_verify: "" };

        // This binding is necessary to make `this` work in the callback
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.signUp = this.signUp.bind(this);
    }

    handleChange(event, property) {
        this.setState({ [property]: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.signUp();
    }

    async signUp() {
        const { username, email, password, password_verify } = this.state;
        if (password === password_verify) {
            const body = { username, email, password };
            try {
                this.setState({ loading: true });
                const response = await fetch("https://doggo-express-server.herokuapp.com/api/v1/signup", {
                    body: JSON.stringify(body),
                    method: 'POST',
                    mode: 'cors'
                });
                const data = await response.text();
                this.setState({ loading: false });
                console.log(data);
            } catch (err) {
                console.error(err);
                this.setState({ loading: false });
            }
        }
    }

    render() {
        if (!this.state.loading) {
            return (
                <form onSubmit={this.signUp}>
                    <h1>Sign Up</h1>
                    <TextInput label="Username" icon="account_box" value={this.state.value} onChange={event => this.handleChange(event, "username")} required />
                    <TextInput label="Email" icon="email" value={this.state.value} onChange={event => this.handleChange(event, "email")} email validate required />
                    <TextInput label="Password" icon="lock" type="password" value={this.state.value} onChange={event => this.handleChange(event, "password")} required />
                    <TextInput label="Re-enter Password" icon="lock" type="password" value={this.state.value} onChange={event => this.handleChange(event, "password_verify")} required />
                    <Button waves="light" style={{ marginRight: '5px' }} type="submit" onClick={this.handleSubmit}>Sign Up<Icon left>send</Icon></Button>
                </form >
            );
        } else {
            return (
                <div style={{ textAlign: "center", marginTop: "25%" }}>
                    <Preloader size="big" />
                    <p>Signing Up...</p>
                </div >
            )
        }
    }
}

export default SignUp;