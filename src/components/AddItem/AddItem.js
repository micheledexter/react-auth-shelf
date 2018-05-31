import React, { Component } from 'react';
import { connect } from 'react-redux';

import Nav from '../../components/Nav/Nav';

import { fetchUser } from '../../redux/actions/userActions';
import { triggerLogout } from '../../redux/actions/loginActions';

const mapStateToProps = state => ({
    user: state.user,
});

class AddItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            description: '',
            image_url: '',

        }
    }


    addItem = (event) => {
        event.preventDefault();
        console.log(this.state);
        const action = { type: 'ADD_FORM', payload: this.state };
        this.props.dispatch(action);
    }

    handleChange = (event) => {
        console.log(event.target.name)
        this.setState ({
                [event.target.name]: event.target.value,
        });
        console.log(this.state);
    }

    render() {
        return (
            <div>
                <Nav />
                <form>
                    <h3>Add a New Item</h3>
                    Description <input onChange={this.handleChange} name='description' placeholder='Describe item' />
                    <br />
                    Image <input onChange={this.handleChange} name='image_url' placeholder='Add link to image' />
                    <br />
                    <button onClick={this.addItem}>Submit</button>
                </form>
            </div>
        );
    }
}

export default connect(mapStateToProps)(AddItem);