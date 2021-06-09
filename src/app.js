const { response } = require('express')
const express = require('express')
const request = require('request')
const fetch = require('node-fetch');
const app = express()
app.use(express.json()); //middleware 


const port = 3001

var list = []
var aux = ""


////////////////////////////////////////////////////////////////////////////////////////////////

app.get('/', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Credentials', true)
  res.send(list[0])
})



app.get('/all_items', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Credentials', true)
    res.send({
        string:"ola",
        numero : 2
    })
})



app.get('/cats' ,  async (req,res) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Credentials', true)


    const api_url = "https://cat-fact.herokuapp.com/facts";
    const fetch_response =  await fetch(api_url);
    const json =  await fetch_response.json();
    res.send(json)
    
})


//post method to add data to array
//tested by postman only
app.post('/add', (req,res) => {

    console.log(req.body)

    aux = String(req.body)

    res.send(aux)
})

      
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})