const Course = require('../models/Course');
const User = require('../models/User');
//   [GET] /register

class UserController {
    //   [GET] /users/register
    register(req, res) {
        res.render('users/register');
    }
    //   [GET] /users/login
    login(req, res) {
        res.render('users/login');
    }
    //   [POST] /users/register

    signup(req, res) {
        const { name, email, password, confirmPassword } = req.body;
        let errors = [];

        //   Check required fields
        if (!name || !email || !password || !confirmPassword) {
            errors.push({ message: 'Please fill in all fields' });
        }
        // Check password match
        if (password !== password) {
            {
                errors.push({ message: 'Password do not match' });
            }
        }
        // Check pass length
        if (password.length < 6) {
            errors.push({
                message: 'Password should be at least 6 characters',
            });
        }

        if (errors.length > 0) {
            res.render('users/register', {
                errors,
                name,
                email,
                password,
                confirmPassword,
            });
        } else {
            res.send('pass');
        }
    }
    signin(req, res) {}
}

module.exports = new UserController();
