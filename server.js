const express = require('express')
const server = express()
server.use(express.static('public'))
server.use(express.urlencoded({ extended: true }))

const Poll = require('pg').Poll
// const db = new ({
//     user: 'postgres',
//     password: 'postgres',
//     host: 'localhost',
//     port: 5432,
//     database: 'doe'
// })

//nunjucks
const nunjucks = require('nunjucks');
nunjucks.configure("./", {
    express: server,
    noCache: true,
})

server.get("/", function(req, res) {
    // db.query("SELECT * FROM donors", function(err, result) {
    //     if (err) return res.send("erro de banco de dados.")
    //     const donors = result.row
        return res.render("index.html")
    // })

})

server.post("/", function(req, res) {
    const name = req.body.name
    const email = req.body.email
    const blood = req.body.blood

    if (name == "" || email == "" || blood == "") {
        return res.send("Todos os campos são Obrigatorios.")
    }
    const query = `INSERT INTO donors("name","email,"blood") 
    VALUES($1, $2, $3)`
    const values = [name, email, blood]
    db.query(query, values, function(err) {
        if (err)
            return res.send("erro no banco de dados.")
        return res.redirect("/")
    })
})

server.listen(3000, function() {
    console.log("Servidor Iniciado")
})