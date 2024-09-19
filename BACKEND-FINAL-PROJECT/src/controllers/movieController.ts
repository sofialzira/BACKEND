import {Request, Response, NextFunction} from 'express';
import IMovie from '../interfaces/movieInterface.js';
import movieService from '../services/movieService.js'



class MovieController {
    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const movies: IMovie[] | undefined = await movieService.getAll();
            console.log(movies);

            res.json(movies);
        } catch (error) {
            res.status(500).json({ error: 'failed to get movies'});
        }
    }
    async getOne(req: Request, res: Response, next: NextFunction) {
        try {
            const movieId: string = req.params.id;

            const movie = await movieService.getOne(movieId);

            if(movie === null ) {
                return res.status(404).json({ error: 'movie not found' });
            }

            res.json(movie);

        } catch (error) {
            res.status(500).json ({ error: 'failed to get movie' })
        } 
    }

    async searchMovies (req: Request, res: Response, next: NextFunction) {
            try {
                const search: string = req.params.search;
                const result = await movieService.findMovies(search);

                if(result === null ) {
                    return res.status(404).json({ error: 'movie not found' });
                }
        
                res.json(result);


        } catch (error) {
            res.status(500).json ({ error: 'failed to get movie' })
        } 
    }

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const {title, releaseDate, trailerLink, genres} = req.body;
            const poster = req.files?.poster;
            const movieData = {
                title, 
                releaseDate,
                trailerLink,
                genres
            } as IMovie; 

            const createdMovie = await movieService.create(movieData, poster);

            res.status(201).json(createdMovie);

        } catch (err) {
            console.log(err);
        }
    }

    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const movieId: string = req.params.id;
            const movieToUpdate: IMovie = req.body;
            const updatedMovie = await movieService.update(movieId, movieToUpdate);

            if(!updatedMovie) {
                res.status(404).json( {error: 'Movie not found'});
            }

            res.json(updatedMovie);
        } catch (error) {
            res.status(500).json({ error: 'Failed to update movie'});
        }
    }

    async delete(req: Request, res: Response, next: NextFunction) {}

}


export default new MovieController();