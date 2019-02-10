import React, { Component } from 'react';
import './MovieModal.css';
import Image from 'react-bootstrap/Image';


class MovieModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            movieData: this.props.movieData
          };   
       
    }




  render() {
    console.log(this.state);
    return (
      <div className="records-modal" >
        <div>
              <h4 className="card-header--title">{this.state.movieData.Title}</h4>
            <div className="card-body" >
              <p className="year">Year: {this.state.movieData.Year}</p>
              <p className="genre">Genre: {this.state.movieData.Genre}</p>
              <p className="runtime">Runtime: {this.state.movieData.Runtime}</p>
              <p className="director">Director: {this.state.movieData.Director}</p>
              <p className="plot">Plot: {this.state.movieData.Plot}</p>
              <p className="imdbRating">IMDB Rating: {this.state.movieData.imdbRating}</p>
              <p className="actors">Actors: {this.state.movieData.Actors}</p>
              <Image src={this.state.movieData.Poster} className="movie-modal-image"/>
            </div>
        </div>
      </div>
    );
  }
}

export default MovieModal;
