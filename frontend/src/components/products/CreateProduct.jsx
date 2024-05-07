import React, { useState } from 'react'
import axios from 'axios'
import { Input, Textarea, Button } from '@nextui-org/react'
import { useAuth } from '../../contexts/authContext'
import { useNavigate } from 'react-router-dom'

const CreateProduct = () => {
  const [productData, setProductData] = useState({
    name: '',
    description: '',
    price: ''
  })
  const [loading, setLoading] = useState(false)
  const { state } = useAuth()
  const navigate = useNavigate()
  const token = state.jwt
  const [image, setImage] = useState(null)

  const handleImageChange = (e) => {
    setImage(e.target.files[0])
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setProductData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData()
    formData.append('files.images', image)
    formData.append('data', JSON.stringify(productData))

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/products`, formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      console.log(response.data)
      navigate('/')
    } catch (error) {
      console.error('Erreur lors de la création du produit:', error)
      if (error.response) {
        console.log(error.response.data)
        console.log(error.response.status)
        console.log(error.response.headers)
      } else if (error.request) {
        console.log(error.request)
      } else {
        console.log('Error', error.message)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-4 p-4 max-w-md mx-auto'>
      <Input
        clearable
        bordered
        fullWidth
        color='primary'
        size='lg'
        placeholder='Nom du produit'
        value={productData.name}
        onChange={handleChange}
        name='name'
      />
      <Textarea
        bordered
        fullWidth
        color='primary'
        size='lg'
        placeholder='Description du produit'
        value={productData.description}
        onChange={handleChange}
        name='description'
      />
      <Input
        clearable
        bordered
        fullWidth
        color='primary'
        size='lg'
        placeholder='Prix du produit'
        value={productData.price}
        onChange={handleChange}
        name='price'
        type='number'
      />
      <Input
        type='file'
        onChange={handleImageChange}
        name='file'
      />
      <Button type='submit' color='primary' size='lg' className='mt-4' disabled={loading}>
        {loading ? 'Création en cours...' : 'Créer le produit'}
      </Button>
    </form>
  )
}

export default CreateProduct
