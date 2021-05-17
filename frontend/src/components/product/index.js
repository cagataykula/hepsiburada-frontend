import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
	addBasket,
  selectBasket
} from '../../store/products/productSlice'

import './style.scss'

export const Product = ({name, price, oldPrice, discountRatio, productImage, id}) => {
  const dispatch = useDispatch()
  const basket = useSelector(selectBasket)
  const basketIds = basket.map((i) => i.id);
  return (
    <div className="product-wrapper">
      <div className="product-image">
        <img src={productImage} alt="" />
      </div>
      <div className="product-information">
        <div className="product-title">
          {name}
        </div>
        <div className="product-brand"><strong>Marka:</strong> Apple</div>
        <div className="product-color"><strong>Renk:</strong> Siyah</div>
        <div className="product-price">
          {price} TL
          <div>
            <span className="old-price">{oldPrice && `${oldPrice} TL`}</span>
            <span className="discount-ratio">{discountRatio && `${discountRatio}%`}</span>
          </div>
        </div>
        {!basketIds.includes(id) ? (
          <div className="add-to-basket" onClick={() => dispatch(addBasket(id))}>
            Sepete Ekle
          </div>
        ): (
          <div className="add-to-basket disabled">
            Bu ürünü sepete ekleyemezsiniz
          </div>
        )}
      </div>
    </div>
  )
}