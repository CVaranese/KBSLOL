import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Button } from 'semantic-ui-react';
import fetchSummoner from '../actions/fetchSummoner';

class PredictButton extends Component {
  constructor(props) {
    super(props);
    this.fetchRiotData = this.fetchRiotData.bind(this);
  }

  fetchRiotData() {
    this.props.fetchSummoner(this.props.summoner);
  }

  render() {
    return (
      <Button
        className='predictButton'
        onClick={() => {
          this.fetchRiotData()
        }}
      >
        Predict
      </Button>
    );
  }
}

PredictButton.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  fetchSummoner: PropTypes.func,
  riotapikey: PropTypes.string,
  summoner: PropTypes.string,
};

const mapStateToProps = (state) => {
  const { data: { riotapikey } } = state;  

  return {
    riotapikey,
  }
};

const mapDispatchToProps = {
  fetchSummoner,
};

export default connect(mapStateToProps, mapDispatchToProps)(PredictButton);
