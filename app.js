const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')
const port = process.env.PORT || 5000

app.use(morgan('dev'))
app.use(bodyParser.json())

// creat your own middleware below
app.use( req, res , next ) => {
  console.log('This is where you could create your own middleware code');
  next() //next will move the applicaiton onto the next function
}
// Create a GET /ping route that responds with status code 200 and { message: 'pong!' }

app.get('/ping', function( req, res ) {
  // res.send({ status: '200', message: 'pong!'})
  res.status(200).send({ message: 'pong!' })
  //200 is default response so don't need to define status of 200
  //res.json is not necessary

})
//  Create a catch-all route that will respond with a 404 and { message: 'Route not found' } if a non-existent route is requested

app.use((req, res, next) => {
  const status = 404
  const message = `Could not ${req.method} ${req.url}`
  next({ status, message })
  // next({status: 404, message:'Route Not Found'})
})
//  Create an error handler route that will respond with a 500 and { message: 'Something went wrong' } if an error occurs
app.use(function( err, req, res, next ){
  const errorMessage = {}
  errorMessage.status = err.status || 500
  errorMessage.message = err.message || 'Something went wrong'
  if(process.env.NODE_ENV !== 'production'){
    errorMessage.stack = err.stack
  }
  res.status(errorMessage.status).send(errorMessage)

})
//  Create a .gitignore that ignores node_modules/ and any other files you would like to ignore






const listener = () => `Listening on port ${port}!`
app.listen(port, listener)
