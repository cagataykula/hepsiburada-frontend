import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getProducts } from './productAPI'

const initialState = {
	value: 0,
	data: [],
	status: 'idle',
	query: '',
	sort: 'asc',
	page: 1,
	activeColor: '',
	activeBrand: '',
	basket: JSON.parse(localStorage.getItem('basket')) || []
}

export const getProductsAsync = createAsyncThunk(
	'products/getProducts',
	async (_, store) => {
		const state = store.getState().products
		const response = await getProducts({
			q: state.query,
			sort: state.sort,
			page: state.page
		})
		return response.data
	}
)

export const productsSlice = createSlice({
	name: 'products',
	initialState,
	reducers: {
		setQuery: (state, action) => {
			state.query = action.payload
		},
		setSort: (state, action) => {
			state.sort = action.payload
		},
		setActiveColor: (state, action) => {
			if (state.activeColor === action.payload) {
				state.activeColor = ''
			} else {
				state.activeColor = action.payload
			}
		},
		setPage: (state, action) => {
			state.page = action.payload
		},
		setActiveBrand: (state, action) => {
			if (state.activeBrand === action.payload) {
				state.activeBrand = ''
			} else {
				state.activeBrand = action.payload
			}
		},
		addBasket: (state, action) => {
			state.basket.push(action.payload)
			localStorage.setItem('basket', JSON.stringify(state.basket))
		},
		removeBasket: (state, action) => {
			state.basket = state.basket.filter((id) => id !== action.payload)
			localStorage.setItem('basket', JSON.stringify(state.basket))
		}
	},
	// The `extraReducers` field lets the slice handle actions defined elsewhere,
	// including actions generated by createAsyncThunk or in other slices.
	extraReducers: (builder) => {
		builder
			.addCase(getProductsAsync.pending, (state) => {
				state.status = 'loading'
			})
			.addCase(getProductsAsync.fulfilled, (state, action) => {
				state.status = 'idle'
				state.data = action.payload
			})
	}
})

export const {
	increment,
	decrement,
	incrementByAmount,
	setQuery,
	setSort,
	setActiveColor,
	setPage,
	setActiveBrand,
	addBasket,
	removeBasket
} = productsSlice.actions

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.products.value)`
export const selectCount = (state) => state.products.value

export const selectQuery = (state) => state.products.query
export const selectData = (state) => state.products.data.result
export const selectColors = (state) => {
	const colors = []
	if (state?.products?.data?.result) {
		const data = state.products.data.result.filter(
			(e) => {
				if(state.products.activeBrand === '') return true
				else return e.brand === state.products.activeBrand
			}
		)
		const DISTINCT_colors = [...new Set(data.map((item) => item.color))]

		DISTINCT_colors.forEach((color) => {
			let count = 0
			data.forEach((element) => {
				if (element.color === color) {
					count++
				}
			})
			colors.push({ color, count })
		})
	}
	return colors
}
export const selectActiveColor = (state) => state.products.activeColor
export const selectBrands = (state) => state.products.data.brands
export const selectActiveBrand = (state) => state.products.activeBrand
export const selectPage = (state) => state.products.page
export const selectSort = (state) => state.products.sort
export const selectBasket = (state) => {
	const basketItems = []
	state.products.basket.forEach((id) => {
		const i = state.products?.data?.result?.find((e) => {
			return e.id === id
		})
		if (i) basketItems.push(i)
	})
	return basketItems
}

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
// export const incrementIfOdd = (amount) => (dispatch, getState) => {
//   const currentValue = selectCount(getState());
//   if (currentValue % 2 === 1) {
//     dispatch(incrementByAmount(amount));
//   }
// };

export default productsSlice.reducer