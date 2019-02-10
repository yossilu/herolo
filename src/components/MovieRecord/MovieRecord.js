import React, { Component } from 'react';
import './MovieRecord.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MovieModal from '../MovieModal/MovieModal';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';

class MovieRecord extends Component {

    constructor(props) {
        super(props);
        this.movieModalOpen = this.onMovieModalOpen.bind(this);
        this.onMovieModalClose = this.onMovieModalClose.bind(this);
        this.onEditClicked = this.onEditClicked.bind(this);
        this.state = {
                movieData: this.props.movieData,
                showPopup: false
          };   
    }

    onMovieModalOpen = () => {
        this.setState({
                showPopup: !this.state.showPopup
        })
    }

    onMovieModalClose = () => {
            console.log(this.state.showPopup);
        this.setState({
                showPopup: !this.state.showPopup
        })
    }

    onEditClicked = () => {
        this.setState({
        })
    }


    render() {
            console.log(this.state);
        return (
                <div>
                        { this.state.showPopup ?
                                
                        <MovieModal 
                        movieData={ this.state.movieData } >
                                        <Button className="edit-button"  variant="dark" onClick={this.onEditClicked}> Edit</Button>
                                        <Button className="close-modal" id="modal-close-btn" variant="dark" onClick={this.onMovieModalClose}> X</Button>
                        </MovieModal>
                
                        : null }
                        <Row className="movieRecord text-body bg single-record" >
                                <Col className="movieRecordDetails">
                                        <Image src={this.state.movieData.Poster} className="movie-record-image"/>
                                </Col>
                                <Col className="movieRecordDetails">
                                        {this.state.movieData.Title}
                                </Col>     
                                <Col className="movieRecordDetails">
                                        ({this.state.movieData.Year})
                                </Col>  
                                <Col className="movieRecordDetails">
                                <Button className="edit-button"  variant="dark" onClick={this.onMovieModalOpen}> Details</Button>
                                </Col>
                               
                        </Row>   
                </div>
        );
      }
    
}

export default MovieRecord;