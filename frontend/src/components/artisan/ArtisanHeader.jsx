import PropTypes from 'prop-types'
import { Link } from 'react-router-dom' // Importez Link

function ArtisanHeader ({ attributes }) {
  const imgUrl = process.env.REACT_APP_IMAGES_URL + attributes.profilePicture?.data?.attributes?.url

  return (
    <div className='flex flex-col lg:flex-row gap-4 py-8 px-16 justify-center items-start'>
      <div className='flex flex-col'>
        <img src={imgUrl} className='rounded-lg' alt={attributes.name} />
      </div>
      <div className='flex flex-col text-left gap-6 pt-2'>
        <h1 className='font-bold text-4xl'>{attributes.name}</h1>
        <p>{attributes.description}</p>
        {/* Ajoutez le bouton ici */}
        <Link to='/create-product' className='mt-4 inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600'>
          Ajouter un produit
        </Link>
      </div>
    </div>
  )
}

ArtisanHeader.propTypes = {
  attributes: PropTypes.object
}

export default ArtisanHeader
