const express = require("express");
const Joi = require("joi");
const mysql = require("mysql");

const pool = mysql.createPool({
    connectionLimit: 100,
    host: "localhost",
    user: "root",
    password: "",
    database: "skriptvezbe",
});

const todos = express.Router();

const scheme = Joi.object().keys({
    category: Joi.string().trim().max(18).required(),
    content: Joi.string().max(500).required(),
});

todos.use(express.json());

todos.get("/todos", (req, res) => {
    pool.query("select * from demo_app_todo", (err, rows) => {
        if (err) res.status(500).send(err.sqlMessage);
        else res.send(rows);
    });
});

todos.post("/todos/:id", (req, res) => {
    let { error } = scheme.validate(req.body);

    if (error) res.status(400).send(error.details[0].message);
    else {
        let query =
            "insert into demo_app_todo (category, content, owner_id) values (?, ?, ?)";
        let formated = mysql.format(query, [
            req.body.category,
            req.body.content,
            req.params.id,
        ]);

        pool.query(formated, (err, response) => {
            if (err) res.status(500).send(err.sqlMessage);
            else {
                query = "select * from demo_app_todo where id=?";
                formated = mysql.format(query, [response.insertId]);

                pool.query(formated, (err, rows) => {
                    if (err) res.status(500).send(err.sqlMessage);
                    else res.send(rows[0]);
                });
            }
        });
    }
});

todos.get("/todos/:id", (req, res) => {
    let query = "select * from demo_app_todo where owner_id=?";
    let formated = mysql.format(query, [req.params.id]);

    pool.query(formated, (err, rows) => {
        if (err) res.status(500).send(err.sqlMessage);
        else res.send(rows);
    });
});

todos.get("/todo/:id", (req, res) => {
    let query = "select * from demo_app_todo where id=?";
    let formated = mysql.format(query, [req.params.id]);

    pool.query(formated, (err, rows) => {
        if (err) res.status(500).send(err.sqlMessage);
        else res.send(rows[0]);
    });
});

todos.put("/todo/:id", (req, res) => {
    let { error } = scheme.validate(req.body);

    if (error) res.status(400).send(error.details[0].message);
    else {
        let query = "update demo_app_todo set category=?, content=? where id=?";
        let formated = mysql.format(query, [
            req.body.category,
            req.body.content,
            req.params.id,
        ]);

        pool.query(formated, (err, response) => {
            if (err) res.status(500).send(err.sqlMessage);
            else {
                query = "select * from demo_app_todo where id=?";
                formated = mysql.format(query, [req.params.id]);

                pool.query(formated, (err, rows) => {
                    if (err) res.status(500).send(err.sqlMessage);
                    else res.send(rows[0]);
                });
            }
        });
    }
});

todos.delete("/todo/:id", (req, res) => {
    let query = "select * from demo_app_todo where id=?";
    let formated = mysql.format(query, [req.params.id]);

    pool.query(formated, (err, rows) => {
        if (err) res.status(500).send(err.sqlMessage);
        else {
            let todo = rows[0];

            let query = "delete from demo_app_todo where id=?";
            let formated = mysql.format(query, [req.params.id]);

            pool.query(formated, (err, rows) => {
                if (err) res.status(500).send(err.sqlMessage);
                else res.send(todo);
            });
        }
    });
});

module.exports = todos;
