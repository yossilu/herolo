import React, { Component } from 'react';
import './SearchEngine.css';

class SearchEngine extends Component {

    placeholder = "'Transformers: Revenge of the Fallen' for example";
    

    constructor(props) {
        super(props);
        
        this.getMovieName = this.getMovieName.bind(this);
        this.searchClicked = this.searchClicked.bind(this);
        
        this.state = {
            keywords: ""
          };
    }
    componentDidUpdate = () => {
    }
    getMovieName = (event) => {
        this.setState({
            keywords: event.target.value
        });
    }

    searchClicked = () => {
        let currentKeywords = this.state.keywords;
        this.props.searchMovies(currentKeywords.trim());
    }

    render() {
        return (
        <div>
                <div className="SearchEngine">
                        <div className="form-group">
                            <label htmlFor="sesarchBox">Search a movie!</label>
                            <input type="text" className="form-control" id="searchBox" placeholder={this.placeholder} onChange={this.getMovieName}  value={this.state.keywords} />
                        </div>
                            <button type="button" className="btn btn-primary btn-sm" onClick={this.searchClicked} >Search</button>
                </div>
        </div>
        );
    }
}

export default SearchEngine;
