import { Router } from 'express'
import itemController from '../controllers/item.controller'

const userRouter = Router()

userRouter.get('/', itemController.getItems) // GET /items
userRouter.get('/:title', itemController.getItemByTitle) // GET /items/title
userRouter.get('/:id', itemController.getItemById) // GET /items/id
userRouter.post('/register',itemController.addItem) // POST /items
userRouter.post('/update/:id', itemController.updateItemById) // POST /items/update/id
userRouter.get('/delete/:id', itemController.deleteItemById) // GET /items/delete/id

export default userRouter