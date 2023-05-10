-- Delete the database with the same name if exists
DROP DATABASE IF EXISTS employee_db;
-- Creates a new database
CREATE DATABASE employee_db;

USE employee_db;

-- Three tables that need to be included
CREATE TABLE department (
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    name VARCHAR(30) NOT NULL
);

CREATE TABLE role (
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT,
    -- References the id from the department table
    FOREIGN KEY (department_id)
    REFERENCES department(id)
    ON DELETE SET NULL
);

CREATE TABLE employee (
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    -- References the id in the role table
    FOREIGN KEY (role_id)
    REFERENCES role(id)
    ON DELETE SET NULL,
    -- References the id within the same table. Null if employee has no manager
    manager_id INT DEFAULT NULL
);