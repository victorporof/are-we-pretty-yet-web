import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import DiffstatTitlebar from './DiffstatTitlebar';
import DiffstatContent from './DiffstatContent';

const mapStateToProps = () => ({
});

const mapDispatchToProps = {
};

class Diffstat extends PureComponent {
  render() {
    return (
      <div className="diffstat">
        <DiffstatTitlebar />
        <DiffstatContent />
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Diffstat);
