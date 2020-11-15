import React from 'react'
import './SpeciesDetail.css'

const SpeciesDetail = ({ species, setSpecies }) => {
  return species.name ? (
    <div className='overlay' onClick={() => setSpecies({})}>
      <div className='detail'>
        <h3 className='detail__title'>Species Detail</h3>
        <div className='detail__item'>
          <h4 className='detail__subtitle'>Name</h4>
          <span className='detail__content'>{species.name}</span>
        </div>
        <div className='detail__item'>
          <h4 className='detail__subtitle'>Classification</h4>
          <span className='detail__content'>{species.classification}</span>
        </div>
        <div className='detail__item'>
          <h4 className='detail__subtitle'>Designation</h4>
          <span className='detail__content'>{species.designation}</span>
        </div>
        <div className='detail__item'>
          <h4 className='detail__subtitle'>Average Height</h4>
          <span className='detail__content'>{species.average_height}</span>
        </div>
        <div className='detail__item'>
          <h4 className='detail__subtitle'>Skin Colors</h4>
          <span className='detail__content'>{species.skin_colors}</span>
        </div>
        <div className='detail__item'>
          <h4 className='detail__subtitle'>Eye Colors</h4>
          <span className='detail__content'>{species.eye_colors}</span>
        </div>
        <div className='detail__item'>
          <h4 className='detail__subtitle'>Average Lifespan</h4>
          <span className='detail__content'>{species.average_lifespan}</span>
        </div>
        <div className='detail__item'>
          <h4 className='detail__subtitle'>Language</h4>
          <span className='detail__content'>{species.language}</span>
        </div>
      </div>
    </div>
  ) : (
    <></>
  )
}

export default SpeciesDetail
