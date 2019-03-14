import React, { PureComponent } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

import DiffstatItem from './DiffstatItem';

const mapStateToProps = state => ({
  changes: state.active.diffstat.changes,
});

const mapDispatchToProps = {
};

class DiffstatList extends PureComponent {
  static propTypes = {
    changes: PropTypes.arrayOf(PropTypes.object).isRequired,
  }

  constructor(...args) {
    super(...args);

    this.state = {
      start: 0,
      end: 50,
    };
  }

  handleScroll = (e) => {
    const { scrollHeight, clientHeight, scrollTop } = e.target;
    const { start, end } = this.state;
    if (scrollTop >= scrollHeight - clientHeight) {
      this.setState({ start, end: end + 50 });
    }
  }

  render() {
    const { changes } = this.props;
    const { start, end } = this.state;
    return (
      <ul
        className="diffstat-list"
        onScroll={this.handleScroll}
      >
        {changes.slice(start, end).map(change => (
          <li
            key={change.file}
            className="diffstat-item"
          >
            <DiffstatItem {...change} />
          </li>
        ))}
      </ul>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DiffstatList);
