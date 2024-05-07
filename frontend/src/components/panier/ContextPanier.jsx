import React, { useEffect } from 'react'

const PanierContext = React.createContext()

const actionTypes = {
  ADD_ITEM_TO_PANIER: 'ADD_ITEM_TO_PANIER',
  REMOVE_ITEM_FROM_PANIER: 'REMOVE_ITEM_FROM_PANIER',
  RESET_PANIER: 'RESET_PANIER'
}

const initialState = JSON.parse(window.localStorage.getItem('PANIER')) || {
  panier: [],
  total: 0
}

const PanierReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.ADD_ITEM_TO_PANIER:
      const existingItem = state.panier.find(item => item.dish.name === action.data.name)
      if (existingItem) {
        return {
          ...state,
          panier: state.panier.map(panierItem => {
            if (panierItem.dish.name === action.data.name) {
              return { ...panierItem, quantity: panierItem.quantity + 1 }
            } else {
              return panierItem
            }
          }),
          total: state.total + action.data.price
        }
      } else {
        return {
          ...state,
          panier: state.panier.concat([{ dish: action.data, quantity: 1 }]),
          total: state.total + action.data.price
        }
      }

    case actionTypes.REMOVE_ITEM_FROM_PANIER:
      const itemToRemove = state.panier.find(item => item.dish.name === action.data.dish.name)
      if (itemToRemove) {
        if (itemToRemove.quantity === 1) {
          return {
            ...state,
            panier: state.panier.filter(item => item.dish.name !== action.data.dish.name),
            total: state.total - itemToRemove.dish.price
          }
        } else {
          return {
            ...state,
            panier: state.panier.map(item => {
              if (item.dish.name === action.data.dish.name) {
                return { ...item, quantity: item.quantity - 1 }
              } else {
                return item
              }
            }),
            total: state.total - itemToRemove.dish.price
          }
        }
      } else {
        return state
      }

    case actionTypes.RESET_PANIER:
      window.localStorage.removeItem('PANIER')
      return { panier: [], total: 0 }

    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}

const PanierProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(PanierReducer, initialState)

  useEffect(() => {
    window.localStorage.setItem('PANIER', JSON.stringify(state))
  }, [state])

  return (
    <PanierContext.Provider value={{ state, dispatch }}>
      {children}
    </PanierContext.Provider>
  )
}

const usePanier = () => {
  const context = React.useContext(PanierContext)
  if (!context) {
    throw new Error('usePanier must be used inside a PanierProvider')
  }
  return context
}

export {
  PanierProvider,
  usePanier,
  actionTypes
}
