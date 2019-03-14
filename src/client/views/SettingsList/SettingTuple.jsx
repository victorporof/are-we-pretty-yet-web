import React, { PureComponent } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

const mapStateToProps = () => ({
});

const mapDispatchToProps = {
};

class SettingTuple extends PureComponent {
  static propTypes = {
    setting: PropTypes.string.isRequired,
  }

  render() {
    const { setting } = this.props;
    return (
      <div className="setting-tuple">
        {setting.replace('', ':') || '(defaults)'}
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SettingTuple);
