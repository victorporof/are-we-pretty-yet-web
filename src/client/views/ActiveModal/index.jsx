import React, { PureComponent } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

import Actions from '../../actions';

import Diffstat from '../Diffstat';

const mapStateToProps = state => ({
  visible: state.active.modal,
});

const mapDispatchToProps = {
  setActiveModalVisibility: Actions.model.setActiveModalVisibility,
};

class ActiveModal extends PureComponent {
  static propTypes = {
    setActiveModalVisibility: PropTypes.func.isRequired,
    visible: PropTypes.bool.isRequired,
  }

  handleBackgroundClick = () => {
    const { setActiveModalVisibility } = this.props;
    setActiveModalVisibility({ visible: false });
  }

  render() {
    const { visible } = this.props;
    return visible ? [
      <button
        key="background"
        type="button"
        className="active-modal-background"
        onClick={this.handleBackgroundClick}
      />,
      <div
        key="container"
        className="active-modal-container"
      >
        <Diffstat />
      </div>,
    ] : [];
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ActiveModal);
