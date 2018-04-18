const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');

//Get all users
router.get('/users', passport.authenticate('jwt', {session: false}),  async(req, res, next) => {
    try {
        let users = await User.getAllUsers();

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

//Change user password
router.put('/users/updatePassword', passport.authenticate('jwt', {session: false}), async(req, res, next) => {
    try {
        const newPass = await User.changePassword(req.body.id, req.body.newPassword);
        // let users = await User.getAllUsers();

        if (newPass) {
            return res.json({
                success: true,
                msg: 'Password changed'
            });
        } else {
            return res.json({
                success: false,
                msg: 'Password didn\'t changed'
            });
        }    
    } catch(error) {
        return res.json({
            success: false,
            msg: 'Password didn\'t updated'
        });
    }
        
    
})

//Search users
router.post('/searchUsers', passport.authenticate('jwt', {session: false}), async(req, res, next) => {
    try {
        let users = await User.getUserBySearchField(req.body);
        if (users) {
            return res.json({
                success: true,
                users
            })
        } else {
            return res.json({
                success: false,
                msg: 'No users found'
            })
        }
    } catch (error) {
        return res.json({
            success: false,
            msg: 'Error occured while searching users',
            error
        })

    }

});

//Delete user
router.delete('/:id', passport.authenticate('jwt', {session: false}), async (req, res, next) => {
    try {
        const userDelete = await User.deleteUser(req.params.id); 
        
        if (userDelete) {
            return res.json({
                success: true,
                msg: 'User deleted'
            })
        } else {
            return res.json({
                success: false,
                msg: 'User not found'
            })
        }

    } catch(error) {
        return res.json({
            succes: false, 
            error,
            msg: 'Error while deleting user'
        })
    }
})

module.exports = router;