import { useSearchParams } from 'react-router-dom'
import { products } from '../data'
import { useDocumentMeta } from '../useDocumentMeta'

export default function Catalogue() {
  // ?tri=prix et ?tri=prix-asc affichent la même liste : une seule URL de référence
  useDocumentMeta({
    title: 'Nos produits triés par prix | CycloShop',
    description: 'Vélos électriques, trottinettes et casques connectés CycloShop, triés par prix.',
    canonical: 'https://cycloshop.exemple.fr/produits?tri=prix',
  })

  const [params] = useSearchParams()
  const tri = params.get('tri')

  const sorted = tri === 'prix' || tri === 'prix-asc'
    ? [...products].sort((a, b) => a.price - b.price)
    : products

  return (
    <div className="page">
      <h1>Nos produits</h1>
      <ul>
        {sorted.map((p) => (
          <li key={p.id}>{p.name} - {p.price} €</li>
        ))}
      </ul>
    </div>
  )
}
