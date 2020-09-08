import React, {Component} from 'react';
import './LeftPanel.scss';
import CurrentUser from "./CurrentUser/CurrentUser";
import UsersList from "./UsersList/UsersList";

class LeftPanel extends Component {
  shouldComponentUpdate () {
    return true;
  }

  render () {
    const {onSelectUser} = this.props;

    return (
      <div className="LeftPanel">
        <CurrentUser />
        <UsersList onSelectUser={onSelectUser} />
      </div>
    );
  }
}

export default LeftPanel;
