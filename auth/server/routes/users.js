import express from 'express';
const router = express.Router();
import { body, validationResult } from 'express-validator';
import usersController from '../controllers/users_controller.js';
/* GET users listing and create new users*/
router.route('/')
	.get(usersController.index)
	// .post(body('email').notEmpty().escape(), usersController.create);
	.post(usersController.create);

/*Show, update, and destroy a particular user*/
router.route('/:id')
	.get(usersController.show)
	.put(usersController.update)
	.delete(usersController.delete);


/*Ajax call to verify if an email already exists*/
router.route('/email/:email')
	.get(usersController.verifyEmail);
export default router;