require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const bodyparser = require('body-parser');
const recipeRoute = require('./routes/recipe.routes');
const webRoute = require('./routes/web.routes');


//express init
const app = express();
//PORT
const port = process.env.PORT || 3000;

//DB Connection
const db = mongoose.connect(process.env.DATABASE, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
db.then(() => {
  console.log('connection Success!!');
});

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

//Middlewares
app.use(cors());
app.use(express.json());
app.use(
  bodyparser.urlencoded({
    extended: true,
  })
);
app.use(express.static(__dirname+'/public'));
app.use(bodyparser.json());
app.use(express.static('uploads'));

app.use('/recipe', recipeRoute);
app.use('/web', webRoute);


app.listen(port, () => {
  console.log(`Server Running on ${port}`);
});
