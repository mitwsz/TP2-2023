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
const modeloPintura = mongoose.model('pinturas', new mongoose.Schema({
    resenhapintura: String,
    _id: mongoose.Types.ObjectId
}))

mongoose.connect('mongodb://127.0.0.1:27017/morango')
 .then(()=>{

app.post('/get/', async (req,res)=>{
    const userFound = await modeloUser.findOne({email: req.body.email, password: req.body.password})
    console.log(userFound);
    if(userFound === null){
       return res.send('Poxa, essa conta não foi encontrada :(')
    }
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

app.post('/getPintura/', async (req,res)=>{
    const userFound = await modeloUser.findOne({email: req.body.email, password: req.body.password})
    if (!userFound) return;
    const pinturaFound = await modeloPintura.findOne({resenhapintura: req.body.resenhapintura, _id: userFound.id})
     if(pinturaFound === null){
       return res.send('Poxa, essa pintura não foi encontrada :(')
    }
    res.send(pinturaFound)
})
  
app.post('/postPintura',async (req,res) =>{
    const userFound = await modeloUser.findOne({email: req.body.email, password: req.body.password})
    if (!userFound) return;
    const pinturaCreated = await modeloPintura.create({resenhapintura: req.body.resenhapintura, _id: userFound.id})
    res.send(pinturaCreated)
})

app.put('/putPintura', async (req,res)=>{
    const updatedPintura = await modeloPintura.findOneAndUpdate({resenhapintura: req.body.resenhapintura}, {resenhapintura: req.body.newresenhapintura})
    res.send({ message: "A pintura foi atualizada :)" })
})

app.delete('/deletePintura', async (req,res)=>{
    const pinturaDeleted = await modeloPintura.deleteOne({resenhapintura: req.body.resenhapintura})
    res.send(pinturaDeleted)
})  


app.use((req,res)=>{
    res.send('Infelizmente, não foi possível encontrar a sua rota! :(')
})

app.listen(3000, ()=>console.log(`O servidor está rodando certinho nessa porta aqui: ${3000}`))

})