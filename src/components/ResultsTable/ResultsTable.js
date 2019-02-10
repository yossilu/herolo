import React, { Component } from 'react';
import './ResultsTable.css';
import Container from 'react-bootstrap/Container';
import MovieRecord from '../MovieRecord/MovieRecord';
import MovieModal from '../MovieModal/MovieModal';

class ResultsTable extends Component {

    constructor(props) {
        super(props);
        this.onToggleMovieModal = this.onToggleMovieModal.bind(this);
        this.onEditClicked = this.onEditClicked.bind(this);
        this.state = {
            detailedMovies: [],
            moviesUpdated: false,
            modalMovieData: {},
            showPopup: false
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

    onToggleMovieModal = (movieData) => {
        if (movieData){
            this.setState({
                modalMovieData: movieData,
                showPopup: true
          });
        } else {
            this.setState({
                showPopup: false
          });
        }

    }
    onEditClicked = () => {
        this.setState({
        })
    }

    render() {
       let moviesTable = this.state.detailedMovies.map((res, i) => {
             return <MovieRecord 
             onToggleMovieModal={this.onToggleMovieModal}
             movieData={res} 
             key={i}></MovieRecord>
        }); 
        return (   
        <div className="ResultsTable">
                    { this.state.showPopup ?
                    
                    <MovieModal 
                    movieData={ this.state.modalMovieData } >
                    </MovieModal>
            
                    : null }
                    <Container>
                            {moviesTable}
                    </Container>
        </div>
        )}
}

export default ResultsTable;
