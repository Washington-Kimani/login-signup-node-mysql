import express, { urlencoded } from 'express'
import {getUsers, getUser, createUser, deleteUser} from './controllers/database.js'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'


dotenv.config()
const app = express(),
port = process.env.PORT || 5500

//Middlewares
app.use(express.json())
app.use(urlencoded({ extended: true }))
app.use(express.static('public'))

//Setting up Template engine
app.set('view engine', 'ejs')

app.get('/users', async (req, res)=>{
    const users = await getUsers()

    if(users == []){
        res.send("No users")
    }
    res.send(users)
})

app.get('/', async (req, res)=>{
    res.render('login')
})

app.get('/signup', async (req,res)=>{
    res.render('signup')
})

app.get('/users/:id', async (req, res)=>{
    const id = req.params.id
    const user = await getUser(id)
    res.send(user)
})

app.post('/signup', async (req, res)=>{
    let {username, email, passcode} = req.body

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(passcode, salt)
    passcode =hash

    await createUser(username, email,passcode);
    res.redirect('/')
})

app.post('/login', async (req, res)=>{
    const {username, email, passcode} = req.body
    const users = await getUsers()
    const user = users.find(u => u.email === email)
    if(!user){
        res.send("Wrong email")
        return
    }
    const isValid = await bcrypt.compare(passcode, user.passcode)
    if(!isValid){
        res.send("Wrong password")
        return
    }

    // res.send("Login successful")
    res.render('home', {data: user.username})
})

app.delete('/users/:id', async (req, res)=>{
        const id = req.params.id
        const user = await deleteUser(id)
        res.send(`User deleted successfully!`)
})


app.listen(port, ()=> console.log(`Server is running on port ${port}`))