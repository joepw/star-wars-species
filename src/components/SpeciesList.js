import React, { useCallback, useRef } from 'react'
import './SpeciesList.css'

const SpeciesList = ({
  error,
  loading,
  hasMore,
  speciesItems,
  setPage,
  setSpecies,
}) => {
  const observer = useRef()

  const lastItemElementRef = useCallback(
    (node) => {
      if (loading) return
      if ('IntersectionObserver' in window) {
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver((entries) => {
          if (entries[0].isIntersecting && hasMore) {
            setPage((prevPage) => prevPage + 1)
          }
        })
        if (node) observer.current.observe(node)
      }
    },
    [loading, hasMore, setPage]
  )

  return (
    <>
      <div className='species-list'>
        {speciesItems.length
          ? speciesItems.map((item, index) => {
              if (speciesItems.length === index + 1) {
                return (
                  <div
                    ref={lastItemElementRef}
                    className='species'
                    key={index}
                    onClick={() => setSpecies(item)}
                  >
                    <h3 className='species__name'>{item.name}</h3>
                    {item.classification + ', ' + item.designation}
                  </div>
                )
              } else {
                return (
                  <div
                    className='species'
                    key={index}
                    onClick={() => setSpecies(item)}
                  >
                    <h3 className='species__name'>{item.name}</h3>
                    {item.classification + ', ' + item.designation}
                  </div>
                )
              }
            })
          : !loading && 'Not Found'}
      </div>
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error.message}</div>}
    </>
  )
}

export default SpeciesList
