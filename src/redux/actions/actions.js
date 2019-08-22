import axios from 'axios'; 

export const CREATE = "Add new item";
export const READ = "fetch all items";
export const UPDATE = "update item";
export const DELETE = "delete item";
export const FETCH_ITEMS_BEGIN = "begin fetching items";
export const FETCH_ITEMS_SUCCESS = "Items fetched successfully";
export const FETCH_ITEMS_FAILURE = "Failed to fetch items";

export const createItem = (item) => ({
  type: CREATE,
  payload: { item }
})

export const readItems = () => {
  return (dispatch) => {
    dispatch(fetchItemsBegin());
    return axios.get('/api/customerItems')
      .then(({data}) => {
        dispatch(fetchItemsSuccess(data));
      })
      .catch(error => dispatch(fetchItemsFailure(error)));
  }
}

export const updateItem = (item) => ({
  type: UPDATE,
  payload: { item }
})

export const deleteItem = (id) => ({
  type : DELETE,
  payload : { id }
})

export const fetchItemsBegin = () => ({
    type: FETCH_ITEMS_BEGIN
})
export const fetchItemsSuccess = items => ({
    type: FETCH_ITEMS_SUCCESS,
    payload: { items }
})
export const fetchItemsFailure = errors => ({
    type: FETCH_ITEMS_FAILURE,
    payload: { errors }
})