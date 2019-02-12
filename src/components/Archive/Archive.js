import React, { Component } from 'react';
import axios from 'axios';
import './Archive.css';
import ResultsTable from '../ResultsTable/ResultsTable';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css' 
import ArchiveModal from './ArchiveModal/ArchiveModal';

class Archive extends Component {

    constructor(props) {
        super(props);
        this.searchMovies = this.searchMovies.bind(this);
        this.getMovie = this.getMovie.bind(this);
        this.onSearchChanged = this.onSearchChanged.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.saveNewMovie = this.saveNewMovie.bind(this);
        this.stringValidations = this.stringValidations.bind(this);
        this.state = {
          sharedMovies: [],
          detailedMovies: [],
          updatedMovies: 0,
          keywords: "",
          modalShow: false,
          savedMovie: {},
          savedOrNot: false
        };
    }

componentWillUpdate = () => {
  if(!this.state.savedOrNot && this.state.modalShow){
    let newMovies = this.state.detailedMovies;
    newMovies.push(this.state.savedMovie)
    console.log(newMovies)
    this.setState({
      detailedMovies: newMovies,
      savedOrNot: !this.state.savedOrNot
    })
  }
}



    getMovie = async (movieRecord) => {
      const apikey = 'c405b8b8';
      const searchMoviesUrl = `?plot=full&type=movie&apikey=${apikey}&t=${movieRecord.Title}`
      const baseUrl = 'http://www.omdbapi.com/';
      return axios({
        url: searchMoviesUrl,
        baseURL: baseUrl,
        method: 'GET'
      })
      .then(res => this.stringValidations(res.data));
    }

    searchMovies = async (keywords) => {
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
        
      stringValidations = (moviedata) => {
        let title = moviedata.Title;
        let allowedChars = ' abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
        let allowedDigits = '0123456789';
        for(let ch in title){
            if (allowedChars.indexOf(title[ch]) === -1){

                  title=title.split(`${title[ch]}`).join('')
                } 
                if(title[ch+1] === ' ' && allowedDigits.indexOf(title[ch]) !== -1){
                      title[ch]=ch.toUpperCase();   
                }
                if(allowedDigits.indexOf(title[ch]) !== -1){
                  //title[ch]=title[ch]
                }
          }
          moviedata.Title=title;
          return moviedata;
       }

    onSearchChanged = (event) => {
        this.setState({
          keywords: event.target.value
        })
    }



    onSearchClicked = async () => {
      if(this.state.keywords.length > 0){
        let searchResults = await this.searchMovies(this.state.keywords.trim());
        let detailedMovies = [] ;
        for (let searchResult of searchResults){
          detailedMovies.push(await this.getMovie(searchResult));
        }
        this.setState({
          sharedMovies: detailedMovies
        })
      } else {
        confirmAlert({
          title: 'Oops something went wrong....',
          message: 'please enter a proper movie name',
          buttons: [
            {
              label: 'X'
            }
          ]
            
        })
      }
    }

    onMovieSave = (movieData) => {
      let movies = this.state.sharedMovies;
      movies = movies.map((res) => {
        if(res.imdbID === movieData.imdbID){
          return movieData;
        }
        return res;
      });
      this.setState({
        sharedMovies: movies
      })
    }


    toggleModal = () => {
      this.setState({
        modalShow: !this.state.modalShow
      })
    }

    saveNewMovie = (newMovie) => {

      this.setState({
        savedMovie: newMovie
      })
    }



    render() {
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
           <ArchiveModal modalShow={this.state.modalShow} toggleModal={this.toggleModal} saveNewMovie={this.saveNewMovie}></ArchiveModal>
            <ResultsTable sharedMovies={this.state.sharedMovies} onMovieSave={this.onMovieSave}></ResultsTable>

        </div>

        );
    }
}

export default Archive;
