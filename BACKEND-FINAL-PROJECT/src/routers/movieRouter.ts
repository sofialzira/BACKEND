import { Router } from 'express';
import MovieController from '../controllers/movieController.js';
import { check, validationResult } from 'express-validator'; 
import { checkRole } from "../middlewares/authMiddleware.js";

const router: Router = Router();

const validateMovie = [
    check("username").notEmpty().withMessage("Userame is required"),
    check("title").notEmpty().withMessage("Movie title is required"),
    check("releaseDate").isNumeric().withMessage("Realese date must be a number"),
    check("posterUrl").notEmpty().withMessage("Movie posterURL is required"),
    check("genres").notEmpty().withMessage("Movie genre is required"),
]

router.get('/movies', checkRole(["USER"]), MovieController.getAll);
router.get('/movies/:id', checkRole(["USER"]), MovieController.getOne);
router.get('/movies/search/:search', checkRole(["USER"]), MovieController.searchMovies);
router.post('/movies', validateMovie, checkRole(["ADMIN"]), MovieController.create);
router.put('/movies/:id', checkRole(["ADMIN"]), MovieController.update);
router.delete('/movies/:id', checkRole(["ADMIN"]), MovieController.delete);


export default router; 