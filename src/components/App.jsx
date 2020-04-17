import React from "react";
import MovieItem from "./MovieItem";
import { API_URL, API_KEY_3 } from "../utils/api";
import MovieTabs from "./MovieTabs";
import ReactPaginate from "react-paginate";

// UI = fn(state, props)

// App = new React.Component()

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      movies: [],
      moviesWillWatch: [],
      sort_by: "popularity.desc",
      currenPage: 0,
      totalPages: 1
    };

    this.updateSortBy = this.updateSortBy.bind(this);
  }

  componentDidMount() {
    this.getMovies();
  }

  componentDidUpdate(prevProps, prevState) {
    //  console.log("didUpd");
    //  console.log("prev", prevProps, prevState);
    //  console.log("this", this.props, this.state);
    if (prevState.sort_by !== this.state.sort_by) {
      this.getMovies();
    }
  }

  getMovies = () => {
    fetch(
      `${API_URL}/discover/movie?api_key=${API_KEY_3}&sort_by=${
        this.state.sort_by
      }&language=ru-RU&page=${this.state.currenPage + 1}`
    )
      .then(res => {
        return res.json();
      })
      .then(data => {
        console.log(data);
        this.setState({
          movies: data.results,
          totalPages: data.total_pages
        });
      });
  };

  findMovies = (query) => {
    fetch(
      `${API_URL}/search/movie?api_key=${API_KEY_3}&query=${query}&language=ru-RU&page=${this.state.currenPage + 1}`
    )
      .then(res => {
        return res.json();
      })
      .then(data => {
        console.log(data);
        this.setState({
          movies: data.results,
          totalPages: data.total_pages
        });
      });
  };

  deleteMovie = movie => {
    //  console.log(movie.id);
    const updateMovies = this.state.movies.filter(item => item.id !== movie.id);
    //   console.log(updateMovies);

    // this.state.movies = updateMovies;
    this.setState({
      movies: updateMovies
    });
  };

  addMovieToWillWatch = movie => {
    const updateMoviesWillWatch = [...this.state.moviesWillWatch];
    updateMoviesWillWatch.push(movie);

    this.setState({
      moviesWillWatch: updateMoviesWillWatch
    });
  };

  deleteMovieFromWillWatch = movie => {
    const updateMoviesWillWatch = this.state.moviesWillWatch.filter(
      item => item.id !== movie.id
    );

    this.setState({
      moviesWillWatch: updateMoviesWillWatch
    });
  };

  updateSortBy = value => {
    this.setState({
      sort_by: value
    });
  };

  handlePageClick = data => {
    let selected = data.selected;
    // let offset = Math.ceil(selected * this.props.perPage);

    this.setState({ currenPage: selected }, () => {
      this.getMovies();
    });
  };

  onUpdateSearch = e => {
    let q = e.target.value;

    if(q.length > 0){
     return this.findMovies(q);
    }
    return this.getMovies()
 
  }
  render() {
    return (
      <div className="container">
        <div className="row mt-4">
          <div className="col-9">
            <MovieTabs
              sort_by={this.state.sort_by}
              updateSortBy={this.updateSortBy}
            />
            <input
              type="text"
              className="form-control mb-4"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Поиск фильмов"
              onChange = {this.onUpdateSearch}
            />
            <ReactPaginate
              pageCount={this.state.totalPages}
              containerClassName={"pagination"}
              subContainerClassName={"pages pagination"}
              activeClassName={"active"}
              pageClassName={"page-item"}
              pageLinkClassName={"page-link"}
              onPageChange={this.handlePageClick}
              previousClassName={"page-item"}
              previousLinkClassName={"page-link"}
              nextLinkClassName={"page-link"}
              nextClassName={"page-item"}
              initialPage={this.state.currenPage}
            />
            <div className="row">
              {this.state.movies.map(movie => {
                return (
                  <div className="col-6 mb-4" key={movie.id}>
                    <MovieItem
                      data={movie}
                      deleteMovie={this.deleteMovie}
                      addMovieToWillWatch={this.addMovieToWillWatch}
                      deleteMovieFromWillWatch={this.deleteMovieFromWillWatch}
                    />
                  </div>
                );
              })}
              <ReactPaginate
                pageCount={this.state.totalPages}
                containerClassName={"pagination"}
                subContainerClassName={"pages pagination"}
                activeClassName={"active"}
                pageClassName={"page-item"}
                pageLinkClassName={"page-link"}
                onPageChange={this.handlePageClick}
                previousClassName={"page-item"}
                previousLinkClassName={"page-link"}
                nextLinkClassName={"page-link"}
                nextClassName={"page-item"}
                initialPage={this.state.currenPage}
              />
            </div>
          </div>
          <div className="col-3">
            <h4>Буду смотреть: {this.state.moviesWillWatch.length}</h4>
            <ul className="list-group">
              {this.state.moviesWillWatch.map(movie => (
                <li key={movie.id} className="list-group-item">
                  <div className="d-flex justify-content-between">
                    <p>{movie.title}</p>
                    <p>{movie.vote_average}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
