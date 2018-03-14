import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';

import PredictButton from './PredictButton';
import SearchBar from './SearchBar';
import Title from './Title';

class App extends Component {
  constructor(props) {
    super(props);
    this.updateSummoner = this.updateSummoner.bind(this);
    this.state = {
      summoner: '',
    }
  }

  updateSummoner(summoner) {
    this.setState({
      summoner,
    });
  }

  render() {
    return (
      <div className='appContainer'>
        <Title />
        <SearchBar update={this.updateSummoner} />
        <PredictButton summoner={this.state.summoner} />
      </div>
    );
  }
};

App.propTypes = {};

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(App);
