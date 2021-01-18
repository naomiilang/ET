DROP DATABASE IF EXISTS etDB;

CREATE DATABASE etDB;
USE etDB;

CREATE TABLE employees (
    employee_id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    title VARCHAR(30) NOT NULL,
    department VARCHAR(30) NOT NULL,
    salary INT NOT NULL,
    manager VARCHAR(30) NOT NULL,
    PRIMARY KEY (employee_id)
);

CREATE TABLE departments (
    id INT NOT NULL AUTO_INCREMENT,
    department VARCHAR(30),
    PRIMARY KEY (id)
);

CREATE TABLE roles (
    role_id INT NOT NULL AUTO_INCREMENT,
    role VARCHAR(30),
    role_dept VARCHAR(30),
    role_sal INT NOT NULL,
    PRIMARY KEY (role_id)
);