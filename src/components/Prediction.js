import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import AnimatedNumber from 'react-animated-number';

import Team from './Team';

class Prediction extends Component {
  render() {
    const { redTeam, blueTeam, prediction, team, firstTeam } = this.props;

    return (
      <div>
        {prediction >= 0 && team >= 0 && <div className="pvalue">
          <h5>{`${firstTeam === team ? 'Red Team Wins' : 'Blue Team Wins'}`}</h5>
          <AnimatedNumber
            component='h2'
            value={prediction}
            style={{
              transition: '0.8s ease-out',
              fontSize: 48,
              transitionProperty:
                  'background-color, color, opacity'
            }}
            frameStyle={perc => (
                perc === 100 ? {} : {backgroundColor: '#ffeb3b'}
            )}
            duration={2000}
            formatValue={n => `${parseFloat(n).toFixed(4)}`}
          />
        </div>}
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
  const { data: { summoners, prediction, team } } = state;
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
    firstTeam,
    prediction,
    team
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Prediction);
