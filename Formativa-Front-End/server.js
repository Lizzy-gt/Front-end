const express = require('express')
const multer = require('multer')
const path = require('path')
const fs = require('fs')
const cors = require('cors')

const UPLOAD_DIR = path.join(__dirname, 'uploads')
if(!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR)

const storage = multer.diskStorage({
  destination: (req, file, cb)=> cb(null, UPLOAD_DIR),
  filename: (req, file, cb)=> cb(null, Date.now() + '-' + file.originalname.replace(/\s+/g,'_'))
})
const upload = multer({ storage })

const app = express()
app.use(cors())
app.use(express.json())
app.use('/uploads', express.static(UPLOAD_DIR))

const DB_FILE = path.join(__dirname, 'produtos.json')
function readDB(){ try{ return JSON.parse(fs.readFileSync(DB_FILE,'utf8')||'[]') }catch(e){ return [] } }
function writeDB(data){ fs.writeFileSync(DB_FILE, JSON.stringify(data,null,2)) }

app.get('/produtos', (req,res)=>{
  res.json(readDB())
})

app.post('/produtos', upload.single('imagem'), (req,res)=>{
  const body = req.body || {}
  const file = req.file
  const produtos = readDB()
  const novo = {
    id: String(Date.now()),
    nome: body.nome || '',
    descricao: body.descricao || '',
    preco: Number(body.preco) || 0,
    categoria: body.categoria || '',
    imagem: file ? `/uploads/${file.filename}` : (body.imagem || '')
  }
  produtos.unshift(novo)
  writeDB(produtos)
  res.status(201).json(novo)
})

app.put('/produtos/:id', upload.single('imagem'), (req,res)=>{
  const id = req.params.id
  const body = req.body || {}
  const file = req.file
  const produtos = readDB()
  const idx = produtos.findIndex(p=>p.id==id || p._id==id)
  if(idx===-1) return res.status(404).json({error:'not found'})
  const atualizado = Object.assign({}, produtos[idx], {
    nome: body.nome || produtos[idx].nome,
    descricao: body.descricao || produtos[idx].descricao,
    preco: body.preco? Number(body.preco): produtos[idx].preco,
    categoria: body.categoria || produtos[idx].categoria,
    imagem: file? `/uploads/${file.filename}` : (body.imagem || produtos[idx].imagem)
  })
  produtos[idx] = atualizado
  writeDB(produtos)
  res.json(atualizado)
})

app.delete('/produtos/:id', (req,res)=>{
  const id = req.params.id
  let produtos = readDB()
  const idx = produtos.findIndex(p=>p.id==id || p._id==id)
  if(idx===-1) return res.status(404).json({error:'not found'})
  const removed = produtos.splice(idx,1)[0]
  writeDB(produtos)
  res.json(removed)
})

const PORT = process.env.PORT || 3000
app.listen(PORT, ()=> console.log(`API rodando em http://localhost:${PORT}`))
