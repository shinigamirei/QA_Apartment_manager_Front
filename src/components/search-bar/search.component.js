import  React, { Component } from 'react';
import PropTypes from "prop-types";

class SearchBar extends React.Component {
    state = {
        searchString: ""
    };

    handleChange = event => {
        let searchString = event.target.value;
        this.setState({ searchString });
        this.props.search(searchString);
    };

    handleSubmit = event => {
        event.preventDefault();
    };

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
            <input
                type="text"
                value={this.state.searchString}
                onChange={this.handleChange}
            />
            </form>
        );
    }
}

SearchBar.propTypes = {
    search: PropTypes.func
};

export default SearchBar;