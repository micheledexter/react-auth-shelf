import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import Nav from '../../components/Nav/Nav';
import { fetchUser } from '../../redux/actions/userActions';

const mapStateToProps = state => ({
    user: state.user,
});

const mapDispatchToProps = {
    fetchUser,
};

class ShelfTotal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            table: [],
        };
    }
    componentDidMount() {
        this.props.fetchUser();
        this.fetchTable();
    }

    componentDidUpdate() {
        if (!this.props.user.isLoading && this.props.user.userName === null) {
            this.props.history.push('home');
        }
    }
    fetchTable = () => {
        axios.get('/api/shelf/count').then((response) => {
            this.setState({
                table: response.data,
            });
            console.log(this.state.table);
        }).catch((error) => {
            this.props.history.push('/home');
        });
    }
    render() {
        let content = <p>Loading</p>;

        if (this.state.table[0]) {
            content = (
                <table>
                    <thead>
                        <tr>
                            <th>
                                Name
                            </th>
                            <th>
                                Number of stuff(s)
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.table.map(taco => (
                            <tr key={taco.username}>
                                <td>
                                    {taco.username}
                                </td>
                                <td>
                                    {taco.count}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            );
        }
        return (
            <div>
                <Nav />
                { content }
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShelfTotal);