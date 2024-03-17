import User from '../models/user.js';
const controller = {};
const sender = (res, status, message) => res.status(status).send(message)
const notFound = (res, message) => res.status(404).send({status: 404, message: 'Not found!'})


controller.index = async (req, res) => {
	console.log(req);
	//Returns listing of all users
	try {
		const users = await User.find({});
		return sender (res, 200, users);
	}
	catch (err) {
		console.log(err);
		return sender(res, 500, err);
	}
};

controller.create = async (req,res) => {
	//creates a new user
	const newUser = new User(req.body)
	newUser.role ='guest';

	try{
		const user = await newUser.save();
		sender(res, 200, user);
	}
	catch (err) {
		sender(res, 500, err);
	}
};

controller.show = async (req,res) => {
	//Find and show user if they exist
	console.log(req.params);
	try {
		const user = await User.findById(req.params.id);
		user ? sender(res, 200, user): notFound(res);
	}
	catch (err) {
		sender(res, 500, err);
	}
};

controller.update = async (req,res) => {
	//Filter out inappropriate entries
	const allowed = ['name', 'email', 'role'];
	const filtered = Object.keys(req.body)
  		.filter(key => allowed.includes(key))
  		.reduce((obj, key) => {
    		obj[key] = req.body[key];
    		return obj;
  		}, {});
	try {
		const user = await User.findByIdAndUpdate(req.params.id, filtered, {returnOriginal: false})
		user ? sender(res, 200, user): notFound(res)
	}
	catch (err) {
		sender(res, 500, err);
	}
};

controller.delete = (req,res) => {
	//find and removes user
	User.findByIdAndDelete(req.params.id)
		.then((user) => user ? sender(res, 200, {status:200, message:'User Successfully Deleted!'}): notFound(res))
		.catch((err) => sender(res,500,err))

}

controller.verifyEmail = (req,res) => {
	//queries database for a user with the requested email
	let email = req.params.email
	User.findByEmail(email)
		.then((user) => user ? sender(res, 200, {email}): notFound(res))
		.catch((err) => sender(res,500,err))
};

export default controller;