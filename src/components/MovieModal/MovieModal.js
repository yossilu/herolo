import React, { Component } from 'react';
import './MovieModal.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

class MovieModal extends Component {

    constructor(props) {
        super(props);
        this.onEditToggle = this.onEditToggle.bind(this);
        this.onSave = this.onSave.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
        this.copyOf = this.copyOf.bind(this);
        this.onFormClose = this.onFormClose.bind(this);
        this.checkForText = this.checkForText.bind(this);
        this.checkForDigits = this.checkForDigits.bind(this);
        let editableMovie = this.copyOf(this.props.movieData);
        this.state = {
            movieData: this.props.movieData,
            editable: false,
            editableMovie: editableMovie
          };   
    }
    copyOf = (object) => {
      let copy = {};
      for (let key in object){
        copy[key] = object[key];
      }
      return copy;
    }
    componentDidUpdate=()=>{

    }
    onEditToggle=()=>{
      console.log()
      let editableMovie = this.copyOf(this.state.movieData);
      this.setState({
        editable: !this.state.editable,
        editableMovie: editableMovie
      });
    }

    onFormClose = () => {
      this.props.toggleModal();
    }

    checkForText = (value) => {
      let allowedChars = " ,.?:\"'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      for (let char of value){
        if (allowedChars.indexOf(char) === -1 && allowedChars.indexOf(char) === -1){
          return false;
        }
      }
      return true;
    }
    checkForDigits = (value) => {
      let allowedDigits = '0123456789.';
      for (let digit of String(value)){
        if (allowedDigits.indexOf(digit) === -1){
          return false;
        }
      }
      return true;
    }

    onSave = () => {
      console.log("onSAVE!",this.state.editableMovie);
      let valid = true;
      let editableMovie = this.copyOf(this.state.editableMovie);



      for (let key in editableMovie){
        let textVal = String(editableMovie[key]).trim();
        if (key === 'Year' || key === 'imdbRatings'){
          if (!this.checkForDigits(textVal)){
            console.log("TEXT NOT VALID!!",key);
            valid = false;
          }
        } 
        else {
          if (!this.checkForText(textVal)){
            console.log("DIGITS NOT VALID!!",key);
            valid = false;
          }
        }
      }

      if (valid){
        this.setState({
          editable: false,
          movieData: this.state.editableMovie
        });
        this.props.onMovieSave(editableMovie);
        this.props.toggleModal();
      } else {

        //TODO: error popup
      }


    }

    onTextChange = (event, type) => {
      let editableMovie = this.state.editableMovie;
      editableMovie[type] = event.target.value;
      this.setState({
        editableMovie: editableMovie
      })
    }


  render() {
    console.log("RENDER");
    console.log("RENDER",this.state.movieData);
    return (
      <div>
        <Modal.Body>
          <Form className="modal-body">
           <Form.Group controlId="formFields">
              <Form.Label>Title:</Form.Label>
              <Form.Control type="string" value={this.state.editableMovie.Title} onChange={event => this.onTextChange(event, "Title")} readOnly={!this.state.editable}/>
              <Form.Label>Year:</Form.Label>
              <Form.Control type="string" value={this.state.editableMovie.Year} onChange={event => this.onTextChange(event, "Year")} readOnly={!this.state.editable}/>
              <Form.Label>Genre:</Form.Label> 
              <Form.Control type="string" value={this.state.editableMovie.Genre} onChange={event => this.onTextChange(event, "Genre")}  readOnly={ !this.state.editable}/>
              <Form.Label>Runtime:</Form.Label>
              <Form.Control type="string" value={this.state.editableMovie.Runtime} onChange={event => this.onTextChange(event, "Runtime")} readOnly={ !this.state.editable}/>
              <Form.Label>Director:</Form.Label> 
              <Form.Control type="string" value={this.state.editableMovie.Director} onChange={event => this.onTextChange(event, "Director")} readOnly={ !this.state.editable}/>
              <Form.Label>Plot:</Form.Label> 
              <Form.Control type="string" value={this.state.editableMovie.Plot} onChange={event => this.onTextChange(event, "Plot")} readOnly={ !this.state.editable}/>
              <Form.Label>IMDB Rating:</Form.Label>
              <Form.Control type="number" value={this.state.editableMovie.imdbRating} onChange={event => this.onTextChange(event, "imdbRating")} readOnly={ !this.state.editable}/>
              <Form.Label>Actors:</Form.Label>
              <Form.Control type="string" value={this.state.editableMovie.Actors} onChange={event => this.onTextChange(event, "Actors")} readOnly={ !this.state.editable}/>
            </Form.Group>
          </Form>
          </Modal.Body>
          <Modal.Footer>
                {
                  this.state.editable ? 
                  <div>
                    <Button className="edit-button"  variant="dark" onClick={this.onSave}> Save</Button>
                    <Button className="edit-button"  variant="dark" onClick={this.onEditToggle}> Cancel</Button>
                  </div>
                  : <Button className="edit-button"  variant="dark" onClick={this.onEditToggle}> Edit</Button>
                    
                }
          </Modal.Footer>
        </div>
    );
  }
}

export default MovieModal;
