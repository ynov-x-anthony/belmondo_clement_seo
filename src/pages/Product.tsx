import { useParams } from 'react-router-dom'
import { products } from '../data'
import { useDocumentMeta } from '../useDocumentMeta'

export default function Product() {
  const { slug } = useParams()
  const product = products.find((p) => p.slug === slug)

  // title et og:* propres à chaque produit, mis à jour à chaque changement de route
  useDocumentMeta({
    title: product ? `${product.name} à ${product.price} € | CycloShop` : 'Produit introuvable | CycloShop',
    description: product?.description,
    ogTitle: product ? `${product.name} - CycloShop` : undefined,
    ogDescription: product?.description,
  })

  if (!product) return <p className="page">Produit introuvable.</p>

  return (
    <div className="page">
      <h1>{product.name}</h1>
      <p className="price">{product.price} €</p>
      <p>{product.description}</p>
    </div>
  )
}
