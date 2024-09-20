import { title } from 'process';
import IMovie from '../interfaces/movieInterface.js';
import MovieModel from '../models/movieModel.js';
import fileService from '../utils/fileService.js';

class MovieService {
  async getAll(): Promise<IMovie[] | undefined> {
    try {
      return await MovieModel.find();
    } catch (error) {
      throw new Error('Failed to get all movies');
    }
  }

  async getOne(movieId: string): Promise<IMovie | null> {
    try {
      const foundMovie: IMovie | null = await MovieModel.findById(movieId);

      return foundMovie;
    } catch (error) {
      throw new Error('Failed to get movie by ID');
    }
  }

  async findMovies(search: string): Promise<IMovie[] | undefined> {
    try {
      const allMovies = await MovieModel.find();
      const movies = allMovies.filter((movie) => {
        return movie.title.includes(search) || movie.genres.includes(search);
      });
      return movies;
    } catch (error) {
      throw new Error('Failed to get movie');
    }
  }

  async create(movieData: IMovie, poster: any) {
    try {
      if (poster) {
        const posterUrl = fileService.save(poster);
        movieData.posterUrl = posterUrl;
      }
      const newMovie = new MovieModel(movieData);
      //await MovieModel.create(movieData);
      return await newMovie.save();
    } catch (err) {
      console.log(err);
    }
  }
  async update(movieId: string, movie: IMovie): Promise<IMovie | null> {
    try {
      const updatedMovie = await MovieModel.findByIdAndUpdate(movieId, movie, { new: true });
      return updatedMovie;
    } catch (error) {
      throw new Error('Failed to update movie');
    }
  }

  async delete(movieId: string): Promise <IMovie | null> {
    try {
        const deletedMovie = await MovieModel.findByIdAndDelete(movieId);
        return deletedMovie;
    } catch (error) {
        throw new Error ('Failed to delete movie');
    }
  }
}

export default new MovieService();
