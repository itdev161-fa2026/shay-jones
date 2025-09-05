import express from 'express';

//initialize express app
const app = express();

//define a root endpoint
app.get('/', (req, res) => {
  res.send('http get request sent to root api endpoint!');
});

//connection listener
app.listen(3000, () => console.log('Express server running on port 3000'));

