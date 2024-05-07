import { useState } from 'react'
import { toast } from 'react-toastify'
import { Button, Input, Switch } from '@nextui-org/react'
import { useAuth } from '../../contexts/authContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
function RegisterForm () {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    isPublic: false,
    islienCompte: false
  })
  const navigate = useNavigate()
  const { state: { user, jwt, error, loading }, register } = useAuth()
  const handleChange = (event) => {
    const { name, value, checked } = event.target
    const newValue = name === 'isPublic' ? checked : value
    setFormData({
      ...formData,
      [name]: newValue,
      RoleType: newValue === true ? 'Artisans' : 'Public'
    })
  }
  const handleSubmit = async (event) => {
    try {
      event.preventDefault()
      console.log(formData.RoleType)
      register(formData)
      toast.info(`Formulaire soumis : ${formData.firstName} ${formData.lastName}`)
      navigate('/dashboard')
      // }
    } catch (error) {
      console.error('An error occurred:', error)
    }
  }
  return (
    <form className='form-container' onSubmit={handleSubmit}>
      <Input
        name='lastName'
        label='Nom : '
        placeholder='Entrez votre nom...'
        value={formData.lastName}
        onChange={handleChange}
      />
      <Input
        name='firstName'
        label='Prénom : '
        placeholder='Entrez votre prénom...'
        value={formData.firstName}
        onChange={handleChange}
      />
      <Input
        name='username'
        label="Nom d'utilisateur : "
        placeholder="Entrez votre nom d'utilisateur..."
        value={formData.username}
        onChange={handleChange}
      />
      <Input
        name='email'
        label='Email : '
        placeholder='Entrez votre adresse email...'
        value={formData.email}
        onChange={handleChange}
      />
      <Input
        name='password'
        label='Mot de passe : '
        placeholder='Entrez un mot de passe...'
        value={formData.password}
        onChange={handleChange}
      />
      <label htmlFor='isPublic' className='flex items-center mb-4'>
        <span className='mr-2'>Public ou artisans :</span>
        <Switch
          name='isPublic'
          checked={formData.isPublic}
          onChange={handleChange}
        />
      </label>
      <Button
        isLoading={loading}
        type='submit'
        color='primary'
      >
        S'enregistrer
      </Button>
    </form>
  )
}
export default RegisterForm
