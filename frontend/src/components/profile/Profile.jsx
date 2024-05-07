import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { IoPersonCircleOutline } from 'react-icons/io5'
import UploadAvatar from './UploadAvatar'
import './Profile.css'
import { useAuth } from '../../contexts/authContext'
import { Button, Input } from '@nextui-org/react'
import { useNavigate } from 'react-router-dom'

const Profile = () => {
  const [user, setUser] = useState({})
  const [isUserUpdated, setisUserUpdated] = useState(false)

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')

  const navigate = useNavigate()

  const { state, logout } = useAuth()
  const token = state.jwt

  useEffect(() => {
    const getProfileData = async () => {
      try {
        const { data } = await axios.get('http://localhost:1337/api/users/me', {
          headers: {
            Authorization: `bearer ${token}`
          }
        })
        setUser(data)
        setisUserUpdated(false)
      } catch (error) {
        console.log({ error })
      }
    }
    getProfileData()
  }, [token, isUserUpdated])

  const handleProfileUpdate = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.put(`http://localhost:1337/api/users/${user.id}`, {
        username,
        email
      }, {
        headers: {
          Authorization: `bearer ${token}`
        }
      })
      // Mise à jour réussie
      setUser(data)
      setisUserUpdated(true)
    } catch (error) {
      console.log({ error })
    }
  }

  const handleDeleteUser = async () => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer votre compte? Cette action est irréversible.')) {
      try {
        await axios.delete(`http://localhost:1337/api/users/${user.id}`, {
          headers: {
            Authorization: `bearer ${token}`
          }
        })
        logout()
        navigate('/')
      } catch (error) {
        console.log({ error })
      }
    }
  }

  return (
    <div className='profile'>
      <div className='avatar'>
        <div className='avatar-wrapper'>
          {user.avatarUrl
            ? (
              <img src={`http://localhost:1337${user.avatarUrl}`} alt={`${user.username} avatar`} />
              )
            : (
              <IoPersonCircleOutline />
              )}
          <UploadAvatar
            token={token}
            userId={user.id}
            username={user.username}
            avatarUrl={user.avatarUrl}
            setisUserUpdated={setisUserUpdated}
          />
        </div>
      </div>
      <div className='body'>
        <form onSubmit={handleProfileUpdate}>
          <Input type='text' value={username} onChange={(e) => setUsername(e.target.value)} />
          <Input type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
          <Button color='primary' type='submit'>Mettre à jour</Button>
        </form>
        <p>Pseudo: {user.username}</p>
        <p>Email: {user.email}</p>
        <p>
          Compte créé le: {new Date(user.createdAt).toLocaleDateString()}
        </p>
        <Button color='error' flat onClick={handleDeleteUser}>
          Supprimer le compte
        </Button>
      </div>
    </div>
  )
}

export default Profile
