import React, { useState, useEffect } from 'react'
import './App.css'
import SearchBox from './components/SearchBox'
import SpeciesList from './components/SpeciesList'
import SpeciesDetail from './components/SpeciesDetail'
import SWLogo from './img/starwars.webp'

function App() {
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const [speciesItems, setSpeciesItems] = useState([])
  const [species, setSpecies] = useState({})
  const [hasMore, setHasMore] = useState(false)
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)

  useEffect(() => {
    setSpeciesItems([])
  }, [query])

  useEffect(() => {
    setLoading(true)
    setError(null)
    fetch(`https://swapi.dev/api/species/?search=${query}&page=${page}`)
      .then((res) => res.json())
      .then(
        (result) => {
          setSpeciesItems((prevItems) => {
            return [...prevItems, ...result.results]
          })
          setHasMore(result.next)
          setLoading(false)
        },
        (error) => {
          setLoading(false)
          setError(error)
        }
      )
  }, [query, page])

  return (
    <div className='App'>
      <img src={SWLogo} alt='Star Wars Logo' height='120' />
      <h1 className='app-title'>Species List</h1>
      <SearchBox setQuery={setQuery} setPage={setPage} />
      <SpeciesList
        error={error}
        loading={loading}
        hasMore={hasMore}
        speciesItems={speciesItems}
        setPage={setPage}
        setSpecies={setSpecies}
      />
      <SpeciesDetail species={species} setSpecies={setSpecies} />
    </div>
  )
}

export default App
