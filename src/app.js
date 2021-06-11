const { response, request } = require('express')
const express = require('express')
const fetch = require('node-fetch')
const mongodb = require('mongodb')
const cors = require('cors')
const MongoClient = mongodb.MongoClient



const connectionURL = "mongodb://localhost:27017"
const databaseName = "task-manager"
const databaseEmpresa = "website-empresa"
const app = express()
app.use(express.json(),cors()); //middleware



const port = 3001

var list = []
var aux = ""


////////////////////////////////////////////////////////////////////////////////////////////////

app.get('/', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Credentials', true)
  res.send("Welcome")
})



app.get('/list', async (req, res) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Credentials', true)

    
    let emails = await getEmails()
    //console.log("->" + emails)
    res.send(emails)
})

//post method to add data to array
//tested by postman only
app.post('/add', (req,res) => {

  console.log(req.body)
  let user = req.body.user
  let message = req.body.message

  insertEmail(user,message)
  res.send("Success")
})



app.get('/cats' ,  async (req,res) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Credentials', true)


    const api_url = "https://cat-fact.herokuapp.com/facts";
    const fetch_response =  await fetch(api_url);
    const json =  await fetch_response.json();
    res.send(json)
    
})





////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


function findOneUser(){
  MongoClient.connect(connectionURL,{useNewUrlParser:true,useUnifiedTopology: true},(error,client) => {
    if(error){
        return console.log("Unable to connect to db")
    }
  
    const db = client.db(databaseName)
  
  
    db.collection('users').findOne({
      name: "tiago",
      age:13
    }, (err,result) => {
      console.log(result)
    })
  
  })
}


function insertEmail(username,message){
  MongoClient.connect(connectionURL,{useNewUrlParser:true,useUnifiedTopology: true},(error,client) => {
    if(error){
        return console.log("Unable to connect to db")
    }
  
    const db = client.db(databaseEmpresa)

    db.collection('emails').insertOne({
      content : message,
      user : {
        name : username,
        email : username + "@.com"
      }
    })

    console.log("Added to database mail : " + message + "of" + username )
  
  })
}



  async function getEmails(){
  let client = await MongoClient.connect(connectionURL,
    {useNewUrlParser:true,useUnifiedTopology: true});

  let db = client.db(databaseEmpresa);
  try {
      return db.collection('emails').find({}).toArray()
  }
  catch(e){
    console.log(e)
  }
}


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})