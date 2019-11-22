import React from 'react';
import { TextInput, Button, Icon } from 'react-materialize';
import { } from './common';

class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = { username: "", email: "", password: "", password_verify: "" };

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
        //const { username, email, password, password_verify } = this.state;
        try {
            const response = await fetch("https://doggo-express-server.herokuapp.com/api/v1/users/1", {
                method: 'get',
                headers: {
                    'authorization': "REHEX2B-R51MB6Y-MGVJWGP-HSJW140"
                },
                mode: 'no-cors'
            });
            console.log(response)
        } catch (err) {
            console.error(err);
        }
    }

    render() {
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
    }
}

export default SignUp;