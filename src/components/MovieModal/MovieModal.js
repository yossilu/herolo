import React, { Component } from 'react';
import './MovieModal.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

class MovieModal extends Component {

    constructor(props) {
        super(props);
        this.onEditToggle = this.onEditToggle.bind(this);
        this.onSave = this.onSave.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
        this.onFormClose = this.onFormClose.bind(this);
        this.state = {
            movieData: this.props.movieData,
            editable: false,
            editableMovie: this.props.movieData
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
        editable: !this.state.editable,
      });
    }

    onFormClose = () => {
      this.setState({
        editable: !this.state.editable
      })
    }

    onSave = () => {
      for(var key in this.state.editableMovie){
        console.log(this.state.editableMovie[key])
      }
      this.setState({
        movieData: this.state.editableMovie
      })
      this.props.onMovieSave(this.state.movieData)
    }

    onTextChange = (event, type) => {
      console.log("WORKINGGGASDFSDFDS")
      let editableMovie = this.state.editableMovie;
      editableMovie[type] = event.target.value;
      this.setState({
        editableMovie: editableMovie
      })
    //   if(data.toString().length > 0){
    //   if(editableMove === "Year" && (data.length <= 4)){
    //     this.setState(prevState =>({
    //         modal: {
    //           ...prevState.modal,
    //           Year: data
    //         }
    //       })
    //     )
    //   }
    //   if(editableMove === "Genre"){
    //     this.setState(prevState => ({
    //       modal: {
    //         ...prevState.modal,
    //         Genre: data
    //       }
    //       })
    //     )
    //   }
    //   if(type === "Title"){
    //     this.setState(prevState => ({
    //       modal: {
    //         ...prevState.modal,
    //         Title: data
    //       }
    //       })
    //     )
    //   }
    //   if(type === "Runtime"){
    //     this.setState(prevState => ({
    //       modal: {
    //         ...prevState.modal,
    //         Runtime: data
    //       }
    //     })
    //     )
    //   }
    //   if(type === "Director"){
    //     this.setState(prevState => ({
    //       modal: {
    //         ...prevState.modal,
    //         Director: data
    //       }
    //     })
    //     )
    //   }
    //   if(type === "Plot"){
    //     this.setState(prevState => ({
    //       modal: {
    //         ...prevState.modal,
    //         Plot: data
    //       }
    //     })
    //     )
    //   }
    //   if(type === "imdbRating" && data.toString().length < 2){
    //     this.setState(prevState => ({
    //       modal: {
    //         ...prevState.modal,
    //         imdbRating: data
    //       }
    //     })
    //     )
    //   }
    //   if(type === "Actors"){
    //     this.setState(prevState => ({
    //       modal: {
    //         ...prevState.modal,
    //         Actors: data
    //       }
    //     })
    //     )
    //   }
    // }

    }


  render() {
    return (
      <div className="records-modal" >
        <Form className="modal-body">
            <Form.Group controlId="formFields">
            <Form.Label>title:</Form.Label>
            <Form.Control className="text-muted" type="string" value={this.state.editableMovie.Title} onChange={event => this.onTextChange(event, "Title")} readOnly={!this.state.editable}/>
              <div className="card-body" >
                <Form.Label>Year:</Form.Label>
                <Form.Control className="text-muted" type="string" value={this.state.editableMovie.Year} onChange={event => this.onTextChange(event, "Year")} readOnly={!this.state.editable}/>
                <Form.Label>Genre:</Form.Label> 
                <Form.Control className="text-muted" type="string" value={this.state.editableMovie.Genre} onChange={event => this.onTextChange(event, "Genre")}  readOnly={ !this.state.editable}/>
                <Form.Label>Runtime:</Form.Label>
                <Form.Control className="text-muted" type="string" value={this.state.editableMovie.Runtime} onChange={event => this.onTextChange(event, "Runtime")} readOnly={ !this.state.editable}/>
                <Form.Label>Director:</Form.Label> 
                <Form.Control className="text-muted" type="string" value={this.state.editableMovie.Director} onChange={event => this.onTextChange(event, "Director")} readOnly={ !this.state.editable}/>
                <Form.Label>Plot:</Form.Label> 
                <Form.Control className="text-muted" type="string" value={this.state.editableMovie.Plot} onChange={event => this.onTextChange(event, "Plot")} readOnly={ !this.state.editable}/>
                <Form.Label>IMDB Rating:</Form.Label>
                <Form.Control className="text-muted" type="number" value={this.state.editableMovie.imdbRating} onChange={event => this.onTextChange(event, "imdbRating")} readOnly={ !this.state.editable}/>
                <Form.Label>Actors:</Form.Label>
                <Form.Control className="text-muted" type="string" value={this.state.editableMovie.Actors} onChange={event => this.onTextChange(event, "Actors")} readOnly={ !this.state.editable}/>
              </div>
              {
                this.state.editable ? 
                <div>
                  <Button className="edit-button"  variant="dark" onClick={this.onSave}> Save</Button>
                  <Button className="edit-button"  variant="dark" onClick={this.onEditToggle}> Cancel</Button>
                </div>
                : <Button className="edit-button"  variant="dark" onClick={this.onEditToggle}> Edit</Button>
                  
              }
              <Button className="close-modal" id="modal-close-btn" variant="dark" onClick={this.onFormClose}> X</Button>
            </Form.Group>
        </Form>
      </div>
    );
  }
}

export default MovieModal;
