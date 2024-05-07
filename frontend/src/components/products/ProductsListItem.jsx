import { Card, CardBody, CardFooter, CardHeader, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from '@nextui-org/react'
import PropTypes from 'prop-types'
import ArtisanAvatar from '../ArtisanAvatar'
import axios from 'axios'
import { useAuth } from '../../contexts/authContext'
import { useNavigate } from 'react-router-dom'
import { usePanier, actionTypes } from '../panier/ContextPanier'

function ProductsListItem ({ product }) {
  const { dispatch } = usePanier()
  const addPanier = () => {
    dispatch({
      type: actionTypes.ADD_ITEM_TO_PANIER,
      data: product.attributes
    })
  }
  const navigate = useNavigate()
  const { state } = useAuth()
  const token = state.jwt
  const { name, description, price, images, artisan } = product.attributes
  const id = product.id
  const imgUrl = images?.data?.length > 0 ? `${process.env.REACT_APP_IMAGES_URL}${images.data[0].attributes.url}` : 'default-image-url'

  const handleDelete = async () => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      window.alert('Produit supprimé avec succès')
      window.location.reload()
    } catch (error) {
      console.error('Erreur lors de la suppression du produit:', error)
    }
  }

  return (
    <Card className='max-w-[400px] min-h-[600px] flex flex-col flex-grow'>
      <CardHeader className='p-0'>
        <img src={imgUrl} alt={name} />
      </CardHeader>
      <CardBody className='flex flex-col gap-4 justify-between'>
        <h3 className='font-semibold text-xl'>{name}</h3>
        <p>{description}</p>
      </CardBody>
      <CardFooter className='flex flex-row justify-between items-center'>
        {artisan && artisan.data && artisan.data.attributes && artisan.data.attributes.profilePicture && <ArtisanAvatar artisan={artisan} />}
        <div className='flex-grow w-2/6'>
          <p className='text-xl font-semibold'>{price} €</p>
        </div>
        <Dropdown className='w-2/6'>
          <DropdownTrigger>
            <Button variant='bordered'>
              Actions
            </Button>
          </DropdownTrigger>
          <DropdownMenu aria-label='Actions'>
            <DropdownItem key='edit' onClick={() => navigate(`/update-product/${id}`)}>Modifier</DropdownItem>
            <DropdownItem key='delete' className='text-danger' color='danger' onClick={handleDelete}>Supprimer</DropdownItem>
            <DropdownItem key='add' onClick={addPanier}>Ajouter au panier</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </CardFooter>
    </Card>
  )
}

ProductsListItem.propTypes = {
  product: PropTypes.object.isRequired
}

export default ProductsListItem
