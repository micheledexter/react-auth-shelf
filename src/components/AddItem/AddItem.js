import React, { Component } from 'react';
import { connect } from 'react-redux';

import Nav from '../../components/Nav/Nav';

import { fetchUser } from '../../redux/actions/userActions';
import { triggerLogout } from '../../redux/actions/loginActions';

const mapStateToProps = state => ({
    user: state.user,
});

class AddItem extends Component {
    render() {
        return (
            <div>
                <Nav />
                HELLOOOOOOOO
            </div>
        );
    }
}

export default connect(mapStateToProps)(AddItem);