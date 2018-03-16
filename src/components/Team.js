import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import PointBar from './PointBar';

class Team extends Component {
  render() {
    return (
      <div className="team">
        {
          this.props.team.map((member, i) => {
            return (<div key={i} className="member">
              <div>{member.summonerName}</div>
              <div>{`${member.tier} ${member.rank}`}</div>
              <PointBar percent={member.leaguePoints} color={this.props.color} />
              <div>Weight: {Math.max(1, member.leaguePoints)}</div>
            </div>);
          })
        }
      </div>
    );
  }
};

Team.propTypes = {
  color: PropTypes.string,
  team: PropTypes.arrayOf(PropTypes.object),
};

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Team);
