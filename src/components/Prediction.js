import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Team from './Team';

class Prediction extends Component {
  render() {
    const { redTeam, blueTeam } = this.props;

    return (
      <div>
        <Team team={redTeam} color="red" />
          <hr className="hrstyle" />
        <Team team={blueTeam} color="blue" />
      </div>
    );
  }
};

Prediction.propTypes = {
  summoners: PropTypes.arrayOf(PropTypes.object),
};

const mapStateToProps = (state) => {
  const { data: { summoners } } = state;
  const redTeam = [];
  const blueTeam = [];
  let firstTeam = -1;

  summoners.map((player) => {
    if (firstTeam === -1) {
      firstTeam = player.teamId;
    }
    if (player.teamId === firstTeam) {
      redTeam.push(player);
    } else {
      blueTeam.push(player);
    }

    return player;
  });

  return {
    redTeam,
    blueTeam,
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Prediction);
