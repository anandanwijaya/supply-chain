const express = require('express')
const router = express.Router()
const userService = require('./user.services')

router.post('/', async (req, res) => {
    try {
        const userData = req.body
        const newUser = await userService.createUser(userData)
        res.status(201).json(newUser)
    } catch (error) {
        res.status(400).send(error.message)
    }
})

router.get('/', async (req, res) => {
    try {
        const users = await userService.getAllUsers()
        res.status(200).send(users)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

router.get('/:id', async (req, res) => {
    try {
        const userId = parseInt(req.params.id)
        const user = await userService.getUserByUserId(userId)
        res.status(200).send(user)
    } catch (error) {
        res.status(400).send(error.message)
    }
})

router.patch('/:id', async (req, res) => {
    try {
        const userId = parseInt(req.params.id)
        const userData = req.body
        const updatedUser = await userService.editUserByUserId(userId, userData)

        delete updatedUser.password
        res.status(200).send({
            data: updatedUser,
            message: 'User updated succesfully!',
        })
    } catch (error) {
        res.status(400).send(error.message)
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const userId = parseInt(req.params.id)
        await userService.deleteUserByUserId(userId)
        res.status(204).json({ message: 'User Deleted' })
    } catch (error) {
        res.status(400).send(error.message)
    }
})

module.exports = router
