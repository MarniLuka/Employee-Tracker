// required packages
const mysql = require('mysql2');
const inquirer = require('inquirer');

// port number
const PORT = process.env.PORT || 3001;

// Created a connection to the database
const connectDB = mysql.createConnection(
    {
        host: 'localhost',
        user: process.env.USERNAME,
        password: process.env.PASSWORD,
        database: 'employee_db',
    },
    console.log('You are now connected to the employee_db database.')
);
