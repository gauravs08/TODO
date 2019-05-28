var Todo = require('../models/todo.js');

var bodyParser = require('body-parser');

function getTodos(res) {
    Todo.find(function (err, todos) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }

        res.json(todos); // return all todos in JSON format
    });
};

module.exports = function (app) {
    app.use(bodyParser.json());

    // api ---------------------------------------------------------------------
    // GET all todos=========================================
    app.get('/api/todos', function (req, res) {
        // use mongoose to get all todos in the database
        getTodos(res);
    });

    //POST===================================================
    // create todo and send back all todos after creation
    app.post('/api/todos', function (req, res) {

        // create a todo, information comes from AJAX request from Angular
        Todo.create({
            text: req.body.text,
            done: false
        }, function (err, todo) {
            if (err)
                res.send(err);

            // get and return all the todos after you create another
            getTodos(res);
        });

    });

    //DELETE=================================================
    // delete a todo
    app.delete('/api/todos/:todo_id', function (req, res) {
        Todo.remove({
            _id: req.params.todo_id
        }, function (err, todo) {
            console.log("Deleting todo:", todo.todo_id);

            if (err) res.send(err);

            getTodos(res);
        });
    });

    //UPDATE=================================================
    // // Update a todo
    app.put('/api/todos/:todo_id', function (req, res) {
        console.log("body ::", req.body);
        // const newparam = ({
        //     completed: req.body.text    
        // });

        Todo.findByIdAndUpdate({ _id: req.params.todo_id }, req.body)
            .then(function () {
                Todo.findOne({ _id: req.params.todo_id })
                    .then(function (newtodo) {
                        console.log(newtodo);
                        //res.send("TO DO Updated...");
                        getTodos(res);
                    });
            });
    });

    // app.put('/api/todos/:todo_id', function (req, res) {
    //     console.log("Posting updated:", req.params.todo_id);
    //     console.log("Posting body:", req.body.text);
    //     //Todo.findOneAndUpdate()
    //     Todo.findByIdAndUpdate(req.body._id, { $set: req.body }, function (err, todo) {
    //         console.log("updated data:", todo);

    //         if (err) res.send(err);
    //         console.log("Posting updated:", res.body);
    //         getTodos(res);
    //         //res.send('Posting udpated.');
    //     });
    // });




    //     Todo.update({
    //         _id: req.params.todo_id
    //     }, function (err, todo) {
    //         if (err)
    //             res.send(err);

    //         getTodos(res);
    //     });
    // });

    // application ==========================================
    app.get('*', function (req, res) {
        res.sendFile(__dirname + '/public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });
};
