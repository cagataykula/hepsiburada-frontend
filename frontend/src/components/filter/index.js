import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
	selectColors,
	setActiveColor,
	selectActiveColor,
	setPage,
	selectBrands,
	selectActiveBrand,
	setActiveBrand,
	setSort,
	selectSort
} from '../../store/products/productSlice'

import './style.scss'

export const Filter = () => {
	const colors = useSelector(selectColors)
	const brands = useSelector(selectBrands)
	const activeColor = useSelector(selectActiveColor)
	const activeBrand = useSelector(selectActiveBrand)
	const sort = useSelector(selectSort)
	const dispatch = useDispatch()

	return (
		<div className='filter-wrapper'>
			<div className='filter'>
				<div className='filter-title'>Renk</div>
				<ul>
					{colors?.length &&
						colors.map((e, index) => {
							return (
								<li
									key={index}
									className={activeColor === e.color ? 'active' : ''}
									onClick={() => {
										dispatch(setActiveColor(e.color))
										dispatch(setPage(1))
									}}>{`${e.color} (${e.count})`}</li>
							)
						})}
				</ul>
			</div>
			<div className='filter'>
				<div className='filter-title'>Marka</div>
				<ul>
					{brands?.length &&
						brands.map((e, index) => {
							return (
								<li
									key={index}
									className={activeBrand === e.brand ? 'active' : ''}
									onClick={() => {
										dispatch(setActiveBrand(e.brand))
										dispatch(setPage(1))
									}}>{`${e.brand} (${e.count})`}</li>
							)
						})}
				</ul>
			</div>
			<div className='filter'>
				<div className='filter-title'>Sıralama</div>
				<ul>
					<li
						onClick={() => {
							dispatch(setSort('asc'))
							dispatch(setPage(1))
						}}
						className={sort === 'asc' ? 'active' : ''}>
						En Düşük Fiyat
					</li>
					<li
						onClick={() => {
							dispatch(setSort('desc'))
							dispatch(setPage(1))
						}}
						className={sort === 'desc' ? 'active' : ''}>
						En Yüksek Fiyat
					</li>
				</ul>
			</div>
		</div>
	)
}
