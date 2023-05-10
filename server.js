// Required packages
const mysql = require('mysql2');
const inquirer = require('inquirer');

// Tried to use the dotenv package, but when I did, I would immediately get kicked out of the inquirer prompts before getting a chance to answer.
// require('dotenv').config();

// Created a connection to the database
const connectDB = mysql.createConnection(
    {
        host: 'localhost',
        port: process.env.PORT || 3306,
        user: 'root',
        // Add your password here first!!!
        password: '',
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
                    'Add a Department',
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
                case 'Add a Department':
                    addDepartment();
                    break;
            }
        }) 
}

const viewDepartments = () => {
    connectDB.query('SELECT * FROM department', (err, res) => {
        if (err) throw err;
        // Shows the wanted table from the employee_db
        console.table(res);
        // Restarts the prompt
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

const addDepartment = () => {
    inquirer
        .prompt([
            {
                type: 'input',
                message: 'What department would you like to add?',
                name: 'newDept',
            },
        ])
        .then((response) => {
            // Adds a new department name to the department table
            connectDB.query(`INSERT INTO department (name) 
                VALUES ('${response.newDept}')`, 
                (err, res) => {
                    if (err) throw err; 
                console.log('New department created.'); 
                question();
            });
        });
}

question();