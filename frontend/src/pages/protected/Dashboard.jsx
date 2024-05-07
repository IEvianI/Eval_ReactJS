import { useParams } from 'react-router-dom'
import { useFetch } from '../../hooks/Api'
import ProductsList from '../../components/products/ProductsList'
import { useAuth } from '../../contexts/authContext'
import PropTypes from 'prop-types'
import ArtisansListItem from '../../components/artisans/ArtisansListItem'

function Dashboard ({ artisan }) {
  const { artisanSlug } = useParams()
  const { state: { isLoggedIn, user }, logout } = useAuth()
  const { name } = artisan.attributes

  const { response: artisanResponse, error: artisanError, loading: artisanLoading } =
    useFetch(`/artisans?filters[slug][$eq]=${artisanSlug}&populate=*`)

  const normalizeName = (name) => {
    return name.toLowerCase().replace(/\s+/g, '-')
  }

  console.log(artisanSlug)

  const { response: productsResponse, error: productsError, loading: productsLoading } =
    useFetch(`/products?filters[artisan][slug][$eq]=${artisanSlug}&populate=*`)

  if (artisanLoading || productsLoading) return <h1>Chargement...</h1>

  if (artisanError || productsError) return <pre>{JSON.stringify(artisanError || productsError, null, 2)}</pre>

  const shouldShowProducts = user?.username === normalizedArtisanName

  return (
    <div className='container mx-auto flex flex-col gap-8'>
      {shouldShowProducts && productsResponse
? (
        <ProductsList products={productsResponse.data} />
      )
: (
        <p>Aucun produit trouvé ou vous n'avez pas l'autorisation de voir ces produits.</p>
      )}
    </div>
  )
}

ArtisansListItem.propTypes = {
  artisan: PropTypes.object
}

export default Dashboard
