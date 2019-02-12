import React, { Component } from 'react';
import './ResultsTable.css';
import Container from 'react-bootstrap/Container';
import MovieRecord from '../MovieRecord/MovieRecord';
import MovieModal from '../MovieModal/MovieModal';
import Modal from 'react-bootstrap/Modal';

class ResultsTable extends Component {

    constructor(props) {
        super(props);
        this.onToggleMovieModal = this.onToggleMovieModal.bind(this);
        this.state = {
            detailedMovies: this.props.sharedMovies,
            moviesUpdated: false,
            modalMovieData: {},
            showPopup: false
          };
    }


    
    componentDidUpdate = () => {
    
        if (!this.state.moviesUpdated && this.props.sharedMovies.length !== 0 && this.state.detailedMovies.length === 0){
           
            this.setState({
                detailedMovies: this.props.sharedMovies,
                moviesUpdated: !this.state.moviesUpdated
            });
        } else {
            if(this.props.sharedMovies.length !== 0 && this.state.detailedMovies.length !== 0){
                if(this.state.detailedMovies[0].imdbID !== this.props.sharedMovies[0].imdbID){
                    this.setState({
                        detailedMovies: this.props.sharedMovies,
                        moviesUpdated: !this.state.moviesUpdated
                    });
                }
            }
            
        }
    }

    onToggleMovieModal = (movieData) => {
        if (movieData){
            this.setState({
                modalMovieData: movieData,
                showPopup: !this.state.showPopup
          });
        } else {
            this.setState({
                showPopup: !this.state.showPopup
            })
        } 
        
    }

    render() {
       let moviesTable = this.state.detailedMovies.map((res, i) => {
             return <MovieRecord 
             onToggleMovieModal={this.onToggleMovieModal}
             movieData={res}
             modalMovieData= {this.modalMovieData} 
             key={i}></MovieRecord>
             
        }); 
        return (   
        <div className="ResultsTable">
                    <Modal show={this.state.showPopup} onHide={this.onToggleMovieModal}>
                        <Modal.Header closeButton>
                            <Modal.Title id="contained-modal-title-vcenter">Movie Details</Modal.Title>
                        </Modal.Header>
                        <MovieModal
                            movieData={ this.state.modalMovieData}
                            onMovieSave={this.props.onMovieSave}
                            toggleModal={this.onToggleMovieModal}>
                        </MovieModal>
                    </Modal>

                    <Container>
                            {moviesTable}
                    </Container>
        </div>
        )}
}

export default ResultsTable;
