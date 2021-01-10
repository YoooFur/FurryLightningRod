const { User } = require('./models')
const express = require('express')

const app = express()
app.use(express.json())


app.get('/', async(req, res) => {
    res.send('ok')
})

app.post('/api/register', async(req, res) => {
    console.log(req.body)
    const user = await User.create({
        username: req.body.username,
        password: req.body.password,
    })
    res.send(user)
})


//监听
app.listen(3001, () => {
    console.log('API is listening on 3001')
})