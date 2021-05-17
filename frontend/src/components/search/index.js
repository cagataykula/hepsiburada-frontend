import React from 'react';
import { useDispatch } from 'react-redux'
import { setQuery, getProductsAsync } from '../../store/products/productSlice'

import './style.scss'

export const Search = () => {
  const dispatch = useDispatch()

  const handleChange = (event) => {
    const { value }  = event.target;
    dispatch(setQuery(value));
    if(value.length >= 2) {
      dispatch(getProductsAsync())
    } else if (value.length === 0) {
      dispatch(getProductsAsync())
    }
  }
  return (
    <div className="search_wrapper">
      <i className="search_icon" />
      <input onChange={handleChange} type="text" className="search" placeholder="25 milyon’dan fazla ürün içerisinde ara" />
    </div>
  )
}