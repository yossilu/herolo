import React, { Component } from 'react';
import axios from 'axios';
import './Archive.css';
import ResultsTable from '../ResultsTable/ResultsTable';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';
import Modal from 'react-bootstrap/Modal';

class Archive extends Component {

    constructor(props) {
        super(props);
        this.searchMovies = this.searchMovies.bind(this);
        this.getMovie = this.getMovie.bind(this);
        this.onSearchChanged = this.onSearchChanged.bind(this);
        this.onSearchClicked = this.onSearchClicked.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.checkIfTitleExists = this.checkIfTitleExists.bind(this);
        this.saveNewMovie = this.saveNewMovie.bind(this);
        this.state = {
          sharedMovies: [],
          detailedMovies: [],
          updatedMovies: 0,
          keywords: "",
          modalShow: false
        };
    }
    getMovie = async (movieRecord) => {
      console.log("GET MOVIE!!");
      const apikey = 'c405b8b8';
      const searchMoviesUrl = `?plot=full&type=movie&apikey=${apikey}&t=${movieRecord.Title}`
      const baseUrl = 'http://www.omdbapi.com/';
      return axios({
        url: searchMoviesUrl,
        baseURL: baseUrl,
        method: 'GET'
      })
      .then(res => res.data);
    }

    searchMovies = async (keywords) => {
        if(keywords.length > 0){
          console.log(keywords.length)
        const apikey = 'c405b8b8';
        const searchMoviesUrl = `?type=movie&apikey=${apikey}&s=${keywords}`;
        const baseUrl = 'http://www.omdbapi.com/';
        return axios({
          url: searchMoviesUrl,
          baseURL: baseUrl,
          method: 'GET'
        })
        .then(res => res.data.Search);
      }
    }

    onSearchChanged = (event) => {
        this.setState({
          keywords: event.target.value
        })
    }

    onSearchClicked = async () => {
      let searchResults = await this.searchMovies(this.state.keywords.trim());
      console.log("search Results: ",searchResults);
      let detailedMovies = [] ;
      for (let searchResult of searchResults){
        detailedMovies.push(await this.getMovie(searchResult))
      }
      console.log("detailed movies: " ,detailedMovies);
      this.setState({
        sharedMovies: detailedMovies
      })
    }

    onMovieSave = (movieData) => {
      let movies = this.state.sharedMovies;
      movies = movies.map((res) => {
        if(res.imdbID === movieData.imdbID){
          return movieData;
        }
        return res;
      });
      console.log("on movie save",movies);
      this.setState({
        sharedMovies: movies
      })
    }

    checkIfTitleExists = (currentMovie, newMovie) => {
      if(currentMovie.Title.toUpperCase() === newMovie.Title.toUpperCase()){
        console.log("TITLE EXISTS")
        if(currentMovie.imdbID === newMovie.imdbID){
          console.log("SAME MOVIE EXISTS")
          return false;
        }
      }
      return true;
    }

    toggleModal = () => {
      this.setState({
        modalShow: !this.state.modalShow
      })
    }

    saveNewMovie = () => {

    }


    render() {
      
      console.log("archive render",this.state.sharedMovies);
        return (
        <div className="Archive">
          <Navbar bg="dark" variant="dark">
            <Navbar.Brand>Herolo</Navbar.Brand>
            <Nav className="mr-auto">
              <Nav.Link href="#adding new movies" onClick={this.toggleModal}>Add a Movie</Nav.Link>
            </Nav>
            <Form inline>
              <FormControl type="text" placeholder="Search" className="mr-sm-2" onChange={this.onSearchChanged}/>
              <Button variant="outline-info" onClick={this.onSearchClicked}> Search</Button>
            </Form>
           </Navbar>
           <Modal show={this.state.modalShow} onHide={this.toggleModal}>
                <Modal.Header closeButton>
                  <Modal.Title id="contained-modal-title-vcenter">Add a movie to our library</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form className="modal-body">
                      <Form.Group controlId="formFields">
                      <Form.Label>title:</Form.Label>
                      <Form.Control className="text-muted" type="string"/>
                          <Form.Label>Year:</Form.Label>
                          <Form.Control className="text-muted" type="string"/>
                          <Form.Label>Genre:</Form.Label> 
                          <Form.Control className="text-muted" type="string"/>
                          <Form.Label>Runtime:</Form.Label>
                          <Form.Control className="text-muted" type="string"/>
                          <Form.Label>Director:</Form.Label> 
                          <Form.Control className="text-muted" type="string"/>
                          <Form.Label>Plot:</Form.Label> 
                          <Form.Control className="text-muted" type="string"/>
                          <Form.Label>IMDB Rating:</Form.Label>
                          <Form.Control className="text-muted" type="number"/>
                          <Form.Label>Actors:</Form.Label>
                          <Form.Control className="text-muted" type="string"/>
                        </Form.Group>
                  </Form>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="primary" onClick={this.saveNewMovie}>Save</Button>
                </Modal.Footer>
              </Modal>;
            <ResultsTable sharedMovies={this.state.sharedMovies} onMovieSave={this.onMovieSave}></ResultsTable>

        </div>

        );
    }
}

export default Archive;
