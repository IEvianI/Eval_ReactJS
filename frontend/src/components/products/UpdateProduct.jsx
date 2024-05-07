import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { Input, Textarea, Button } from '@nextui-org/react'
import { useAuth } from '../../contexts/authContext'

const UpdateProduct = () => {
  const [productData, setProductData] = useState({
    name: '',
    description: '',
    price: '',
    image: null
  })
  const navigate = useNavigate()
  const { id } = useParams()
  const { state: { jwt } } = useAuth()

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/products/${id}`, {
          headers: {
            Authorization: `Bearer ${jwt}`
          }
        })
        const { name, description, price, images } = response.data.data.attributes
        setProductData({ name, description, price, images })
      } catch (error) {
        console.error('Erreur lors de la récupération du produit:', error)
      }
    }

    fetchProduct()
  }, [id, jwt])

  const handleChange = (e) => {
    const { name, value } = e.target
    setProductData(prev => ({ ...prev, [name]: value }))
  }

  const handleImageChange = (e) => {
    setProductData(prev => ({ ...prev, image: e.target.files[0] }))
  }

  const uploadImage = async (imageFile) => {
    const formData = new FormData()
    formData.append('files', imageFile)

    try {
      const uploadResponse = await axios.post(`${process.env.REACT_APP_API_URL}/upload`, formData, {
        headers: {
          Authorization: `Bearer ${jwt}`
        }
      })
      return uploadResponse.data[0].id
    } catch (error) {
      console.error('Erreur lors du téléchargement de l\'image:', error)
      return null
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    let imageId = null
    if (productData.image) {
      imageId = await uploadImage(productData.image)
    }

    const productUpdateData = {
      name: productData.name,
      description: productData.description,
      price: productData.price,
      ...(imageId && { images: [imageId] })
    }

    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/products/${id}`, {
        data: productUpdateData
      }, {
        headers: {
          Authorization: `Bearer ${jwt}`
        }
      })

      console.log('Produit mis à jour avec succès')
      navigate('/')
    } catch (error) {
      console.error('Erreur lors de la mise à jour du produit:', error)
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Input
          clearable
          bordered
          placeholder='Nom du produit'
          value={productData.name}
          onChange={handleChange}
          name='name'
        />
        <Textarea
          bordered
          placeholder='Description du produit'
          value={productData.description}
          onChange={handleChange}
          name='description'
        />
        <Input
          clearable
          bordered
          placeholder='Prix du produit'
          value={productData.price}
          onChange={handleChange}
          name='price'
          type='number'
        />
        <input
          type='file'
          onChange={handleImageChange}
          name='image'
        />
        <Button type='submit' color='primary'>Mettre à jour le produit</Button>
      </form>
    </div>
  )
}

export default UpdateProduct
