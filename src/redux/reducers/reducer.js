import { CREATE, READ, UPDATE, DELETE } from '../actions/actions';
import { FETCH_ITEMS_BEGIN, FETCH_ITEMS_SUCCESS, FETCH_ITEMS_FAILURE } from '../actions/actions';

const initialState = {
  customerItems : []
}

export default function (state = initialState, action) {
  switch (action.type) {

    case CREATE: return {
      customerItems : [...state.customerItems, action.payload.item]
    };

    case READ: return state;

    case UPDATE :{
      const updatedItem = {...action.payload.item};
      return {
        customerItems : [...state.customerItems].map( item => {
          if(item.id === updatedItem.id){
            return updatedItem
          }
          else return item;
        })
      }
    }

    case DELETE: {
      const {id} = action.payload;
      return {
        customerItems : [...state.customerItems].filter(item => item.id !== id)
      }
    }

    case FETCH_ITEMS_BEGIN: return {
      ...state,
      loading: true,
      errors: null
    }
    case FETCH_ITEMS_SUCCESS: return {
      ...state,
      loading: false,
      customerItems: action.payload.items
    }
    case FETCH_ITEMS_FAILURE: return {
      ...state,
      loading: false,
      errors: action.payload.errors,
      customerItems : []
    }

    default: return state;
  }
}