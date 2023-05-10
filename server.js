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
                    'Delete a Department',
                    'Delete a Role',
                    'Delete an Employee',
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
                case 'Add a Role':
                    addRole();
                    break;
                case 'Add an Employee':
                    addEmployee();
                    break;
                case 'Update an Employee Role':
                    updateEmployee();
                    break;
                case 'Delete a Department':
                    deleteDpt();
                    break;
                case 'Delete a Role':
                    deleteRole();
                    break;
                case 'Delete an Employee':
                    deleteEmployee();
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

const addRole = () => {
    inquirer
        .prompt([
            {
                type: 'input',
                message: 'What role would you like to add?',
                name: 'newRole',
            },
            {
                type: 'input',
                message: 'What is their salary?',
                name: 'salary',
            },
            {
                type: 'list',
                message: 'What department do they belong to?',
                name: 'deptList',
                // Need to figure out how to do this so you can see the name not just the id, and how to include added departments.
                choices: [
                    1,
                    2,
                    3,
                    4,
                    5,
                    6,
                ],
            },
        ])
        .then((response) => {
            connectDB.query(`INSERT INTO role (title, salary, department_id)
                VALUES ('${response.newRole}', '${response.salary}', ${response.deptList})`,
                (err, res) => {
                    if (err) throw err; 
                console.log('New role created.'); 
                question();
            });
        })
}

const addEmployee = () => {
     inquirer
        .prompt([
            {
                type: 'input',
                message: 'New employee first name:',
                name: 'firstName',
            },
            {
                type: 'input',
                message: 'New employee last name:',
                name: 'lastName',
            },
            {
                type: 'list',
                message: 'What role do they belong to?',
                name: 'roleList',
                // Need to figure out how to do this so you can see the name not just the id, and how to include added roles.
                choices: [
                    1,
                    2,
                    3,
                    4,
                    5,
                    6,
                    7,
                    8,
                ],
            },
            {
                type: 'list',
                message: 'Who is their manager?',
                name: 'manager',
                // Need to figure out how to do this so you can see the name not just the id so you know who the id is referring to
                choices: [
                    1,
                    2,
                    3,
                    4,
                    5,
                    6,
                    7,
                    8,
                    9,
                    10,
                ],
            },
        ])
        .then((response) => {
            connectDB.query(`INSERT INTO employee 
                (first_name, last_name, role_id, manager_id) 
                VALUES ('${response.firstName}', '${response.lastName}', ${response.roleList}, ${response.manager})`,
                (err, res) => {
                    if (err) throw err; 
                console.log('New employee created.'); 
                question();
            });
        })
}


// Needs further debugging
const updateEmployee = () => {
    inquirer
        .prompt([
            {
                type: 'list',
                message: 'Which employee would you like to update?',
                name: 'updateEmployee',
                choices: [
                    'Frodo',
                    'Samwise',
                    'Pippin',
                    'Merry',
                    'Aragorn',
                    'Legolas',
                    'Gimli',
                    'Gandalf',
                    'Boromir',
                ],
            },
            {
                type: 'list',
                message: 'What is their new role?',
                name: 'newRole',
                // Need to figure out how to do this so you can see the name not just the id, and how to include added roles.
                choices: [
                    1,
                    2,
                    3,
                    4,
                    5,
                    6,
                    7,
                    8,
                ],
            },
        ])
        .then((response) => {
            connectDB.query(`UPDATE employee 
                SET ('${response.updateEmployee}')
                WHERE (${response.newRole})`),
                (err, res) => {
                    if (err) throw err; 
                console.log('Employee updated.'); 
                question();
            };
        });
}

const deleteDpt = () => {
    inquirer
        .prompt([
            {
                type: 'list',
                message: 'What department do you want to delete?',
                name: 'deptList',
                // Need to figure out how to do this so you can see the name not just the id, and how to include added departments.
                choices: [
                    1,
                    2,
                    3,
                    4,
                    5,
                    6,
                    7,
                ],
            },
        ])
        .then((response) => {
            connectDB.query(`DELETE FROM department WHERE id = ${response.deptList}`,
                (err, res) => {
                    if (err) throw err; 
                console.log('Department deleted.'); 
                question();
        });
    })
}

const deleteRole = () => {
    inquirer
        .prompt([
            {
                type: 'list',
                message: 'What role do you want to delete?',
                name: 'roleList',
                // Need to figure out how to do this so you can see the name not just the id, and how to include added roles.
                choices: [
                    1,
                    2,
                    3,
                    4,
                    5,
                    6,
                    7,
                    8,
                ],
            },
        ])
        .then((response) => {
            connectDB.query(`DELETE FROM role WHERE id = ${response.roleList}`,
                (err, res) => {
                    if (err) throw err; 
                console.log('Role deleted.'); 
                question();
        });
    })
}

const deleteEmployee = () => {
    inquirer
        .prompt([
            {
                type: 'list',
                message: 'Which employee do you want to delete?',
                name: 'employeeList',
                // Need to figure out how to do this so you can see the name not just the id, and how to include added employees.
                choices: [
                    1,
                    2,
                    3,
                    4,
                    5,
                    6,
                    7,
                    8,
                    9,
                    10,
                ],
            },
        ])
        .then((response) => {
            connectDB.query(`DELETE FROM employee WHERE id = ${response.employeeList}`,
                (err, res) => {
                    if (err) throw err; 
                console.log('Department deleted.'); 
                question();
        });
    })
}

question();
