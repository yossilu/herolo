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
                showPopup: false,
                movieModal: this.props.modalMovieData,
                movieDataBool: false
          };   
    }


    onToggleMovieModal = () => {
        let moviedata = this.state.movieData;
        this.setState({
                movieData: moviedata
        })
        this.props.onToggleMovieModal(this.state.movieData);
    }

    
    

    render() {
        return (
                <div>
                        <Row className="movieRecord text-body bg single-record block-example border border-dark" >
                                <Col className="movieRecordDetails" style={{padding: "20px"}}>
                                        <Image src={this.props.movieData.Poster} className="movie-record-image"/>
                                </Col>
                                <Col className="movieRecordDetails">
                                        {this.props.movieData.Title}
                                </Col>     
                                <Col className="movieRecordDetails">
                                        ({this.props.movieData.Year})
                                </Col>  
                                <Col className="movieRecordDetailsBtn">
                                <Button className="edit-button"  variant="dark" onClick={this.onToggleMovieModal}> Details</Button>
                                </Col>
                               
                        </Row>   
                </div>
        );
      }
    
}

export default MovieRecord;