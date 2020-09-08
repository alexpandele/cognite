import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import './Conversation.scss';
import {addMessage} from "../../../store/reducers/messages";
import moment from "moment";

class Conversation extends Component {
  static get propTypes () {
    return {
      loggedInUser: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        wsKey: PropTypes.string,
      }).isRequired,
      user: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        wsKey: PropTypes.string,
      }).isRequired,
      addMessage: PropTypes.func.isRequired,
      messages: PropTypes.arrayOf(PropTypes.shape({
        from: PropTypes.shape({
          name: PropTypes.string,
        }),
        conversationKey: PropTypes.string,
        time: PropTypes.number,
        text: PropTypes.string
      }))
    };
  }

  static get defaultProps () {
    return {messages: []}
  }

  shouldComponentUpdate () {
    return true;
  }

  constructor (props) {
    super(props);

    this.state = {
      inputText: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange (ev) {
    this.setState({inputText: ev.target.value});
  }

  handleSubmit (ev) {
    ev.preventDefault();
    const {inputText} = this.state;
    const {user, loggedInUser, addMessage} = this.props;
    if (inputText) {
      var ws = new WebSocket('ws://ws.inoveb.co.uk:8080');
      ws.onopen = function () {
        ws.send(JSON.stringify({
          request: 'PUBLISH',
          message: {
            from: loggedInUser,
            conversationKey: loggedInUser.wsKey,
            time: Date.now(),
            text: inputText
          },
          channel: user.wsKey
        }));
        ws.close();
      };
      addMessage({
        from: loggedInUser,
        conversationKey: user.wsKey,
        time: Date.now(),
        text: inputText
      })
      this.setState({inputText: ''});
    }
  }

  render () {
    const {user, messages} = this.props;
    const {inputText} = this.state;
    const conversationMessages = messages.filter(message => message.conversationKey === user.wsKey);

    return (
      <div className="Conversation">
        <div className="Conversation__title">
          {user.name}
        </div>
        <div className="Conversation__chat">
          {conversationMessages.map(message => (
            <div key={message.time}>
              <div>
                <span className="Chat__user">
                  {message.from.name}
                </span>
                <span className="Chat__time">
                  {moment(message.time).format('HH:mm')}
                </span>
              </div>
              <div className="Chat__message">
                {message.text}
              </div>
            </div>
          ))}
        </div>
        <div className="Conversation__footer">
          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              onChange={this.handleInputChange}
              value={inputText}
            />
            <input type="submit" value="Send"/>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loggedInUser: state.auth.user,
  messages: state.messages.list,
});

const mapDispatchToProps = dispatch => {
  return {
    addMessage: message => {
      dispatch(addMessage(message));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Conversation);
