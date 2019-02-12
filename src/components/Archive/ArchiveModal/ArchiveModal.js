import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'react-confirm-alert/src/react-confirm-alert.css' 


class ArchiveModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modalShow: this.props.modalShow,
            newMovie: {}
        };
    }

    onTextChange = (event, type) => {
      let newMovie = this.state.newMovie;
      newMovie[type] = event.target.value;
      
      this.setState({
        newMovie: newMovie
      })
      }

      saveNewMovie = () => {
          this.props.saveNewMovie(this.state.newMovie);
      }

render() {
      return (
      <div className="ArchiveModal">
         <Modal show={this.props.modalShow} onHide={this.props.toggleModal}>
              <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">Add a movie to our library</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form className="modal-body">
                    <Form.Group controlId="formFields">
                    <Form.Label>Title:</Form.Label>
                    <Form.Control  type="string" onChange={event => this.onTextChange(event, "Title")}/>
                        <Form.Label>Year:</Form.Label>
                        <Form.Control  type="number" onChange={event => this.onTextChange(event, "Year")}/>
                        <Form.Label>Genre:</Form.Label> 
                        <Form.Control  type="string" onChange={event => this.onTextChange(event, "Genre")}/>
                        <Form.Label>Runtime:</Form.Label>
                        <Form.Control  type="string" onChange={event => this.onTextChange(event, "Runtime")}/>
                        <Form.Label>Director:</Form.Label> 
                        <Form.Control  type="string" onChange={event => this.onTextChange(event, "Director")}/>
                        <Form.Label >Plot:</Form.Label> 
                        <Form.Control as="textarea" rows="4" type="string" onChange={event => this.onTextChange(event, "Plot")}/>
                        <Form.Label>IMDB Rating:</Form.Label>
                        <Form.Control type="number" onChange={event => this.onTextChange(event, "imdbRating")}/>
                        <Form.Label>Actors:</Form.Label>
                        <Form.Control type="string" onChange={event => this.onTextChange(event, "Actors")}/>
                      </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="dark" onClick={this.saveNewMovie}>Save</Button>
              </Modal.Footer>
            </Modal>

      </div>

      );
  }
}


export default ArchiveModal;