import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Line } from 'rc-progress';

class PointBar extends Component {
  constructor(props) {
    super(props);
    this.increase = this.increase.bind(this);
    this.state = {
      percent: 0,
    };
  }

  componentDidMount() {
    this.increase();
  }

  increase() {
    const percent = this.state.percent + 1;
    if (percent >= Math.min(100, this.props.percent)) {
      clearTimeout(this.tm);
      return;
    }
    this.setState({ percent });
    this.tm = setTimeout(this.increase, 10);
  }

  render() {
    return (
      <div>
        <Line strokeWidth="4" percent={this.state.percent} strokeColor={this.props.color} />
      </div>
    );
  }
};

PointBar.propTypes = {
  color: PropTypes.string,
  percent: PropTypes.number,
};

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(PointBar);
