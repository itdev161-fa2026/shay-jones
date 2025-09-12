import express from 'express';
import connectDatabase from './config/db.js';
import { check, validationResult } from 'express-validator';

//initialize express app
const app = express();

//connect to database
connectDatabase();

app.use(express.json({ extended: false }));

  // GET 
  //Test endpoint

//define a root endpoint
app.get('/', (req, res) => {
  res.send('http get request sent to root api endpoint!');
});

//*// @route    POST api/users
//*// @desc     Test post route

//define a root endpoint
app.post(
  '/api/users',  
  [
  check('name', 'Name is required').not().isEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
], 
(req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  } else {
    // Later we will save the user to the database
    res.send(req.body);
        }
    }
);

//connection listener
app.listen(3000, () => console.log('Express server running on port 3000'));

