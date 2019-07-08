import React from "react";
import PropTypes from "prop-types";
import SearchBar from "./search.component";
import Display from "./display";


class SearchContainer extends React.Component {
    state = {
        searchResults: this.props.data
    };

    search = event => {
        if(event.length > 0){
            let searchResults = [];
            this.props.data.map(result => {
                let searchValues = Object.values(result)
                    if(searchValues.join('').toLowerCase().match(event.replace(/ /g,'').toLowerCase())){
                        searchResults.push(result)            
                     }                
            })
            this.setState({ searchResults })
        }
        else{
            this.setState({searchResults: this.props.data})
        }
    };

    render() {
        return (
        <div>
            <SearchBar search={this.search}/>
            <Display results={this.state.searchResults} />
        </div>
        );
    }
}

SearchContainer.propTypes = {
    results: PropTypes.array
}

export default SearchContainer;