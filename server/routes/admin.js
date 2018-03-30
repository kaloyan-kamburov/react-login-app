const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');


//Get all users
router.get('/users', passport.authenticate('jwt', {session: false}), async(req, res, next) => {
    try {
        let users = await User.getAllUsers();
        let notAdminRole = (role) => {
            return role !== 'admin'
        }

        if (users) {
            return res.json({
                success: true,
                users
            })
        } else {
            return res.json({
                success: false,
                msg: 'There are no users'
            })
        }
    } catch(error) {
        return res.json({
            success: false,
            msg: 'An error occured while getting users',
            error
        })
    }
});

//Search users
router.post('/searchUsers', passport.authenticate('jwt', {session: false}), async(req, res, next) => {
    try {
        let users = await User.getUserBySearchCriteria(req.body);
        if (users) {
            return res.json({
                success: true,
                users
            })
        } else {
            res.json({
                success: false,
                msg: 'No users found'
            })
        }
    } catch (error) {
        res.json({
            success: false,
            msg: 'Error occured while searching users',
            error
        })

    }

});

module.exports = router;