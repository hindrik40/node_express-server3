
Skapa moduler som kan hantera requests, placera moduler i mappen *routes*

En modul som hanterar metoden GET kan se ut så här

**routes/start.js**
```javascript

import express from 'express';
const router = express.Router();

router.route('/')
    .get((req, res) => {
        res.render('index');
    });

export default router;
```

Modulen importeras därefter till server.js. Modulen kan hantera flera olika request paths

**server.js**

```javascript
import routeStart from './routes/start.js';
app.use('/start', routeStart);
app.use('/', routeStart);
```

#### 5-process
En sida som processas i en template kan basera processen på ett objekt

Objektet skickas med i renderingsmetoden för ejs

**start.js**

```javascript
import express from 'express';
const router = express.Router();

let obj = {user: "Flisa Hedenhös", navigationLinks: ["Start", "About", "Contact"], page: "start"};

router.route('/')
    .get((req, res) => {
        res.render('index', obj);
    });

export default router;
```

Objektet kan sedan hanteras med namnet *locals*, ex *locals.user*, *locals.page*

Ex på locals.user i footer elementet

**footer.ejs**

```javascript
<footer>
    Frukt är fint :) <%- locals.user %> 
</footer>
```

Om objektet inte finns så kan det vara klokt att kontollera först fr att unvika felmeddeland....


#### Branch 6-error

När servern har processat routes och den fortfarande inte gett en respons hanteras det som fel.

**404** page not found, **500** server error

```javascript
// handle errors

// 404 not found
app.get('*', (req, res, next) => {
    res.render('404');
});

// server error 500...
// leading fourth argument is default an error...
app.use((err, req, res, next) => {

    // log error to file...

    // show response
    return res.status(500).send("Server error, please return later");
});

```

***

OBS! Se till att ett server fel (500) inte sänds till en klient eftersom ett sådant fel kan visa information som kan användas för ex en hacker...

*Däremot så bör server fel loggas till en fil för att kunna användas vid felsökning av buggar.*

***

**server.js**

```javascript
// dependencies
import express from 'express';
import ejs from 'ejs';

// "app" environment
const app = express();

// variables
const port = 3000;

// set template engine to ejs
app.set('view engine', 'ejs');

// listen to requests

// use route modules
import routeStart from './routes/start.js';
app.use('/start', routeStart);
app.use('/', routeStart);

import routeContact from './routes/contact.js';
app.use('/contact', routeContact);

import routeAbout from './routes/about.js';
app.use('/about', routeAbout);

// serve static files
app.use(express.static('public'));

// handle errors

// 404 not found
app.get('*', (req, res, next) => {
    res.render('404');
});

// server error 500...
// leading fourth argument is default an error...
app.use((err, req, res, next) => {

    // log error to file...

    // show response
    return res.status(500).send("Server error, please return later");
});

// start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
```

PS D:\repetition Anders\node_express-server3> git checkout express4
Switched to a new branch 'express4'
M       .gitignore
M       README.md
branch 'express4' set up to track 'origin/express4'.
PS D:\repetition Anders\node_express-server3> git branch
* express4
  maintaskkill /F /IM node.exe

PS D:\repetition Anders\node_express-server3> 
taskkill /F /IM node.exe