import { Link } from 'react-router-dom'
import { products } from '../data'
import { useDocumentMeta } from '../useDocumentMeta'

const TITLE = 'Vélos électriques et trottinettes en ville | CycloShop'
const DESCRIPTION =
  "CycloShop : vélos électriques pliables, trottinettes tout-terrain et casques connectés pour rouler en ville toute l'année."

export default function Home() {
  // Remet les meta de l'accueil quand on revient d'une fiche produit
  useDocumentMeta({
    title: TITLE,
    description: DESCRIPTION,
    ogTitle: TITLE,
    ogDescription: DESCRIPTION,
  })

  return (
    <div className="page">
      <h1>CycloShop</h1>
      <ul>
        {products.map((p) => (
          <li key={p.id}><Link to={`/produits/${p.slug}`}>{p.name}</Link></li>
        ))}
      </ul>
    </div>
  )
}
