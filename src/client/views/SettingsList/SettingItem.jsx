import React, { PureComponent } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

import Actions from '../../actions';

import SettingTuple from './SettingTuple';
import SettingSummary from './SettingSummary';

const mapStateToProps = () => ({
});

const mapDispatchToProps = {
  fetchDiffstat: Actions.fetchDiffstat,
};

class SettingButton extends PureComponent {
  static propTypes = {
    fetchDiffstat: PropTypes.func.isRequired,
    tool: PropTypes.string.isRequired,
    setting: PropTypes.string.isRequired,
  }

  handleSettingPick = () => {
    const { fetchDiffstat, tool, setting } = this.props;
    fetchDiffstat(tool, setting);
  }

  render() {
    const { tool, setting } = this.props;
    return (
      <button
        className="settings-button"
        type="button"
        onMouseDown={this.handleSettingPick}
      >
        <SettingTuple setting={setting} />
        <SettingSummary
          tool={tool}
          setting={setting}
        />
      </button>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SettingButton);
