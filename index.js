const express = require('express');
const path = require('path');
const app = express();
const fs = require('fs');

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    fs.readdir(`./files`, function (err, files) {
        res.render('index', { files: files })
    })
})
app.get('/file/:fileName', function (req, res) {
    fs.readFile(`./files/${req.params.fileName}`, "utf-8", function (err, filedata) {
        res.render('show', { fileName: req.params.fileName, filedata: filedata })
    })
})
app.get('/delete/:fileName', function (req, res) {
    fs.rm(`./files/${req.params.fileName}`, function (err) {
        console.log(err)

        res.redirect("/")

    })
})

app.post('/create', (req, res) => {
    fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`, req.body.details, (err) => {
        res.redirect("/")
        console.log(err)
    })
})


app.listen(3000, () => {
    console.log("running...")
})