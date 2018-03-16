import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Line } from 'rc-progress';

class PointBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      percent: 0,
    };
    this.increase = this.increase.bind(this);
  }

  increase() {
    const percent = this.state.percent + 1;
    if (percent >= this.props.percent) {
      clearTimeout(this.tm);
      return;
    }
    this.setState({ percent });
    this.tm = setTimeout(this.increase, 10);
  }

  render() {
    return (
      <div>
        {
          <Line strokeWidth="4" percent={this.state.percent} />
        }
      </div>
    );
  }
};

PointBar.propTypes = {
  percent: PropTypes.number,
};

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(PointBar);
