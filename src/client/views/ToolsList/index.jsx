import React, { PureComponent } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

import ToolTitle from './ToolTitle';
import ToolGraph from './ToolGraph';
import SettingsList from '../SettingsList';

const mapStateToProps = state => ({
  tools: state.tools,
  isBlurred: state.active.modal,
});

const mapDispatchToProps = {
};

class ToolsList extends PureComponent {
  static propTypes = {
    tools: PropTypes.arrayOf(PropTypes.string).isRequired,
    isBlurred: PropTypes.bool.isRequired,
  }

  render() {
    const { tools, isBlurred } = this.props;
    return (
      <ul
        className="tools-list"
        blurred={`${isBlurred}`}
      >
        {tools.map(tool => (
          <li
            key={tool}
            className="tools-item"
          >
            <ToolTitle title={tool} />
            <ToolGraph tool={tool} />
            <SettingsList tool={tool} />
          </li>
        ))}
      </ul>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ToolsList);
