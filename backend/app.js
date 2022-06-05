const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const HttpError = require('./models/errorModal/httpError');

const app = express();

//bodyParser
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cookieParser());
app.use(cors());

//routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const dieseaseRoutes = require('./routes/diseaseRoutes');
const foodPlanRoutes = require('./routes/foodPlanRoutes');
const braintreeRoutes = require('./routes/braintreeRoutes');
const orderRoutes = require('./routes/orderRoutes');

//routes middlewares
app.use('/api',authRoutes);
app.use('/api',userRoutes);
app.use('/api',categoryRoutes);
app.use('/api',dieseaseRoutes);
app.use('/api',foodPlanRoutes);
app.use('/api',braintreeRoutes);
app.use('/api',orderRoutes);

//headers
app.use((req,res,next) =>{
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin,X-Requested-With,Content-Type,Accept,Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods','GET,POST,PATCH,DELETE');

  next();
})

//for unsupported routes
app.use((req,res,next) => {
  const error = new HttpError('Couldnt find this route',404);
  throw error;
});

//error handling
app.use((error,req,res,next) => {
  if(res.headerSent){
    return next(error);
  }
  res.status(error.code || 500).json({ message: error.message || 'An unknown error occured!' });
})

mongoose
  .connect('mongodb+srv://rohan:OAsr3zuh1q6s24DF@cluster0.3kcv6.mongodb.net/healthapp?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => {
    app.listen(5000, () => {
      console.log('Server initiated!');
    })
  })
  .catch((err) => {
    console.log(err);
  })

  // mongodb+srv://<username>:<password>@cluster0.3kcv6.mongodb.net/?retryWrites=true&w=majority