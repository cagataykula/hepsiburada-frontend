import axios from 'axios';

export function getProducts({q = '', sort = 'asc', page = 1}) {
  return new Promise((resolve) => {
    axios.get(`http://localhost:3000/search?q=${q}`).then((res) => {
      resolve(res.data)
      return res.data
    })
  })
}