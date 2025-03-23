import { Router } from 'express'
import itemController from '../controllers/item.controller'

const itemRouter = Router()

itemRouter.get('/', itemController.getItems) // GET /items
itemRouter.get('/:title', itemController.getItemByTitle) // GET /items/title
itemRouter.get('/:id', itemController.getItemById) // GET /items/id
itemRouter.post('/register',itemController.addItem) // POST /items
itemRouter.post('/update/:id', itemController.updateItemById) // POST /items/update/id
itemRouter.get('/delete/:id', itemController.deleteItemById) // GET /items/delete/id

export default itemRouter



    // Editのスマホ対応
// (モーダルをコンポーネント化したい
    // 削除機能
// 個別の表示対応
    // 画像の入力欄
// デザイン修正

