import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import SettingSummary from '../SettingsList/SettingSummary';
import DiffstatList from './DiffstatList';

const mapStateToProps = state => ({
  tool: state.active.tool,
  setting: state.active.setting,
});

const mapDispatchToProps = {
};

class DiffstatContent extends PureComponent {
  static propTypes = {
    tool: PropTypes.string.isRequired,
    setting: PropTypes.string.isRequired,
  }

  render() {
    const { tool, setting } = this.props;
    return (
      <div className="diffstat-content">
        <SettingSummary tool={tool} setting={setting} />
        <DiffstatList />
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DiffstatContent);
