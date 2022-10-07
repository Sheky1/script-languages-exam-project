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

const notes = express.Router();

const scheme = Joi.object().keys({
    title: Joi.string().trim().min(4).max(30).required(),
    category: Joi.string().trim().min(4).max(18).required(),
    content: Joi.string().max(500).required(),
});

notes.use(express.json());

notes.get("/notes", (req, res) => {
    pool.query("select * from demo_app_note", (err, rows) => {
        if (err) res.status(500).send(err.sqlMessage);
        else res.send(rows);
    });
});

notes.post("/notes/:id", (req, res) => {
    let { error } = scheme.validate(req.body);

    if (error) res.status(400).send(error.details[0].message);
    else {
        let query =
            "insert into demo_app_note (title, category, content, owner_id) values (?, ?, ?, ?)";
        let formated = mysql.format(query, [
            req.body.title,
            req.body.category,
            req.body.content,
            req.params.id,
        ]);

        pool.query(formated, (err, response) => {
            if (err) res.status(500).send(err.sqlMessage);
            else {
                query = "select * from demo_app_note where id=?";
                formated = mysql.format(query, [response.insertId]);

                pool.query(formated, (err, rows) => {
                    if (err) res.status(500).send(err.sqlMessage);
                    else res.send(rows[0]);
                });
            }
        });
    }
});

notes.get("/notes/:id", (req, res) => {
    let query = "select * from demo_app_note where owner_id=?";
    let formated = mysql.format(query, [req.params.id]);

    pool.query(formated, (err, rows) => {
        if (err) res.status(500).send(err.sqlMessage);
        else res.send(rows);
    });
});

notes.get("/note/:id", (req, res) => {
    let query = "select * from demo_app_note where id=?";
    let formated = mysql.format(query, [req.params.id]);

    pool.query(formated, (err, rows) => {
        if (err) res.status(500).send(err.sqlMessage);
        else res.send(rows[0]);
    });
});

notes.put("/note/:id", (req, res) => {
    let { error } = scheme.validate(req.body);

    if (error) res.status(400).send(error.details[0].message);
    else {
        let query =
            "update demo_app_note set title=?, category=?, content=? where id=?";
        let formated = mysql.format(query, [
            req.body.title,
            req.body.category,
            req.body.content,
            req.params.id,
        ]);

        pool.query(formated, (err, response) => {
            if (err) res.status(500).send(err.sqlMessage);
            else {
                query = "select * from demo_app_note where id=?";
                formated = mysql.format(query, [req.params.id]);

                pool.query(formated, (err, rows) => {
                    if (err) res.status(500).send(err.sqlMessage);
                    else res.send(rows[0]);
                });
            }
        });
    }
});

notes.delete("/note/:id", (req, res) => {
    let query = "select * from demo_app_note where id=?";
    let formated = mysql.format(query, [req.params.id]);

    pool.query(formated, (err, rows) => {
        if (err) res.status(500).send(err.sqlMessage);
        else {
            let note = rows[0];

            let query = "delete from demo_app_note where id=?";
            let formated = mysql.format(query, [req.params.id]);

            pool.query(formated, (err, rows) => {
                if (err) res.status(500).send(err.sqlMessage);
                else res.send(note);
            });
        }
    });
});

module.exports = notes;
