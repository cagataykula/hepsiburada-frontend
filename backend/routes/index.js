var express = require('express');
var fs = require('fs');
var router = express.Router();

let DATA = [];

(async () => {
  try {
    const readedFile = await fs.readFileSync('./data.json', {encoding:'utf8'})
    DATA = JSON.parse(readedFile)
  } catch (error) {
    console.log('AN ERROR OCCURED')
  }
})()

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/search', function(req, res, next) {
  let result = DATA.filter((e) => {
    return e.title.toLowerCase().includes(req.query.q.toLowerCase())
  })

  if(req.query.brand) {
    result = result.filter((e) => e.brand == req.query.brand)
  }
  
  const DISTINCT_brands = [...new Set(result.map(item => item.brand))]
  const DISTINCT_colors = [...new Set(result.map(item => item.color))]

  const brands = []
  DISTINCT_brands.forEach((brand) => {
    let count = 0
    result.forEach(element => {
      if(element.brand == brand) {
        count++
      }
    })
    brands.push({brand, count})
  });

  const colors = []
  DISTINCT_colors.forEach((color) => {
    let count = 0
    result.forEach(element => {
      if(element.color == color) {
        count++
      }
    })
    colors.push({color, count})
  });

  

  res.json({
    data: {
      result: result,
      brands,
      colors
    },
    total: result.length,
  });
});

module.exports = router;
