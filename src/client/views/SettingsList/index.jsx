import React, { PureComponent } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

import SettingItem from './SettingItem';

const mapStateToProps = (state, ownProps) => ({
  settings: state.settings[ownProps.tool],
});

const mapDispatchToProps = {
};

class SettingsList extends PureComponent {
  static propTypes = {
    tool: PropTypes.string.isRequired,
    settings: PropTypes.arrayOf(PropTypes.string).isRequired,
  }

  render() {
    const { tool, settings } = this.props;
    return (
      <ul className="settings-list">
        {settings.map(setting => (
          <li
            key={setting}
            className="settings-item"
          >
            <SettingItem
              tool={tool}
              setting={setting}
            />
          </li>
        ))}
      </ul>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SettingsList);
