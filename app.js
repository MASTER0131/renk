const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

const dataPath = path.join(__dirname, 'data', 'top-verisi.json');

// Klasör ve dosya kontrolü (Başlangıç ayarları)
if (!fs.existsSync('./data')) fs.mkdirSync('./data');
if (!fs.existsSync(dataPath)) fs.writeFileSync(dataPath, JSON.stringify({ counter: 0, color: '#3b82f6', logs: [] }));

app.get('/', (req, res) => {
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    res.render('index', { data });
});

// Sayacı artıran ve rengi değiştiren API
app.post('/tikla', (req, res) => {
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    data.counter += 1;
    // Rastgele bir renk üret
    data.color = '#' + Math.floor(Math.random()*16777215).toString(16);
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
    res.redirect('/');
});

// Not kaydetme API
app.post('/kaydet', (req, res) => {
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    if(req.body.not) {
        data.logs.push({ metin: req.body.not, zaman: new Date().toLocaleString('tr-TR') });
        fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
    }
    res.redirect('/');
});

app.listen(3000, '0.0.0.0', () => console.log("Top projesi 3000 portunda!"));
