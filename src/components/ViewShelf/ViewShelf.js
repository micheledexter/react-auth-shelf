import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUser } from '../../redux/actions/userActions';
import Nav from '../../components/Nav/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import axios from 'axios';

const mapStateToProps = state => ({
  user: state.user,
});

const config = {
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
};

class ViewShelf extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemList: [],
    };
  }
  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
    this.getItems();
  }

  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push('home');
    }
  }

  getItems() {
    console.log(config);
    axios.get('/api/shelf', config)
      .then(response => {
        this.setState({
          itemList: response.data,
        });
      })
      .catch((error) => { throw error; });
  }

  deleteItem(id) {
    axios.delete(`/api/shelf/${id}`, config).then(() => {
      this.getItems();
    }).catch(error => {
      throw error;
    });
  }

  render() {
    let content = null;

    if (this.props.user.userName) {
      content = (
        <div>
          <p>
            ALL OF THE SHELF STUFF
          </p>
          <ul>
            {this.state.itemList.map(item =>
              <li key={item.id}><div style={{ textAlign:"center", margin:"10px", padding:"10px", border:"1px solid black" }}>
                <img style={{ width: "100px", height: "100px" }} src={item.image_url} /><br />
                  {item.description}<br />
                <button onClick={() => this.deleteItem(item.id)}>
                  Remove Item
                </button>
                </div>
              </li>
            )}
          </ul>
        </div>
      );
    }

    return (
      <div>
        <Nav />
        {content}
      </div>
    );
  }
}

export default connect(mapStateToProps)(ViewShelf);