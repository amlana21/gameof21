const express=require('express')
const gameRouter=require('../src/routes/game.js')
const path=require('path')
const app=express()
const port=3000||process.env.PORT
const publicPath=path.join(__dirname,'../public')
// console.log(publicPath)
app.use(express.json())
app.use(express.static(publicPath))
app.use(gameRouter)


app.listen(port,()=>{
    console.log(`Server started at ${port}`)
})