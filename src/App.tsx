import { useEffect, useState } from 'react'

const HERO = "data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='400'%3E%3Crect width='800' height='400' fill='%231a5fa8'/%3E%3Ctext x='400' y='210' font-size='28' fill='white' text-anchor='middle'%3EVélo électrique pliable%3C/text%3E%3C/svg%3E"

// Mission : ouvre Lighthouse (DevTools → onglet Lighthouse → Performance) et
// corrige les 3 problèmes volontaires ci-dessous.

export default function App() {
  const [showBanner, setShowBanner] = useState(false)
  const [points, setPoints] = useState<number | null>(null)
  const [calcul, setCalcul] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setShowBanner(true), 1200)
    return () => clearTimeout(t)
  }, [])

  // Calcul découpé en tranches de 2M itérations, séparées par un setTimeout(0),
  // pour ne jamais bloquer le thread principal plus de quelques dizaines de ms
  function calculerPoints() {
    const TOTAL = 400_000_000
    const TRANCHE = 2_000_000
    let total = 0
    let i = 0
    setCalcul(true)

    function step() {
      const end = Math.min(i + TRANCHE, TOTAL)
      for (; i < end; i++) total += Math.sqrt(i) % 7
      if (i < TOTAL) {
        setTimeout(step, 0)
      } else {
        setPoints(Math.round(total % 1000))
        setCalcul(false)
      }
    }
    step()
  }

  return (
    <div className="page">
      {/* Toujours dans le flux : sa place est réservée dès le premier rendu,
          il devient juste visible au bout de 1,2 s (aucun décalage) */}
      <div
        className="banner"
        style={{ opacity: showBanner ? 1 : 0 }}
        aria-hidden={!showBanner}
      >
        🎉 Livraison offerte ce week-end !
      </div>

      <h1>CycloShop</h1>

      {/* width/height : le navigateur réserve l'espace avant le chargement */}
      <img
        src={HERO}
        alt="Vélo électrique pliable"
        width={800}
        height={400}
        style={{ aspectRatio: '800 / 400', width: '100%', height: 'auto' }}
      />

      <p>Le vélo électrique pliable le plus vendu de la boutique.</p>

      <button onClick={calculerPoints} disabled={calcul}>
        {calcul ? 'Calcul en cours…' : 'Calculer mes points fidélité'}
      </button>
      {points !== null && <p>Tu as {points} points fidélité.</p>}
    </div>
  )
}
