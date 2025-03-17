import { Request, Response } from 'express'
import itemModel from '../models/item.model'
import { Item } from '../types/item'

/**
 * Get all items
 * 
 * @param {Request} req
 * @param {Response} res
 * @returns {void} Returns list of items.
 */
const getItems = (req: Request, res: Response) => {
  const items = itemModel.findAll()
  res.status(200).json(items)
}

/**
 * Get item by ID
 * 
 * @param {Request<{ id: string}>} req
 * @param {Response} res
 * @returns {void} Returns one item.
 */
const getItemById = (req: Request<{ id: string }>, res: Response) => {
  console.log('getItemById')
  const { id } = req.params
  const item = itemModel.findById(id)
  if (!item) {
    res.status(404).send('Item not found!')
    return
  }
  res.status(200).json(item)
}

/**
 * Get item by title
 * 
 * @param {Request<{ title: string}>} req
 * @param {Response} res
 * @returns {void} Returns one item.
 */
const getItemByTitle = (req: Request<{ title: string }>, res: Response) => {
    const { title } = req.params
    console.log('getItemByTitle')
    const item = itemModel.findByTitle(title)
    if (!item) {
      res.status(404).send('Item not found!')
      return
    }
    res.status(200).json(item)
  }

/**
 * Add new item
 * 
 * @param {Request<{}, {}, Omit<Item, 'id'>>} req
 * @param {Response} res
 * @returns {void} Returns newly created item.
 */
const addItem = async (req: Request<{}, {}, Omit<Item, 'id'>>, res: Response) => {
  const { title, author, publish_year, evaluation, img_url } = req.body
  if (!title) {
    res.status(500).json({ error: 'Title is empty!' })
    return
  }
  const item = await itemModel.create({ title, author, publish_year, evaluation, img_url })
  if (!item) {
    res.status(409).json({ error: 'Title is duplicate!' })
    return
  }
  res.status(201).json(item)
}

/**
 * Edit item by ID
 * 
 * @param {Request<{ id: string }, {}, Partial<Item>>} req
 * @param {Response} res
 * @returns {void} Returns updated item.
 */
const updateItemById = async (req: Request<{ id: string }, {}, Partial<Item>>, res: Response) => {
  const { id } = req.params
  const { title, author, publish_year, evaluation, img_url } = req.body
  const item = await itemModel.editItemById(id, { title, author, publish_year, evaluation, img_url })
  if (!item) {
    res.status(404).json({ error: "Item does not exist!" })
    return
  }
  res.status(200).json(item)
}

/**
 * Delete item by ID
 * 
 * @param {Request<{ id: string }>} req
 * @param {Response} res
 * @returns {void} Returns success or fail message.
 */
const deleteItemById = (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params
  const result: boolean = itemModel.removeItemById(id)
  if (!result) {
    res.status(404).json({ message: "Item not found!" })
    return
  }
  res.status(200).json({ message: "Deleted item!" })
}

export default {
  getItems,
  getItemById,
  getItemByTitle,
  addItem,
  updateItemById,
  deleteItemById
}