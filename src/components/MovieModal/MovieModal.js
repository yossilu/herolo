import React, { Component } from 'react';
import './MovieModal.css';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


class MovieModal extends Component {

    constructor(props) {
        super(props);
        this.onEditToggle = this.onEditToggle.bind(this);
        this.state = {
            movieData: this.props.movieData,
            editable: false
          };   
       
    }
    componentDidUpdate=()=>{
      if (this.state.movieData !== this.props.movieData){
        this.setState({
          movieData: this.props.movieData,
          editable: false
        })
      }
    }
    onEditToggle=()=>{
      this.setState({
        editable: !this.state.editable
      });
    }


  render() {
    console.log(this.state);
    return (
      <div className="records-modal" >
        <Form className="modal-body">
            <Form.Group controlId="formBasicEmail">
                <h4 className="header">{this.state.movieData.Title}</h4>
              <div className="card-body" >
                Year:
                <Form.Control className="text-muted" value={this.state.movieData.Year} readOnly={ !this.state.editable}/>
                Genre: 
                <Form.Control className="text-muted" value={this.state.movieData.Genre} readOnly={ !this.state.editable}/>
                Runtime:
                <Form.Control className="text-muted" value={this.state.movieData.Runtime} readOnly={ !this.state.editable}/>
                Director:
                <Form.Control className="text-muted" value={this.state.movieData.Director} readOnly={ !this.state.editable}/>
                Plot:
                <Form.Control className="text-muted" value={this.state.movieData.Plot} readOnly={ !this.state.editable}/>
                IMDB Rating:
                <Form.Control className="text-muted" value={this.state.movieData.imdbRating} readOnly={ !this.state.editable}/>
                Actors:
                <Form.Control className="text-muted" value={this.state.movieData.Actors} readOnly={ !this.state.editable}/>
                <Image src={this.state.movieData.Poster} className="movie-modal-image"/>
              </div>

              {
                this.state.editable ? 
                <div>
                  <Button className="edit-button"  variant="dark" onClick={this.onEditClicked}> Save</Button>
                  <Button className="edit-button"  variant="dark" onClick={this.onEditToggle}> Cancel</Button>
                </div>
                : <Button className="edit-button"  variant="dark" onClick={this.onEditToggle}> Edit</Button>
                  
              }
              
              
              
              <Button className="close-modal" id="modal-close-btn" variant="dark" onClick={this.onMovieModalClose}> X</Button>
              </Form.Group>
        </Form>
      </div>
    );
  }
}

export default MovieModal;
