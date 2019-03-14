import React, { PureComponent } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

const mapStateToProps = (state, ownProps) => ({
  summary: state.summaries[ownProps.tool][ownProps.setting],
});

const mapDispatchToProps = {
};

class SettingSummary extends PureComponent {
  static propTypes = {
    summary: PropTypes.shape({
      files: PropTypes.number,
      insertions: PropTypes.number,
      deletions: PropTypes.number,
    }),
  }

  static defaultProps = {
    summary: null,
  }

  render() {
    const { summary } = this.props;
    return summary
      ? (
        <div
          className="setting-summary"
        >
          <div className="summary-changed">
            {summary.files}
          </div>
          <div className="summary-insertions">
            {summary.insertions}
          </div>
          <div className="summary-deletions">
            {summary.deletions}
          </div>
        </div>
      )
      : (
        <div
          className="setting-summary"
        >
          <div className="summary-loading">
            Loading…
          </div>
        </div>
      );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SettingSummary);
