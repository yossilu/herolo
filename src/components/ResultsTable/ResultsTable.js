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
        this.onEditClicked = this.onEditClicked.bind(this);
        this.state = {
            detailedMovies: [],
            moviesUpdated: false,
            modalMovieData: {},
            showPopup: false
          };
         
    }
    componentDidUpdate = () => {
        console.log("I FUCKED YOU!!@#!@#");
        if (this.props.sharedMovies.length !== 0 && (!this.state.moviesUpdated || this.state.detailedMovies !== this.props.sharedMovies)){
            console.log("HI!",this.props.sharedMovies);
            this.setState({
                detailedMovies: this.props.sharedMovies,
                moviesUpdated: true
            });
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
        console.log("Results Table RENDER:",this.state.detailedMovies);
       let moviesTable = this.state.detailedMovies.map((res, i) => {
             return <MovieRecord 
             onToggleMovieModal={this.onToggleMovieModal}
             movieData={res} 
             key={i}></MovieRecord>
        }); 
        return (   
        <div className="ResultsTable">
                    <Modal show={this.state.showPopup} onHide={this.onToggleMovieModal}>
                        <Modal.Header closeButton>
                            <Modal.Title id="contained-modal-title-vcenter">Movie Details</Modal.Title>
                        </Modal.Header>
                        <MovieModal
                        onModalSaveResultsTable={this.onModalSaveResultsTable}
                        onEditSave={this.props.onEditSave} 
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
