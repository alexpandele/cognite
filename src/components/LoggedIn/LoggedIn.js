import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import LeftPanel from "./LeftPanel/LeftPanel";
import './LoggedIn.scss';
import Conversation from "./Conversation/Conversation";
import events from "../../events";
import {addMessage} from "../../store/reducers/messages";

class LoggedIn extends Component {
  static get propTypes () {
    return {
      loggedInUser: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        wsKey: PropTypes.string,
      }),
      addMessage: PropTypes.func.isRequired
    };
  }

  static get defaultProps () {
    return {
      loggedInUser: null,
    };
  }

  constructor (props) {
    super(props);

    this.state = {
      selectedUser: null
    };

    this.handleSelectUser = this.handleSelectUser.bind(this);
  }

  componentDidMount () {
    const {loggedInUser, addMessage} = this.props;
    const ws = new WebSocket('ws://ws.inoveb.co.uk:8080');
    ws.onopen = function () {
      ws.send(JSON.stringify({
        request: 'SUBSCRIBE',
        message: '',
        channel: loggedInUser.wsKey,
      }));
      ws.onmessage = function (event) {
        addMessage(JSON.parse(event.data).message);
      };
    };

    let logoutEventUnsub;
    logoutEventUnsub = events.user.onLogout.subscribe(() => {
      if (logoutEventUnsub) logoutEventUnsub();
      ws.close();
    });
  }

  shouldComponentUpdate () {
    return true;
  }

  handleSelectUser (user) {
    this.setState({selectedUser: user});
  }

  render () {
    const {selectedUser} = this.state;

    return (
      <div className="LoggedIn">
        <LeftPanel
          onSelectUser={this.handleSelectUser}
        />
        {selectedUser &&
        <Conversation
          user={selectedUser}/>
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loggedInUser: state.auth.user,
});

const mapDispatchToProps = dispatch => {
  return {
    addMessage: message => {
      dispatch(addMessage(message));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoggedIn);
