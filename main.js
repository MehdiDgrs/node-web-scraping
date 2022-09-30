const axios = require('axios');
let fs = require ('fs')



let res = axios({method:'get',url: "https://www.boulanger.com/ref/1147567"}).then((response)=> console.log(response.data))

console.log(res)