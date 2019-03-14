import React, { PureComponent } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

import ToolTitle from '../ToolsList/ToolTitle';

const mapStateToProps = state => ({
  active: state.active,
});

const mapDispatchToProps = {
};

class DiffstatTitlebar extends PureComponent {
  static propTypes = {
    active: PropTypes.shape({
      tool: PropTypes.string.isRequired,
      setting: PropTypes.string.isRequired,
    }).isRequired,
  }

  render() {
    const { active: { tool, setting } } = this.props;
    return (
      <div className="diffstat-titlebar">
        <ToolTitle title={`${tool} ${setting.replace('', ':')}`} />
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DiffstatTitlebar);
