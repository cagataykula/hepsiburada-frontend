# Hepsiburada Search Page

This is a test case for Hepsitech.

![screencapture-localhost-3005-2021-05-17-23_51_09](https://user-images.githubusercontent.com/36194319/118554975-cc7b9680-b76a-11eb-87ab-79b294cbd191.png)


## Summary

I know Vue.js and i could made this case easiliy with Vue.js but i wanted to try myself in React.js. Because of that i used React.js for Frontend. I used Express.js for backend. I couldnt figured out how i'm gonna do filters for page. Firstly i tried to manage filters from backend but i thought it would take time. Right now, backend is only providing mock data for frontend with search by keyword feature. All filters is managing by frontend.

I didnt used any css library. Page is not responsive. But if we check hepsiburada.com it's not responsive too. It is preparing and providing page by client's screen resolution.


# Run Project


Write `docker-compose up` in terminal. Frontend and backend will run thanks to docker.

Check this out in the browser: http://localhost:3005. You'll see frontend.

## Tests

Once i wrote test in a project. I wanted to write for this project but i couldn't have time. So i didn't write any tests.

## Mock Data

I tried to scrape hepsiburada.com but its detecting that. Then i saw Jquery in hepsiburada. Then i wrote a script for scrape data in the browser. You can go https://www.hepsiburada.com/ara?q=iphone and execute below script in the browser's console.

```
const data = []
const products = $('.product-detail')
for (let i = 0; i < products.length; i++) {
  const product = products[i];
  const productTitle = $(product).find('.product-title > div > p > span').html()
  const productPrice = $(product).find('.product-price').html()
  const productOldPrice = $(product).find('.product-old-price').html()
  const discountRatio = $(product).find('.discount-badge > span').html()
  const productImage = $($(product).parent().children('.product-image-wrapper').find('.product-image')[0]).attr('data-src')
  
  data.push({
    title: productTitle,
    price: productPrice,
    oldPrice: productOldPrice || null,
    discountRatio: discountRatio || null,
    productImage: productImage
  })
}

var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data));
var dlAnchorElem = document.createElement('a');
dlAnchorElem.setAttribute("href",     dataStr     );
dlAnchorElem.setAttribute("download", "data.json");
dlAnchorElem.click();
```