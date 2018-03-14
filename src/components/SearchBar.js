import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Input } from 'semantic-ui-react';

class SearchBar extends Component {
  render() {
    return (
      <Input
        icon='user'
        placeholder='Search...'
        onChange={(event, data) => {
          this.props.update(event.target.value);
        }}
      />
    );
  }
};

SearchBar.propTypes = {
  update: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
