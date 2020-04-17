import React from "react";
import FA from "react-fontawesome";

class MovieItem extends React.Component {
  state = {
    willWatch: false
  };

  getImg = () => {

    if(this.props.data.backdrop_path || this.props.data.poster_path){
      return (
        <img
        className="card-img-top"
        src={`https://image.tmdb.org/t/p/w500${this.props.data.backdrop_path || this.props.data.poster_path}`}
        alt=""
      />
      )
    }
    return (
      <img className="card-img-top"
      src='https://via.placeholder.com/500x281.png' alt='1'/>
    )

  }

  render() {
    const {
      data,
      deleteMovie,
      addMovieToWillWatch,
      deleteMovieFromWillWatch
    } = this.props;
    // props.data = {};
    return (
      <div className="card">
       {this.getImg()}
        <div className="card-body">
          <h6 className="card-title">{data.title}</h6>
          <div className="d-flex justify-content-between align-items-center">
            <p className="mb-0">Рейтинг: {data.vote_average}</p>
            {this.state.willWatch ? (
              <button
                type="button"
                className="btn btn-success"
                onClick={() => {
                  this.setState({
                    willWatch: false
                  });
                  deleteMovieFromWillWatch(data);
                }}
              >
                <FA name="heart" />
              </button>
            ) : (
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => {
                  this.setState({
                    willWatch: true
                  });
                  addMovieToWillWatch(data);
                }}
              >
                Буду смотреть
              </button>
            )}
          </div>
          <button
            className="btn btn-danger"
            type="button"
            onClick={() => {
              deleteMovie(data);
            }}
          >
            <FA name="trash" />
          </button>
        </div>
      </div>
    );
  }
}

export default MovieItem;
