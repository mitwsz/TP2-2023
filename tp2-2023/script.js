const express = require('express')
const app = express()
const fs = require('fs')
app.use(express.json())

app.get('/get/:email', (req,res)=>{
    fs.readFile(__dirname+'/'+req.params.email+'.json', (err, data)=>{
        const dados = data
        res.send(JSON.parse(dados))

    })
})

app.post('/post', (req,res)=>{
  fs.writeFileSync(req.body.email+'.json', JSON.stringify(req.body))
  res.send('Enviado!')
})

app.put('/put', (req,res)=>{
    fs.writeFileSync(req.body.email+'.json', JSON.stringify(req.body), {flag: 'W'})
    res.send('Atualizado!')
  })
app.delete('/delete', (req,res)=>{
    fs.unlinkSync(__dirname+'/'+req.body.email+'.json')
    res.send('Apagados!')
  })

app.use((req,res)=>{
    res.send('A não foi encontrada!')
})

app.listen(3000, ()=>console.log(`servidor rodando na porta ${3000}`))