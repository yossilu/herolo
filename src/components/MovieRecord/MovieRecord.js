import React, { Component } from 'react';
import './MovieRecord.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';

class MovieRecord extends Component {

    constructor(props) {
        super(props);
        this.onToggleMovieModal = this.onToggleMovieModal.bind(this);
        this.state = {
                movieData: this.props.movieData,
                showPopup: false
          };   
    }

    onToggleMovieModal = () => {
            console.log(this.props);
            this.props.onToggleMovieModal(this.state.movieData);
    }

    render() {
        return (
                <div>
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
                                <Button className="edit-button"  variant="dark" onClick={this.onToggleMovieModal}> Details</Button>
                                </Col>
                               
                        </Row>   
                </div>
        );
      }
    
}

export default MovieRecord;