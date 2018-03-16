import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Input } from 'semantic-ui-react';

class SearchBar extends Component {
  render() {
    return (
      <Input
        loading={this.props.searching}
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
  searching: PropTypes.bool,
};

const mapStateToProps = (state) => {
  const { data: { searching } } = state;
  return {
    searching, 
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
