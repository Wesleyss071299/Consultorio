const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const ConsultaRoute = express.Router();
const PORT = 4000;

let Consulta = require('./consulta.model');

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://wesley:36362119@cluster0-j4wgd.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})

ConsultaRoute.route('/').get(function(req, res) {
    Consulta.find(function(err, consulta) {
        if (err) {
            console.log(err);
        } else {
            res.json(consulta);
        }
    });
});

ConsultaRoute.route('/:id').get(function(req, res) {
    let id = req.params.id;
    Consulta.findById(id, function(err, consulta) {
        res.json(consulta);
    });
});

ConsultaRoute.route('/add').post(function(req, res) {
    let consulta = new Consulta(req.body);
    consulta.save()
        .then(consulta => {
            res.status(200).json({'consulta': 'consulta added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding new consulta failed');
        });
});

ConsultaRoute.route('/:id').delete((req, res) => {
  Consulta.findByIdAndDelete(req.params.id)
    .then(() => res.json('Exercise deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

ConsultaRoute.route('/update/:id').post(function(req, res) {
    Consulta.findById(req.params.id, function(err, consulta) {
        if (!consulta)
            res.status(404).send('data is not found');
        else
            consulta.username = req.body.username;
            consulta.address = req.body.address;
            consulta.phone = req.body.phone;
            consulta.date = Date.parse(req.body.date);

            consulta.save().then(consulta => {
                res.json('Consulta updated');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});

app.use('/consultas', ConsultaRoute);

const loginRouter = require('./signup.routes')
app.use('/api', loginRouter)

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});