import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './User.scss';

class User extends Component {
  static get propTypes () {
    return {
      user: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        wsKey: PropTypes.string
      }).isRequired,
      onClick: PropTypes.func.isRequired
    };
  }

  constructor (props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }


  shouldComponentUpdate () {
    return true;
  }

  handleClick () {
    const {onClick, user} = this.props;
    onClick(user);
  }

  render () {
    const {user} = this.props;

    return (
      <div
        className="User"
        onClick={this.handleClick}
      >
        {user.name}
      </div>
    );
  }
}

export default User;
