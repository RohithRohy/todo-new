const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const ejs = require('ejs');

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.static('public'));

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'payrup',
    database: 'todo_list'
});

connection.connect();

app.get('/', (req, res) => {
    connection.query('SELECT * FROM todo_app', (error,results) =>{
        if (error) throw error;
        res.render('index', {todos: results });
    });
});

/*app.post('/add', (req, res) => {
    const { task } = req.body;
    connection.query('INSERT INTO todos (task) VALUES (?)',[task], (error) => {
        if (error) throw error;
        res.redirect('/');
    });
}); 

app.get('/delete/:id', (req, res) => {
    const { id } = req.params;
    connection.query('DELETE FROM todos WHERE id = ?', [id], (error) => {
        if (error) throw error;
        res.redirect('/');
    })
});

app.get('/edit/:id',(req, res) => {
    const { id } = req.params;
    connection.query('SELECT * FROM todos WHERE id = ?', [id], (error, results) => {
        if (error) throw error;
        res.render('edit', {todo: results[0] });
    });
});

app.post('/edit/:id', (req, res) => {
    const { id } = req.params;
    const { task } = req.body;
    connection.query('UPDATE todos SET task = ? WHERE id = ?', [task, id], (error) =>{
        if (error) throw error;
        res.redirect('/');
    });
});*/

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);

});