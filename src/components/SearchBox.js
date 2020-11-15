import React, { useState } from 'react'
import SearchIcon from '../img/magnify.png'
import './SearchBox.css'

const SearchBox = ({ setQuery, setPage }) => {
  const [showHistory, setShowHistory] = useState(false)
  const [historyList, setHistoryList] = useState(() => {
    try {
      const item = window.localStorage.getItem('history')
      return item ? JSON.parse(item) : []
    } catch {
      return []
    }
  })

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      document.getElementById('query').blur()
      handleSearch()
    }
  }

  const handleSearch = () => {
    const q = document.getElementById('query').value
    setQuery(q)
    setPage(1)

    if (q) {
      try {
        const item = window.localStorage.getItem('history')
        let arr = item ? JSON.parse(item) : []
        arr = arr.filter((e) => e !== q)
        arr = [q, ...arr].slice(0, 5)
        window.localStorage.setItem('history', JSON.stringify(arr))
        setHistoryList(arr)
      } catch {
        window.localStorage.setItem('history', JSON.stringify([q]))
        setHistoryList([q])
      }
    }
  }

  const historySelect = (e) => {
    document.getElementById('query').value = e.target.innerText
    handleSearch()
  }

  return (
    <div className='search'>
      <div className='search__box'>
        <input
          id='query'
          className='search__input'
          type='text'
          placeholder='Search species...'
          onKeyDown={handleKeyDown}
          onFocus={() => setShowHistory(true)}
          onBlur={() =>
            setTimeout(() => {
              setShowHistory(false)
            }, 200)
          }
        />
        <img
          className='search__icon'
          src={SearchIcon}
          alt='Search'
          onClick={handleSearch}
        />
        <div className={showHistory ? 'history show' : 'history'}>
          {historyList.map((item, index) => {
            return (
              <div
                className='history__item'
                key={index}
                onClick={historySelect}
              >
                {item}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default SearchBox
