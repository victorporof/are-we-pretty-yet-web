import React, { PureComponent } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

const mapStateToProps = () => ({
});

const mapDispatchToProps = {
};

class ToolTitle extends PureComponent {
  static propTypes = {
    title: PropTypes.string.isRequired,
  }

  render() {
    const { title } = this.props;
    return (
      <div className="tool-title">
        {title}
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ToolTitle);
