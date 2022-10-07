const express = require("express");
const Joi = require("joi");
const mysql = require("mysql");
var passwordHash = require('password-hash');

const pool = mysql.createPool({
    connectionLimit: 100,
    host: "localhost",
    user: "root",
    password: "",
    database: "skriptvezbe",
});

const users = express.Router();

const scheme = Joi.object().keys({
    username: Joi.string().trim().min(4).max(18).required(),
    password: Joi.string().min(4).max(18).required(),
});

users.use(express.json());

users.get("/users", (req, res) => {
    pool.query("select * from auth_user", (err, rows) => {
        if (err) res.status(500).send(err.sqlMessage);
        else res.send(rows);
    });
});

users.post("/users", (req, res) => {
    let { error } = scheme.validate(req.body);

    if (error) res.status(400).send(error.details[0].message);
    else {
        let query =
            "select * from auth_user where username = ?";
        let formated = mysql.format(query, [
            req.body.username,
        ]);

        pool.query(formated, (err, rows) => {
            if (err) res.status(500).send(err.sqlMessage);
            else {
                if (rows.length == 0)
                    res.status(403).send("No user with those credentials");
                else {
                    // res.send(rows);
                    console.log(rows)
                    toReturn = rows.find(user => {
                        if(passwordHash.verify(req.body.password, user.password)) {
                            console.log("CAOO")
                            return user
                        }
                    })
                    console.log(toReturn)
                    res.send(toReturn)
                }
            }
            // else {
            //     query = "select * from auth_user where id=?";
            //     formated = mysql.format(query, [response.insertId]);

            //     pool.query(formated, (err, rows) => {
            //         if (err) res.status(500).send(err.sqlMessage);
            //         else res.send(rows[0]);
            //     });
            // }
        });
    }
});

users.post("/users/register", (req, res) => {
    let { error } = scheme.validate(req.body);

    if (error) res.status(400).send(error.details[0].message);
    else {
        var hashedPassword = passwordHash.generate(req.body.password);
        let query =
            "insert into auth_user (username, password) values (?, ?)";
        let formated = mysql.format(query, [
            req.body.username,
            hashedPassword
        ]);

        pool.query(formated, (err, response) => {
            if (err) res.status(500).send(err.sqlMessage);
            else {
                query = "select * from auth_user where id=?";
                formated = mysql.format(query, [response.insertId]);

                pool.query(formated, (err, rows) => {
                    if (err) res.status(500).send(err.sqlMessage);
                    else res.send(rows[0]);
                });
            }
        });
    }
});

module.exports = users;
