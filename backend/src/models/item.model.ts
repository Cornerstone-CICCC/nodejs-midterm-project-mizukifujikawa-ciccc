import { v4 as uuidv4 } from 'uuid'
import { Item } from '../types/item'
import bcrypt from 'bcrypt'

class ItemModel {
  private items: Item[] = [
    {
      id: '001',
      title: 'Harry Potter and the Sorcerer’s Stone',
      author: 'J. K. Rowling',
      publish_year: 1997,
      evaluation: 5,
      img_url: 'https://covers.openlibrary.org/b/id/14815558-L.jpg'
    },
    {
      id: '002',
      title: 'Harry Potter and the Chamber of Secrets',
      author: 'J. K. Rowling',
      publish_year: 1998,
      evaluation: 5,
      img_url: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1474169725i/15881.jpg'
    },
    {
      id: '003',
      title: 'Harry Potter and the Prisoner of Azkaban',
      author: 'J. K. Rowling',
      publish_year: 1999,
      evaluation: 5,
      img_url: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1630547330i/5.jpg'
    },
    {
      id: '004',
      title: 'Harry Potter and the Goblet of Fire',
      author: 'J. K. Rowling',
      publish_year: 2000,
      evaluation: 5,
      img_url: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1627044952i/58613424.jpg'
    },
    {
      id: '005',
      title: 'Harry Potter and the Order of the Phoenix',
      author: 'J. K. Rowling',
      publish_year: 2003,
      evaluation: 5,
      img_url: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1627045351i/58613451.jpg'
    },
    {
      id: '006',
      title: 'Harry Potter and the Half-Blood Prince',
      author: 'J. K. Rowling',
      publish_year: 2005,
      evaluation: 5,
      img_url: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1627043894i/58613345.jpg'
    },
    {
      id: '007',
      title: 'Harry Potter and the Deathly Hallows',
      author: 'J. K. Rowling',
      publish_year: 2007,
      evaluation: 5,
      img_url: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1627042661i/58613224.jpg'
    }
  ]

  findAll() {
    return this.items
  }

  findById(id: string) {
    const item = this.items.find(u => u.id === id)
    if (!item) return null
    return item
  }

  findByTitle(title: string) {
    const item = this.items.find(u => u.title === title)
    if (!item) return null
    return item
  }

  async create(newItem: Omit<Item, 'id'>) {
    const { title, author, publish_year, evaluation, img_url } = newItem
    const foundIndex = this.items.findIndex(u => u.title === title)
    if (foundIndex !== -1) return false
    const item = {
      id: uuidv4(),
      title,
      author: author,
      publish_year: publish_year,
      evaluation: evaluation,
      img_url: img_url
    }
    this.items.push(item)
    return item
  }

  async editItemById(id: string, updates: Partial<Item>) {
    const foundIndex = this.items.findIndex(u => u.id === id)
    if (foundIndex === -1) return false
    const updatedItem: Item = {
      ...this.items[foundIndex],
      title: updates.title ?? this.items[foundIndex].title,
      author: updates.author ?? this.items[foundIndex].author,
      publish_year: updates.publish_year ?? this.items[foundIndex].publish_year,
      img_url: updates.img_url ?? this.items[foundIndex].img_url,
      evaluation: updates.evaluation ?? this.items[foundIndex].evaluation
    }
    this.items[foundIndex] = updatedItem
    return updatedItem
  }

  removeItemById(id: string) {
    const foundIndex = this.items.findIndex(u => u.id === id)
    if (foundIndex === -1) return false
    this.items.splice(foundIndex, 1)
    return true
  }

}

export default new ItemModel