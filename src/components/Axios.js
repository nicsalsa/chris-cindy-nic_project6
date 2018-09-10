import axios from 'axios';

const lcboKey = 'MDpmMWMxNGM4YS1iMDdiLTExZTgtODgyYS03YjUxYzY1ZTJlY2Q6OG4xbGtNQ2RpcFBkWUp0UUJ4UFpPaFMxUE16emxSbklxdFd3';
const yumKey = 'db789c67a38e847449cc1295f3a4e25d';
// const yumKey2 = '154e73a574c99a4099afd1db03d57738';
const yumId = '1c7ea655';

export function getCocktails(alcohol) {
    return axios({
    method: 'GET',
      url: 'http://api.yummly.com/v1/api/recipes',
    dataResponse: 'json',
    params: {
      _app_id: yumId,
      _app_key: yumKey,
      requirePictures: true,
      allowedIngredient: ['coffee', alcohol],
      allowedCourse: ['course^course-Cocktails']
    }
  })
    .then(function (res) {
      const cocktails = res.data.matches;
      const filteredCocktails = cocktails.filter((cocktail) => {
        return !cocktail.recipeName.includes("Homemade") 
        && cocktail.sourceDisplayName !== 'Vegan Gretchen'
        && !cocktail.recipeName.includes("Ham");
      })
      return filteredCocktails;
    });
  }
  
  export function getRecipe(cocktail) {
    return axios({
      method: 'GET',
      url: `http://api.yummly.com/v1/api/recipe/${cocktail}`,
      dataResponse: 'json',
      params: {
        _app_id: yumId,
        _app_key: yumKey
      }
    }).then(function(res) {
      return res;
  });
}

export function getAlcohol(alcohol, page = 1) {
  return axios({
    method: 'GET',
    url: 'https://lcboapi.com/products',
    dataResponse: 'json',
    params: {
      q: alcohol,
      per_page: 25,
      order: 'regular_price_in_cents.asc',
      page: page
    },
    headers: {
      Authorization: `Token token=${lcboKey}`
    }
  })
}

