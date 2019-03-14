import React, { PureComponent } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import * as RC from 'recharts';

import Actions from '../../actions';

const DIMENSIONS = {
  width: '100%',
  heights: [70, 100],
};

const MARGIN = {
  top: 20,
  right: 10,
  left: 10,
  bottom: 0,
};

const DEFS = () => (
  <defs key="graph-defs">
    <linearGradient id="colorA" x1="0" y1="0" x2="0" y2="1">
      <stop offset="5%" stopColor="#88c" stopOpacity={0.5} />
      <stop offset="95%" stopColor="#88c" stopOpacity={0} />
    </linearGradient>
    <linearGradient id="colorB" x1="0" y1="0" x2="0" y2="1">
      <stop offset="5%" stopColor="#8c8" stopOpacity={0.5} />
      <stop offset="95%" stopColor="#8c8" stopOpacity={0} />
    </linearGradient>
    <linearGradient id="colorC" x1="0" y1="0" x2="0" y2="1">
      <stop offset="5%" stopColor="#c88" stopOpacity={0.5} />
      <stop offset="95%" stopColor="#c88" stopOpacity={0} />
    </linearGradient>
  </defs>
);

const COMMON = () => [
  DEFS(),
  <RC.XAxis key="graph-x-axis" dataKey="name" />,
  <RC.CartesianGrid key="graph-cartesian-grid" strokeDasharray="1 1" />,
  <RC.Tooltip key="graph-tooltip" />,
];

const mapStateToProps = (state, ownProps) => ({
  summaries: state.summaries[ownProps.tool],
});

const mapDispatchToProps = {
  fetchDiffstat: Actions.fetchDiffstat,
};

class ToolGraph extends PureComponent {
  static propTypes = {
    fetchDiffstat: PropTypes.func.isRequired,
    tool: PropTypes.string.isRequired,
    summaries: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  }

  constructor(...args) {
    super(...args);

    this.insertionsDeletionsGraph = React.createRef();
    this.filesGraph = React.createRef();
  }

  handleSettingPick = () => {
    const { fetchDiffstat, tool } = this.props;
    const setting = this.filesGraph.current.state.activeLabel;
    fetchDiffstat(tool, setting);
  }

  render() {
    const { tool, summaries } = this.props;

    const data = Object.entries(summaries).map(([rule, summary]) => ({
      name: rule.replace('', ':') || '(defaults)',
      files: summary.files,
      insertions: summary.insertions,
      deletions: summary.deletions,
    }));

    return [
      <RC.ResponsiveContainer
        key="files-graph"
        className="tool-graph"
        width={DIMENSIONS.width}
        height={DIMENSIONS.heights[1]}
      >
        <RC.AreaChart
          ref={this.insertionsDeletionsGraph}
          syncId={tool}
          data={data}
          margin={MARGIN}
          onMouseDown={this.handleSettingPick}
        >
          {COMMON()}
          <RC.Area
            type="step"
            dataKey="insertions"
            stackId="1"
            stroke="#080"
            strokeOpacity={0.5}
            fill="url(#colorB)"
            fillOpacity={0.25}
          />
          <RC.Area
            type="step"
            dataKey="deletions"
            stackId="1"
            stroke="#800"
            strokeOpacity={0.5}
            fill="url(#colorC)"
            fillOpacity={0.25}
          />
        </RC.AreaChart>
      </RC.ResponsiveContainer>,
      <RC.ResponsiveContainer
        key="insertions-deletions-graph"
        className="tool-graph"
        width={DIMENSIONS.width}
        height={DIMENSIONS.heights[0]}
      >
        <RC.AreaChart
          ref={this.filesGraph}
          syncId={tool}
          data={data}
          margin={{ ...MARGIN, top: 0 }}
          onMouseDown={this.handleSettingPick}
        >
          {COMMON()}
          <RC.Area
            type="step"
            dataKey="files"
            stroke="#008"
            strokeOpacity={0.5}
            fill="url(#colorA)"
            fillOpacity={0.25}
          />
        </RC.AreaChart>
      </RC.ResponsiveContainer>,
    ];
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ToolGraph);
