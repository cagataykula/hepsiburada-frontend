import React from 'react';
import './style.scss'

export const Select = ({placeholder, options, onChange, selectedValue=""}) => {
  return(
    <div className="select-wrapper">
      <select value={selectedValue} onChange={onChange}>
        <option value="" disabled>{placeholder}</option>
        {
          options.map((e,i) => {
            return (
              <option key={i} value={e.value}>{e.name}</option>
            )
          })
        }
      </select>
    </div>
  )
}