import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faArrowLeft, faArrowDown } from '@fortawesome/free-solid-svg-icons'
import './buttons.scss';

const ButtonsComponent = ({ onHandleClick, rowId }) => {
  return (
    <div className="display__aligners-container">
      <button className="display__alignment-button" type="button" id="flex-start" onClick={() => onHandleClick('initial', rowId)}>
        <FontAwesomeIcon icon={faArrowLeft} />
      </button>
      <button className="display__alignment-button" type="button" id="center" onClick={() => onHandleClick('normal', rowId)}>
        <FontAwesomeIcon icon={faArrowDown} />
      </button>
      <button className="display__alignment-button" type="button" id="flex-end" onClick={() => onHandleClick('last', rowId)}>
        <FontAwesomeIcon icon={faArrowRight} />
      </button>
    </div>
  )
}

export default ButtonsComponent;