import React, { useEffect, useState } from 'react'
import { Product } from '../../components/product'
import { Filter } from '../../components/filter'
import { Select } from '../../components/select'
import { useSelector, useDispatch } from 'react-redux'
import {
	// decrement,
	// increment,
	// incrementByAmount,
	// incrementAsync,
	// incrementIfOdd,
	getProductsAsync,
	selectData,
	selectActiveColor,
	selectPage,
	setPage,
	selectActiveBrand,
	selectSort,
	setSort,
	selectQuery
} from '../../store/products/productSlice'
import './style.scss'

export const Search = () => {
	const data = useSelector(selectData)
	const activeColor = useSelector(selectActiveColor)
	const activeBrand = useSelector(selectActiveBrand)
	const sort = useSelector(selectSort)
	const query = useSelector(selectQuery)
	const page = useSelector(selectPage)
	const dispatch = useDispatch()
	const [filteredData, setFilteredData] = useState(data)

	useEffect(() => {
		let filtered = data
		if (activeColor && activeColor !== '') {
			filtered = filtered.filter((e) => e.color === activeColor)
		}
		if (activeBrand && activeBrand !== '') {
			filtered = filtered.filter((e) => e.brand === activeBrand)
		}
		if (sort === 'desc') {
			filtered = filtered
				?.slice()
				.sort(
					(a, b) =>
						parseFloat(b.price.replace('.', '').replace(',', '.')) -
						parseFloat(a.price.replace('.', '').replace(',', '.'))
				)
		} else {
			//asc
			filtered = filtered
				?.slice()
				.sort(
					(a, b) =>
						parseFloat(a.price.replace('.', '').replace(',', '.')) -
						parseFloat(b.price.replace('.', '').replace(',', '.'))
				)
		}
		setFilteredData(filtered)
	}, [activeColor, activeBrand, data, page, sort])

	useEffect(() => {
		dispatch(getProductsAsync())
	}, [dispatch])

	useEffect(() => {
		setFilteredData(data)
	}, [data])

	return (
		<div className='container'>
			<div className='layout-header'>
				<div className='page-title'>
					<h1>Ürünler</h1>
					<h3 className='subtitle'>
						{
							query.length >= 2 ? (
								<span>Aranan Kelime: {query}</span>
							) : ''
						}
					</h3>
				</div>
				<div className='order-filter-wrapper'>
					{
						<Select
							placeholder='Sıralama'
							options={[
								{ value: 'asc', name: 'En Düşük Fiyat' },
								{ value: 'desc', name: 'En Yüksek Fiyat' }
							]}
							selectedValue={sort}
							onChange={(e) => dispatch(setSort(e.target.value))}
						/>
					}
				</div>
			</div>
			<div className='layout-content'>
				<div className='search-filters'>{filteredData?.length ? <Filter /> : null}</div>
				<div className='search-results'>
					{filteredData?.slice((page - 1) * 12, 12 * page)?.map((i, index) => {
						return (
							<Product
								key={index}
								id={i.id}
								name={i.title}
								price={i.price}
								oldPrice={i.oldPrice}
								discountRatio={i.discountRatio}
								productImage={i.productImage}
							/>
						)
					})}
					<div style={{ width: '100%' }}>
						<ul className='pages'>
							{filteredData?.length
								? [...Array(Math.ceil(filteredData?.length / 12))].map(
										(p, index) => {
											return (
												<li
													className={index + 1 === page ? 'active' : ''}
													onClick={() => dispatch(setPage(index + 1))}
													key={index}>
													{index + 1}
												</li>
											)
										}
								  )
								: null}
						</ul>
					</div>
				</div>
			</div>
		</div>
	)
}
