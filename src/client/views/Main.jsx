import React, { PureComponent } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

import './Main.css';
import ToolsList from './ToolsList';
import ActiveModal from './ActiveModal';

import Actions from '../actions';

const mapStateToProps = () => ({
});

const mapDispatchToProps = {
  fetchData: Actions.fetchData,
};

class App extends PureComponent {
  static propTypes = {
    fetchData: PropTypes.func.isRequired,
  }

  componentDidMount = () => {
    const { fetchData } = this.props;
    fetchData();
  }

  render() {
    return [
      <ToolsList key="tools" />,
      <ActiveModal key="modal" />,
    ];
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
