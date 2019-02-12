import React, { Component } from 'react';
import './MovieModal.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css' 

class MovieModal extends Component {

    constructor(props) {
        super(props);
        this.onEditToggle = this.onEditToggle.bind(this);
        this.onSave = this.onSave.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
        this.copyOf = this.copyOf.bind(this);
        this.onFormClose = this.onFormClose.bind(this);
        this.checkForDigits = this.checkForDigits.bind(this);
        let editableMovie = this.copyOf(this.props.movieData);
        this.state = {
            movieData: this.props.movieData,
            editable: false,
            editableMovie: editableMovie,
            cantEditMsg: "You Can't Edit A Movie With A Title"
          };   
    }
    copyOf = (object) => {
      let copy = {};
      for (let key in object){
        copy[key] = object[key];
      }
      return copy;
    }

    onEditToggle=()=>{
      let editableMovie = this.copyOf(this.state.movieData);
      if(editableMovie.Title.length !== 0){
      this.setState({
        editable: !this.state.editable,
        editableMovie: editableMovie
      });
     }
      else
     {
      confirmAlert({
        title: 'Oops something went wrong....',
        message: this.state.cantEditMsg,
        buttons: [
          {
            label: 'X'
          }
        ]
          
      })
      this.onFormClose();
     }
    }

    onEditToggle2=()=>{
      let editableMovie = this.copyOf(this.state.movieData);
      if(editableMovie.Title.length === 0){
      this.setState({
        editable: !this.state.editable,
        editableMovie: editableMovie
      });
     }
      else
     {
      confirmAlert({
        title: 'Oops something went wrong....',
        message: this.state.cantEditMsg,
        buttons: [
          {
            label: 'X'
          }
        ]
          
      })
      this.onFormClose();
     }
    }

    onEditToggle=()=>{
      let editableMovie = this.copyOf(this.state.movieData);
      if(editableMovie.Title.length !== 0){
      this.setState({
        editable: !this.state.editable,
        editableMovie: editableMovie
      });
     }
      else
     {
      confirmAlert({
        title: 'Oops something went wrong....',
        message: this.state.cantEditMsg,
        buttons: [
          {
            label: 'X'
          }
        ]
          
      })
      this.onFormClose();
     }
    }

     

    onFormClose = () => {
      this.props.toggleModal(this.state.editableMovie);
    }
    

    checkForDigits = (value) => {
      let check = false;
      let allowedDigits = '0123456789';
      for (let digit of String(value)){
        if (allowedDigits[digit] === digit){
          check = true;
        }
      }
      return check;
    }

    onSave = () => {
      let valid = true;
      let editableMovie = this.copyOf(this.state.editableMovie);
      for (let key in editableMovie){
        let textVal = editableMovie[key];
        if (key === 'Year'){
          if (this.checkForDigits(textVal)){
            valid = false;
          }
        } 
      }
      if (!valid){
        this.setState({
          editable: false,
          movieData: this.state.editableMovie
        });
        console.log(this.state.editableMovie)
        this.props.onMovieSave(editableMovie);
        this.props.toggleModal(editableMovie);
      } else {

        //TODO: error popup
      }

      
    }

    onTextChange = (event, type) => {
      let editableMovie = this.state.editableMovie;
      editableMovie[type] = event.target.value;
      console.log(editableMovie)
      this.setState({
        editableMovie: editableMovie
      })
    }


  render() {
    return (
      <div>
        <Modal.Body>
          <Form className="modal-body">
           <Form.Group controlId="formFields">
              <Form.Label>Title:</Form.Label>
              <Form.Control type="string" value={this.state.editableMovie.Title} onChange={event => this.onTextChange(event, "Title")} readOnly={!this.state.editable}/>
              <Form.Label>Year:</Form.Label>
              <Form.Control type="number" value={this.state.editableMovie.Year} onChange={event => this.onTextChange(event, "Year")} readOnly={!this.state.editable}/>
              <Form.Label>Genre:</Form.Label> 
              <Form.Control type="string" value={this.state.editableMovie.Genre} onChange={event => this.onTextChange(event, "Genre")}  readOnly={ !this.state.editable}/>
              <Form.Label>Runtime:</Form.Label>
              <Form.Control type="string" value={this.state.editableMovie.Runtime} onChange={event => this.onTextChange(event, "Runtime")} readOnly={ !this.state.editable}/>
              <Form.Label>Director:</Form.Label> 
              <Form.Control type="string" value={this.state.editableMovie.Director} onChange={event => this.onTextChange(event, "Director")} readOnly={ !this.state.editable}/>
              <Form.Label>Plot:</Form.Label> 
              <Form.Control type="string" as="textarea" rows="4" value={this.state.editableMovie.Plot} onChange={event => this.onTextChange(event, "Plot")} readOnly={ !this.state.editable}/>
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
                  : <div><Button className="edit-button"  variant="dark" onClick={this.onEditToggle}> Edit Check</Button>
                         <Button className="edit-button"  variant="dark" onClick={this.onEditToggle2}> Edit </Button>
                         </div>
                }
          </Modal.Footer>
        </div>
    );
  }
}

export default MovieModal;
