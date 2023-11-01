const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')

if(process.env.OMAGA === 'DEV'){
    dotenv.config({path: './config/.env.dev'})
}
if(process.env.OMAGA === 'PROD'){
    dotenv.config({path: './config/.env.prod'})
}

app.use(express.json())

const modeloUser = mongoose.model('contas', new mongoose.Schema({
    email: String,
    password: String
}))


mongoose.connect('mongodb://127.0.0.1:27017/morango')
 .then(()=>{

app.get('/get/:email', async (req,res)=>{
    const userFound = await modeloUser.findOne({email: req.params.email})
    console.log(userFound);
    res.send(userFound)
})
  
app.post('/post',async (req,res) =>{
    const userCreated = await modeloUser.create({email: req.body.email, password: req.body.password})
    res.send(userCreated)
})

app.put('/put', async (req,res)=>{
    const updatedUser = await modeloUser.findOneAndUpdate({email: req.body.email, password: req.body.password}, {email: req.body.newemail, password: req.body.newpassword})
    res.send({ message: "Seus dados foram atualizados :)" })
})
  
app.delete('/delete', async (req,res)=>{
    const userDeleted = await modeloUser.deleteOne({email: req.body.email, password: req.body.password})
    res.send(userDeleted)
})  

app.use((req,res)=>{
    res.send('Infelizmente, não foi possível encontrar a sua rota! :(')
})

app.listen(2000, ()=>console.log(`O servidor está rodando certinho nessa porta aqui: ${2000}`))

})