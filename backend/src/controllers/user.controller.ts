import { Request, Response } from 'express'
import userModel from '../models/user.model'
import { User } from '../types/user'

/**
 * Get all users
 * 
 * @param {Request} req
 * @param {Response} res
 * @returns {void} Returns list of users.
 */
const getUsers = (req: Request, res: Response) => {
  const users = userModel.findAll()
  res.status(200).json(users)
}

/**
 * Get user by ID
 * 
 * @param {Request<{ id: string}>} req
 * @param {Response} res
 * @returns {void} Returns one user.
 */
const getUserById = (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params
  const user = userModel.findById(id)
  if (!user) {
    res.status(404).send('User not found!')
    return
  }
  res.status(200).json(user)
}

/**
 * Get user by username
 * 
 * @param {Request<{ username: string}>} req
 * @param {Response} res
 * @returns {void} Returns one user.
 */
const getUserByUsername = (req: Request<{ username: string }>, res: Response) => {
    const { username } = req.params
    const user = userModel.findByUsername(username)
    if (!user) {
      res.status(404).send('User not found!')
      return
    }
    res.status(200).json(user)
  }

/**
 * Add new user
 * 
 * @param {Request<{}, {}, Omit<User, 'id'>>} req
 * @param {Response} res
 * @returns {void} Returns newly created user.
 */
const addUser = async (req: Request<{}, {}, Omit<User, 'id'>>, res: Response) => {
  const { username, password, firstname, lastname } = req.body
  if (!username || !password || !firstname || !lastname) {
    res.status(500).json({ error: 'Some of the user information is empty!' })
    return
  }
  const user = await userModel.create({ username, password, firstname, lastname })
  if (!user) {
    res.status(409).json({ error: 'Username is taken!' })
    return
  }
  res.status(201).json(user)
}

/**
 * Edit user by ID
 * 
 * @param {Request<{ id: string }, {}, Partial<User>>} req
 * @param {Response} res
 * @returns {void} Returns updated user.
 */
const updateUserById = async (req: Request<{ id: string }, {}, Partial<User>>, res: Response) => {
  const { id } = req.params
  const { username, password} = req.body
  const user = await userModel.editUserById(id, { username, password })
  if (!user) {
    res.status(404).json({ error: "User does not exist!" })
    return
  }
  res.status(200).json(user)
}

/**
 * Delete user by ID
 * 
 * @param {Request<{ id: string }>} req
 * @param {Response} res
 * @returns {void} Returns success or fail message.
 */
const deleteUserById = (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params
  const result: boolean = userModel.removeUserById(id)
  if (!result) {
    res.status(404).json({ message: "User not found!" })
    return
  }
  res.status(200).json({ message: "Deleted user!" })
}

/**
 * Login user
 * 
 * @param {Request<{}, {}, Partial<User>>} req
 * @param {Response} res
 * @returns {void} Returns cookie and redirect.
 */
const loginUser = async (req: Request<{}, {}, Partial<User>>, res: Response) => {
  const { username, password } = req.body
  if (!username || !password) {
    res.status(500).send("Username/password is missing!")
    return
  }
  const user = await userModel.checkUserPass(username, password)
  if (!user) {
    res.status(500).send("Login details are incorrect!")
    return
  }
  if (req.session) {
    req.session.isLoggedIn = true
    req.session.username = user.username
  }
  res.status(200).send("Successfully logged in!")
}

/**
 * Logout user
 * 
 * @param {Request} req
 * @param {Response} res
 * @returns {void} 
 */
const logoutUser = (req: Request, res: Response) => {
    req.session = null
    res.status(200).json({
      content: "User logout!"
    })
  }

const checkCookie = (req: Request, res: Response) => {
    if (req.session && req.session.username) {
        const username = req.session.username
        const user = userModel.findByUsername(username)
        if (!user) {
            res.status(404).send('User not found!')
            return
        }
        res.status(200).json({
            content: req.session.message,
            user: user
        })
        return
    }
    res.status(500).json({
      content: "No cookie found!"
    })
  }

export default {
  getUsers,
  getUserById,
  getUserByUsername,
  addUser,
  updateUserById,
  deleteUserById,
  loginUser,
  logoutUser,
  checkCookie
}