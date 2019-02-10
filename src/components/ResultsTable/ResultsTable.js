import React, { Component } from 'react';
import './ResultsTable.css';
import Container from 'react-bootstrap/Container';
import MovieRecord from '../MovieRecord/MovieRecord';

class ResultsTable extends Component {

    constructor(props) {
        super(props);
        this.state = {
            detailedMovies: [],
            moviesUpdated: false,
            display: "none"
          };
         
    }
    componentDidUpdate = () => {
        if (this.props.sharedMovies.length !== 0 && !this.state.moviesUpdated){
            this.setState({
                detailedMovies: this.props.sharedMovies,
                moviesUpdated: true
            });
            console.log("this.state detailed movies", this.state.detailedMovies)
        }
    }


    render() {
       let moviesTable = this.state.detailedMovies.map((res, i) => {
             return <MovieRecord movieData={res} index={i} key={i}></MovieRecord>
        }); 
        return (   
        <div className="ResultsTable">
                    <Container>
                            {moviesTable}
                    </Container>
        </div>
        )}
}

export default ResultsTable;
