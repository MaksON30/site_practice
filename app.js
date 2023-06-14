
const express = require('express');
const { Pool } = require('pg');
const bodyParser = require('body-parser');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'test',
  password: '123456',
  port: 5432, // default port for PostgreSQL
});




const app = express();


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'))
app.get('/',function(req,res){ 
  res.sendFile(__dirname + '/public/index.html'); 
  //__dirname : It will resolve to your project folder. 
}); 
app.get('/cards', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM Products INNER JOIN Designs ON Products.design_id  = Designs.design_id WHERE Products.product_categories_id=1;');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

app.get('/plates', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM Products INNER JOIN Designs ON Products.design_id  = Designs.design_id WHERE Products.product_categories_id=3;');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

app.get('/flyers', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM Products INNER JOIN Designs ON Products.design_id  = Designs.design_id WHERE Products.product_categories_id=2;');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});
app.get('/calendars', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM Products INNER JOIN Designs ON Products.design_id  = Designs.design_id WHERE Products.product_categories_id=4;');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
    
  }
});
app.get('/mugs', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM Products INNER JOIN Designs ON Products.design_id  = Designs.design_id WHERE Products.product_categories_id=5;');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

app.get('/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM clients');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});
app.get('/delivery', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM delivery');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});
app.get('/register', (req, res) => {
  res.sendFile(__dirname + '/public/user.html');
});


app.post('/register', (req, res) => {
  const {name, email, password, phone } = req.body;
  pool.query(
    'INSERT INTO clients (client_name,client_email, client_password, client_phone) VALUES ($1, $2, $3, $4)',
    [name,email, password, phone],
    (error, results) => {
      if (error) {
        res.status(400).send('Error saving data');
      } else {
        console.log('User registered successfully');
        res.redirect('/register');
       
      }
    }
  );
});

app.post('/orders',async (req, res) => {

  const { products_card_id, older_date, client_id, name, your_image, quantity, item_price, address_plates_type, address_plates_type_id, phone } = req.body;
  //console.log(req)
  const query = {
   text: 'INSERT INTO order_items(products_card_id, your_image, quantity,item_price) VALUES ($1, $2, $3, $4)',
  values: [products_card_id, your_image, Number(quantity),Number(item_price)],
   };


   


  pool.query(query, (err, result) => {
    if (err) {
     console.error('Error executing query', err.stack);
     res.status(500).send('Error executing query');
      return;
    }


    
    
    console.log('Query executed successfully');
    
    res.redirect('/');
 });
 
 const result1 = await pool.query('SELECT order_item_id FROM order_items ORDER BY order_item_id DESC LIMIT 1');
 const id= result1.rows[0].order_item_id+1;

 const query1 = {
  text: 'INSERT INTO orders(client_id, order_date, total_amount,older_items_id) VALUES ($1, $2, $3, $4)',
 values: [client_id, older_date, Number('100'),id],
  };

    pool.query(query1, (err, result) => {
      if (err) {
       console.error('Error executing query', err.stack);
       res.status(500).send('Error executing query');
        return;
      }
  
  
      
      
      console.log('Query executed successfully');
      
      res.redirect('/');
   });
    
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  pool.query(
    'SELECT * FROM clients WHERE client_email = $1 AND client_password = $2',
    [email, password],
    (error, results) => {
      if (error) {
        res.status(400).send('Error saving data');
      } else {
        console.log('User successfully');
        res.redirect('/');
        
       
      }
    }
  );
});
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
