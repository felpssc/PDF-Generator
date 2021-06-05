const express = require('express');
const ejs = require('ejs');
const path = require('path');
const pdf = require('html-pdf');
const puppeteer = require('puppeteer');
const hbs = require('express-handlebars');

const app = express();

app.engine('handlebars', hbs());
app.set('view engine', 'handlebars');

// data
const passengers = [
  {
    name: "Felipe",
    flightNumber: 7859,
    time: "18:00"
  },

  {
    name: "Laura",
    flightNumber: 7859,
    time: "18:00"
  },

  {
    name: "Jack",
    flightNumber: 7859,
    time: "18:00"
  }
];

const participant1 = {
  name: 'João Paulo da Silva',
  profession: 'Estudante',
  cpf: '123.456.789-01',
  maritalStatus: 'Casado',
  address: {
    street: 'Rua B5',
    district: 'Jardins',
    number: '1200',
    city: 'Aracaju',
    uf: 'SE',
    cep: '49330-160'
  }
}

const participant2 = {
  name: 'Maria Julia Santos',
  profession: 'Empreendedora',
  cpf: '789.456.123-02',
  maritalStatus: 'Casada',
  address: {
    street: 'Rua Almeida',
    district: 'São José',
    number: '305',
    city: 'Salvador',
    uf: 'BA',
    cep: '49160-000'
  }
}

// routes

app.get('/', (request, response) => {
  response.render('view', { participant1, participant2 });
});

app.get('/pdf', async (request, response) => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto(`http://localhost:${port}/`, {
    waitUntil: 'networkidle0'
  })

  const pdf = await page.pdf({
    printBackground: true,
    format: 'letter'
  });

  await browser.close();

  response.contentType('application/pdf');

  return response.send(pdf);
})

// app.get('/pdf', async (request, response) => {

//   const browser = await puppeteer.launch({ headless: true });
//   const page = await browser.newPage();

//   await page.goto(`http://localhost:${port}/`, {
//     waitUntil: 'networkidle0'
//   })

//   const pdf = await page.pdf({
//     printBackground: true,
//     format: 'letter'
//   });

//   await browser.close();

//   response.contentType("application/pdf");

//   return response.send(pdf);

// })

// app.get('/', (request, response) => {

//   const filePath = path.join(__dirname, '/print.ejs');
  
//   ejs.renderFile(filePath, { passengers }, (err, html) => {
//     if(err) {
//       return response.send('Erro na leitura de arquivo')
//     }

//     // // config page
//     // const options = {
//     //   height: "11.25in",
//     //   width: "8.5in",
//     //   header: {
//     //     height: "20mm"
//     //   },
//     //   footer: {
//     //     height: "20mm"
//     //   }
//     // }

//     // // create PDF

//     // pdf.create(data, options).toFile("file.pdf", (err, data) => {
//     //   if(err) {
//     //     return response.send('Erro ao gerar o arquivo PDF');
//     //   }

//       // send file
//     return response.send(html);
//     // });

//   })

// });


// listen port
const port = 3338

app.listen(port, () => {
  console.log(`🔥 Back-end started on port: ${port}`);
})