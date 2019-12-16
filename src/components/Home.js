import React from 'react';
import { Preloader, Button, Icon } from 'react-materialize';
import { } from './common';

import makeRequest from '../utilities/makeRequest.js';

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = { loading: true, doggos: [] };
        this.renderDoggos = this.renderDoggos.bind(this);
        this.fetchDoggos = this.fetchDoggos.bind(this);
    }

    componentDidMount() {
        this.fetchDoggos();
    }

    async deleteDog(dog_id) {
        const { authToken } = this.props;
        let { doggos } = this.state;
        let requestObj = {
            method: 'DELETE'
        }
        try {
            this.setState({ loading: true, asyncMessage: "Deleting Doggo..." });
            const deleted_doggo_id = await makeRequest(`https://doggo-express-server.herokuapp.com/api/v1/dogs/${dog_id}`, requestObj, authToken);

            doggos = doggos.filter(dog => dog.id !== Number(deleted_doggo_id.id));
            this.setState({ doggos, loading: false, asyncMessage: "" });
        } catch (err) {
            this.setState({ loading: false, asyncMessage: "" });
        }
    }

    async fetchDoggos() {
        const { user, authToken } = this.props;
        let requestObj = {
            method: 'GET',
        };
        try {
            this.setState({ loading: true, asyncMessage: "Fetching Doggos..." });
            const doggos = await makeRequest(`https://doggo-express-server.herokuapp.com/api/v1/${user.user_id}/dogs`, requestObj, authToken);
            this.setState({ doggos, loading: false, asyncMessage: "" });
        } catch (err) {
            this.setState({ loading: false, asyncMessage: "" });
        }
    }

    renderDoggos() {
        const { loading, doggos, asyncMessage } = this.state;
        if (loading) {
            return (
                <div style={{ textAlign: "center", marginTop: "10%" }}>
                    <Preloader size="big" />
                    <p>{asyncMessage}</p>
                </div>
            );
        } else {
            if (doggos.length > 0) {
                return (<div className="row"> {doggos.map(dog => {
                    dog.sex = dog.sex ? "Male" : "Female";
                    dog.available = dog.available ? "Yes" : "No";
                    return (
                        <div key={dog.id}>
                            <div className="col s12 m4">
                                <div className="card medium">
                                    <div className="card-image waves-effect waves-block waves-light">
                                        <img alt="dog" className="activator" src="dogprofilepic.jpg" />
                                    </div>
                                    <div className="card-content">
                                        <span className="card-title activator grey-text text-darken-4">{dog.dog_name}</span>

                                    </div>
                                    <div className="card-reveal">
                                        <span className="card-title grey-text text-darken-4">{dog.dog_name}<i className="material-icons right">close</i></span>
                                        <p><i className="material-icons left">list</i>Type: {dog.type_of_dog}</p>
                                        <p><i className="material-icons left">wc</i>Sex: {dog.sex}</p>
                                        <p><i className="material-icons left">cake</i>Age: {dog.age}</p>
                                        <p><i className="material-icons left">color_lens</i>Color: {dog.color}</p>
                                        <p><i className="material-icons left">slow_motion_video</i>Weight: {dog.dog_weight}</p>
                                        <p><i className="material-icons left">height</i>Height: {dog.dog_height}</p>
                                        <p><i className="material-icons left">attach_money</i>For Sale: {dog.available}</p>
                                        {dog.price ? <p><i className="material-icons left">attach_money</i>Price: ${dog.price}</p> : false}
                                        <div className="card-action">
                                            <Button node="button" className="right red" onClick={() => this.deleteDog(dog.id)} waves="light">
                                                Delete
                                                <Icon left>delete_forever</Icon>
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
                </div>
                );
            } else {
                return <p>No Doggos Found</p>
            }
        }
    }

    render() {
        return (
            <div>
                <h3>My Dogs</h3>
                {this.renderDoggos()}
            </div>
        );
    }
}

export default Home;