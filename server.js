// required packages
const mysql = require('mysql2');
const inquirer = require('inquirer');
require('dotenv').config();

// Created a connection to the database
const connectDB = mysql.createConnection(
    {
        host: 'localhost',
        port: '3306',
        user: process.env.USERNAME,
        password: process.env.PASSWORD,
        database: 'employee_db',
    },
    console.log('You are now connected to the employee_db database.')
);

const question = () => {
    inquirer
        .prompt([
            {
                type: 'list',
                message: 'Choose one of the following:',
                name: 'choices',
                choices: [
                    'View All Departments',
                    'View All Roles',
                    'View All Employees',
                    'Add a department',
                    'Add a Role',
                    'Add an Employee',
                    'Update an Employee Role',
                ],
            },
        ])
        .then((reponse) => {
            switch (reponse.choices) {
                case 'View All Departments':
                    viewDepartments();
                    break;
                case 'View All Roles':
                    viewRoles();
                    break;
                case 'View All Employees':
                    viewEmployees();
                    break;

            }
        }) 
}

const viewDepartments = () => {
    connectDB.query('SELECT * FROM department', (err, res) => {
        if (err) throw err;
        // shows the wanted table from the employee_db
        console.table(res);
        // restarts the prompt
        question();
    });
};

const viewRoles = () => {
    connectDB.query('SELECT * FROM role', (err, res) => {
        if (err) throw err;
        console.table(res);
        question();
    });
};

const viewEmployees = () => {
    connectDB.query('SELECT * FROM employee', (err, res) => {
        if (err) throw err;
        console.table(res);
        question();
    });
};

question();