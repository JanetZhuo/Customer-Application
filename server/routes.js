const { fetchItems, addItem, updateItem, deleteItem } = require('./controller');

const routes = [
  {
    method: 'GET',
    url: '/api/customerItems',
    handler: fetchItems
  },
  {
    method: 'POST',
    url: '/api/customerItems',
    handler: addItem,
  },
  {
    method: 'PUT',
    url: '/api/customerItems/:id',
    handler: updateItem
  },
  {
    method: 'DELETE',
    url: '/api/customerItems/:id',
    handler: deleteItem
  }
]

module.exports = routes