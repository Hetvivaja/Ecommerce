const express=require('express');
const session=require('express-session');
const bodyParser=require('body-parser');
const path=require('path');
const app=express();

const authRoutes=require('./routes/auth');
const categoryRoutes=require('./routes/categories');
const productRoutes=require('./routes/products');


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.static('public'));


app.use(session({
    secret:'ecom_admin_secret',
    resave:false,
    saveUninitialized: true,
}));

app.use('/auth', authRoutes);
app.use('/categories', categoryRoutes);
app.use('/products', productRoutes);
app.use('/api/products', productRoutes);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/login.html'));
});

app.get('/dashboard', (req, res) => {
    if (!req.session.user) {
      return res.redirect('/');
    }
    res.sendFile(path.join(__dirname, '../views/dashboard.html'));
});

app.get('/categories-page', (req, res) => {
    if (!req.session.user) {
      return res.redirect('/');
    }
    res.sendFile(path.join(__dirname, '../views/categories.html'));
});
  
app.get('/products-page', (req, res) => {
    if (!req.session.user) {
      return res.redirect('/');
    }
    res.sendFile(path.join(__dirname, '../views/products.html'));
});

app.get('/product-list', (req, res) => {
  if (!req.session.user) return res.redirect('/');
  res.sendFile(path.join(__dirname, '../views/product-list.html'));
});
app.use(express.static('public'));

app.get('/products', async (req, res) => {
  const [rows] = await db.query('SELECT id, name, price, image FROM products');
  res.json(rows);
});

app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
});