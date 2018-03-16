import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Prediction from './Prediction';

class Game extends Component {
  render() {
    const { error } = this.props;
    return (
      <div>
      {error ? <h5>{error}</h5> : <Prediction />}
      </div>
    );
  }
};

Game.propTypes = {
  error: PropTypes.string,
  summoners: PropTypes.arrayOf(PropTypes.object),
};

const mapStateToProps = (state) => {
  const { data: { error, summoners } } = state;

  return {
    error,
    summoners,
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
