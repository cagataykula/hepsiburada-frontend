import React, { useRef } from 'react'
import { useDetectOutsideClick } from '../../helpers/useDetectOutsideClick'
import { useSelector, useDispatch } from 'react-redux'
import {
	selectBasket,
  removeBasket
} from '../../store/products/productSlice'
import './style.scss'

export const Basket = () => {
	const dropdownRef = useRef(null)
	const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false)
	const basket = useSelector(selectBasket)
  const dispatch = useDispatch()
	const onClick = () => setIsActive(!isActive)

	const wrapperRef = useRef(null)
	return (
		<div className='basket_wrapper' ref={wrapperRef}>
			<button
				className={`basket_button ${isActive ? 'basket__detail-open' : ''}`}
				onClick={onClick}>
				Sepetim
        {
          basket?.length ? (
            <span className='basket_item-count'>{basket.length}</span>
          ) : ''
        }
			</button>
      {isActive && (
        <div ref={dropdownRef} className='dropdown'>
         {
           basket?.length ? 
           basket?.map((e, index) => {
             return (
              <div className="dropdown-item" key={index}>
                <div className="item-image">
                  <img className="" src={e.productImage} alt="" />
                </div>
                <div className="item-informations">
                  <div className="item-name">{e.title}</div>
                  <div className="remove-dropdown-item" onClick={() => dispatch(removeBasket(e.id))}>
                    Kaldır
                  </div>
                </div>
              </div>
             )
           }) : (<div className="dropdown-item">Sepetiniz boş</div>)
         } 
        </div>
      )}
		</div>
	)
}
