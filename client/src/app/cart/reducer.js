import { ADD_ITEM, REMOVE_ITEM, CLEAR_ITEMS, SET_USER, LOGOUT_USER } from './constants'

const initialState = {
  guestCart: [],
  userCarts: {}
}

function addOrUpdateItem(cart, item) {
  const existingItem = cart.find((i) => i._id === item._id)
  if (existingItem) {
    return cart.map((i) => (i._id === item._id ? { ...i, qty: i.qty + 1 } : i))
  } else {
    return [...cart, { ...item, qty: 1 }]
  }
}

function removeOrDecreaseItem(cart, itemId) {
  return cart.map((i) => (i._id === itemId ? { ...i, qty: i.qty - 1 } : i)).filter((i) => i.qty > 0)
}

export default function cartReducer(state = initialState, { type, payload }) {
  switch (type) {
    case ADD_ITEM: {
      const { item, userId } = payload
      if (userId) {
        const currentUserCart = state.userCarts[userId] || []
        const updatedUserCart = addOrUpdateItem(currentUserCart, item)
        return {
          ...state,
          userCarts: {
            ...state.userCarts,
            [userId]: updatedUserCart
          }
        }
      } else {
        const updatedGuestCart = addOrUpdateItem(state.guestCart, item)
        return {
          ...state,
          guestCart: updatedGuestCart
        }
      }
    }

    case REMOVE_ITEM: {
      const { item, userId } = payload
      if (userId) {
        const currentUserCart = state.userCarts[userId] || []
        const updatedUserCart = removeOrDecreaseItem(currentUserCart, item._id)
        return {
          ...state,
          userCarts: {
            ...state.userCarts,
            [userId]: updatedUserCart
          }
        }
      } else {
        const updatedGuestCart = removeOrDecreaseItem(state.guestCart, item._id)
        return {
          ...state,
          guestCart: updatedGuestCart
        }
      }
    }

    case CLEAR_ITEMS: {
      const { userId } = payload
      if (userId) {
        return {
          ...state,
          userCarts: {
            ...state.userCarts,
            [userId]: []
          }
        }
      } else {
        return {
          ...state,
          guestCart: []
        }
      }
    }

    case SET_USER: {
      const { userId } = payload
      const mergedCart = addGuestToUserCart(state.guestCart, state.userCarts[userId] || [])
      return {
        ...state,
        guestCart: [],
        userCarts: {
          ...state.userCarts,
          [userId]: mergedCart
        }
      }
    }

    default:
      return state
  }
}

function addGuestToUserCart(guestCart, userCart) {
  let merged = [...userCart]
  guestCart.forEach((item) => {
    merged = addOrUpdateItem(merged, item)
  })
  return merged
}
