import React from 'react';
import { TextInput, Select, Button, Icon, Preloader, Modal } from 'react-materialize';
import {
    withRouter
} from 'react-router-dom';
import { } from './common';

import makeRequest from '../utilities/makeRequest.js';



class AddDog extends React.Component {
    constructor(props) {
        super(props);
        this.state = { loading: false, name: "", type: "", sex: "", age: 0, color: "", weight: 0, height: 0, available: false, price: 0, validated: false, error: "", showModal: false, modalContent: "" };
        this.modalOptions = { onCloseStart: this.routeToHome }
        // This binding is necessary to make `this` work in the callback
        this.routeToHome = this.routeToHome.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.addDog = this.addDog.bind(this);
    }

    routeToHome = () => {
        this.props.history.push('/');
    }

    handleChange(event, property) {
        this.setState({ [property]: event.target.value }, () => {
            const { name, type, sex, age, color, weight, height, available } = this.state;
            const validated = name && type && sex && age && color && weight && height && available;
            this.setState({ validated });
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.addDog();
    }

    async addDog() {
        let { user_id, authToken } = this.props;
        let { validated, name, type, sex, age, color, weight, height, available, price } = this.state;
        if (validated) {
            sex = sex.toLowerCase() === 'male' ? true : false;
            available = available === 'true' ? true : false;
            user_id = Number(user_id);
            age = Number(age);
            weight = Number(weight);
            height = Number(height);
            const body = { owner_id: user_id, name, type, sex, age, color, weight, height, available, price };
            let requestObj = {
                method: 'POST',
                body: JSON.stringify(body)
            };
            console.log(body);
            this.setState({ loading: true });
            let response = await makeRequest('https://doggo-express-server.herokuapp.com/api/v1/dogs', requestObj, authToken);
            if (response.error) {
                console.log(response.error_message);
                this.setState({ error: response.error_message, loading: false, validated: false });
            } else {
                this.setState({ loading: false, validated: false, error: "", showModal: true, modalContent: "Doggo Succesfully Added" });
            }
        }
    }

    render() {
        if (!this.state.loading) {
            return (
                <form onSubmit={this.signUp}>
                    <h3>Add Doggo</h3>
                    <TextInput label="Name" icon="pets" value={this.state.value} onChange={event => this.handleChange(event, "name")} validate required />
                    <Select
                        label="Type"
                        icon={<Icon>list</Icon>}
                        onChange={event => this.handleChange(event, "type")}
                        options={{
                            classes: '',
                            dropdownOptions: {
                                alignment: 'left',
                                autoTrigger: true,
                                closeOnClick: true,
                                constrainWidth: true,
                                container: null,
                                coverTrigger: true,
                                hover: false,
                                inDuration: 150,
                                onCloseEnd: null,
                                onCloseStart: null,
                                onOpenEnd: null,
                                onOpenStart: null,
                                outDuration: 250
                            }
                        }}
                        value={this.state.value}>
                        <option defaultValue={true} value=""></option>
                        <option value='Pupper'>Pupper</option>
                        <option value='Doggo'>Doggo</option>
                        <option value='Woofer'>Woofer</option>
                    </Select >
                    <Select
                        label="Sex"
                        icon={<Icon>wc</Icon>}
                        onChange={event => this.handleChange(event, "sex")}
                        options={{
                            classes: '',
                            dropdownOptions: {
                                alignment: 'left',
                                autoTrigger: true,
                                closeOnClick: true,
                                constrainWidth: true,
                                container: null,
                                coverTrigger: true,
                                hover: false,
                                inDuration: 150,
                                onCloseEnd: null,
                                onCloseStart: null,
                                onOpenEnd: null,
                                onOpenStart: null,
                                outDuration: 250
                            }
                        }}
                        value={this.state.value}>
                        <option defaultValue={true} value=""></option>
                        <option value={true}>Male</option>
                        <option value={false}>Female</option>
                    </Select >
                    <TextInput label="Color" icon="color_lens" value={this.state.value} onChange={event => this.handleChange(event, "color")} validate required />
                    <TextInput label="Age" icon="cake" type="number" value={this.state.value} onChange={event => this.handleChange(event, "age")} validate required />
                    <TextInput label="Weight (Ounces)" icon="slow_motion_video" type="number" value={this.state.value} onChange={event => this.handleChange(event, "weight")} validate required />
                    <TextInput label="Height (Inches)" icon="height" type="number" value={this.state.value} onChange={event => this.handleChange(event, "height")} validate required />                    <Select
                        label="For Sale"
                        icon={<Icon>attach_money</Icon>}
                        onChange={event => this.handleChange(event, "available")}
                        options={{
                            classes: '',
                            dropdownOptions: {
                                alignment: 'left',
                                autoTrigger: true,
                                closeOnClick: true,
                                constrainWidth: true,
                                container: null,
                                coverTrigger: true,
                                hover: false,
                                inDuration: 150,
                                onCloseEnd: null,
                                onCloseStart: null,
                                onOpenEnd: null,
                                onOpenStart: null,
                                outDuration: 250
                            }
                        }}
                        value={this.state.value}>
                        <option defaultValue={true} value=""></option>
                        <option value={true}>Yes</option>
                        <option value={false}>No</option>
                    </Select >
                    <TextInput label="Price" icon="attach_money" type="number" value={this.state.value} onChange={event => this.handleChange(event, "price")} validate />
                    <Button waves="light" style={{ marginRight: '5px' }} className='orange lighten-1' type="submit" onClick={this.handleSubmit} disabled={!this.state.validated}>Add Doggo<Icon left>pets</Icon></Button>
                    <p className="red-text text-lighten-1">{this.state.error}</p>
                    <Modal header="Add Doggo" open={this.state.showModal} options={this.modalOptions}>{this.state.modalContent}</Modal>
                </form>
            );
        } else {
            return (
                <div style={{ textAlign: "center", marginTop: "25%" }}>
                    <Preloader size="big" />
                    <p>Adding Doggo...</p>
                </div >
            )
        }
    }
}

export default withRouter(AddDog);