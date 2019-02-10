import React, { Component } from 'react';
import axios from 'axios';
import './Archive.css';
import ResultsTable from '../ResultsTable/ResultsTable';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';

class Archive extends Component {

    constructor(props) {
        super(props);
        this.searchMovies = this.searchMovies.bind(this);
        this.getMovie = this.getMovie.bind(this);
        this.onSearchChanged = this.onSearchChanged.bind(this);
        this.onSearchClicked = this.onSearchClicked.bind(this);
        this.state = {
          sharedMovies: [],
          detailedMovies: [],
          updatedMovies: 0,
          keywords: ""
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


    render() {
      console.log("RENDER!");
        return (
        <div className="Archive">
          <Navbar bg="dark" variant="dark">
            <Navbar.Brand>Herolo</Navbar.Brand>
            <Nav className="mr-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#features">Features</Nav.Link>
              <Nav.Link href="#pricing">Pricing</Nav.Link>
            </Nav>
            <Form inline>
              <FormControl type="text" placeholder="Search" className="mr-sm-2" onChange={this.onSearchChanged}/>
              <Button variant="outline-info" onClick={this.onSearchClicked}> Search</Button>
            </Form>
           </Navbar>
            <ResultsTable sharedMovies={this.state.sharedMovies}></ResultsTable>

        </div>

        );
    }
}

export default Archive;