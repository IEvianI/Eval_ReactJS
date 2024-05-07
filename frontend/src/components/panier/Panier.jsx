import React from 'react'
import { usePanier, actionTypes } from './ContextPanier.jsx'

function Panier () {
  const { state: { panier, total }, dispatch } = usePanier()

  const removeItem = (item) => {
    dispatch({ type: actionTypes.REMOVE_ITEM_FROM_PANIER, data: item })
  }
  const resetPanier = () => {
    dispatch({ type: actionTypes.RESET_PANIER })
  }
    return (
      <div className='max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl'>
        <h1 className='text-2xl font-bold p-6'>Panier</h1>
        <button onClick={resetPanier} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-6'>Réinitialiser le panier</button>
        <ul>
          {panier.map((item, index) => (
            <li key={index} className='border-b border-gray-200 p-4'>
              <p className='text-lg font-semibold'>{item.dish.name}</p>
              <p>Prix: {item.dish.price} €</p>
              <p>Quantité: {item.quantity}</p>
              <button onClick={() => removeItem(item)} className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-2'>Retirer du panier</button>
            </li>))}
        </ul>
        <p className='text-xl font-semibold p-6'>Total: {total} €</p>
      </div>
    )
}

export default Panier
