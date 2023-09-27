import express from 'express';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config()
const app = express()
app.use(express.json())

const verifyJWT = (req, res, next) => {
    const token = req.jeaders['x-access=token']
    if(!token) {
        return res.status(401).json({auth: false, message: "Token inválido!"})
    }
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if(err){
            return res.status(500).json({auth: false, message: 'falha ao consultar Token'})
        }
        req.userId = decoded.id
        next()
    })
}

app.get('/', (req,res) =>{
    res.json({message: 'ok'})
})

app.post('/login', (req, res)=>{
    if(req.body.userId === 'arquiteturaWeb' && req.body.password === '123'){
        const id = 1
        const token = jwt.sign({id}, process.env.SECRET, {
            expiresIn: 300
        })
        return res.json({auth: true, token: token})
    }
    res.status(500).json({message:'Login inválido!'})

})

app.get('/clientes', verifyJWT, (req, res, next)=>{
    console.log(`${req,userId} autenticando`)
    res.json([{id: 1, nome:'palma...'}])
})

app.post('/login', (req, res, next) => {
    if(req.body.user === 'arquiteturaWeb' && req.body.password === '123'){
        //auth ok
        const id = 1; //esse id viria do banco de dados
        var privateKey = fs.readFileSync('./private.key', 'utf8');
        var token = jwt.sign({ id }, privateKey, {
        expiresIn: 300, // 5min
        algorithm: "RS256" //SHA-256 hash signature
        });
        console.log("Fez login e gerou token!");
        return res.status(200).send({ auth: true, token: token });
        }
        return res.status(401).send('Login inválido!');
    })
    


app.listen(3001, console.log('Server running'))