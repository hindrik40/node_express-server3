//?dependencies
import express from 'express';
//*app enviroment
const app = express();
app.get('/', function (req, res) {
    res.send('Hello World!');
});
app.listen(3000);
