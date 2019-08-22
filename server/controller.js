const { CustomerItem } = require('./models/customerItems');

const fetchItems = async (req, reply) => {
  try {
    const customerItems = await CustomerItem.find();
    return customerItems
  }
  catch (err) { console.log(err) }
}

const addItem = async (req, reply) => {
  try {
    const NewItem = new CustomerItem({ ...req.body });
    return NewItem.save()
  }
  catch (err) { console.log(err) }
}

const updateItem = async (req, reply) => {
  try {
    const { id } = req.params;
    const { item } = req.body;
    const updatedItem = await CustomerItem.findOneAndUpdate({id}, item, { new: true });
    return updatedItem;
  }
  catch (err) { console.log(err) }
}

const deleteItem = async (req, reply) => {
  try {
    const { id } = req.params;
    const customerItem = await CustomerItem.findOneAndDelete({ id });
    return customerItem;
  }
  catch (err) { console.log(err) }
}

module.exports = { fetchItems, addItem, updateItem, deleteItem };