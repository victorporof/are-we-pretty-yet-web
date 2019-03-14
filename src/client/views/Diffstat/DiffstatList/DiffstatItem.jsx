import React, { PureComponent } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  tool: state.active.tool,
  setting: state.active.setting,
});

const mapDispatchToProps = {
};

class DiffstatItem extends PureComponent {
  static propTypes = {
    tool: PropTypes.string.isRequired,
    setting: PropTypes.string,
    file: PropTypes.string.isRequired,
    add: PropTypes.string,
    remove: PropTypes.string,
    bin: PropTypes.string,
  }

  static defaultProps = {
    setting: null,
    add: '',
    remove: '',
    bin: '',
  }

  render() {
    const { tool, setting, file } = this.props;
    const { add, remove, bin } = this.props;
    return [
      <a
        key="file"
        href={`api/diff/${tool}/${setting}?file=${file}`}
        target="_blank"
        rel="noopener noreferrer"
        className="diffstat-file"
        onMouseDown={this.handleFilePick}
      >
        {file}
      </a>,
      <div
        key="add"
        className="diffstat-add"
      >
        {'+'.repeat(Math.ceil(Math.sqrt(add.length)))}
      </div>,
      <div
        key="remove"
        className="diffstat-remove"
      >
        {'-'.repeat(Math.ceil(Math.sqrt(remove.length)))}
      </div>,
      <div
        key="bin"
        className="diffstat-bin"
      >
        {bin}
      </div>,
    ];
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DiffstatItem);
