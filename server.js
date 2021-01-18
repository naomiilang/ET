const mysql = require('mysql2');
const inquirer = require('inquirer');
const ctable = require('console.table');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    // Your MySQL username
    user: 'root',
    // Your MySQL password
    password: 'Northx808!',
    database: 'etDB'
});

connection.connect(err => {
    if (err) throw err;
    console.log('connected as id' + connection.threadId);
    initialPrompt();
});

const initialPrompt = async () => {
    inquirer.prompt([
        {
            type: 'list',
            name: 'select',
            message: 'What would you like to do?',
            choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Delete Employee', 'Exit']
        }
    ]).then(answers => {
        switch (answers.select) {
            case 'View all employees':
                showEmployees();
                initialPrompt();
                break;
            case 'View all roles':
                showRoles();
                initialPrompt();
                break;
            case 'View all departments':
                showDept();
                initialPrompt();
                break;
            case 'Add a department':
                addDept();
                break;
            case 'Delete Employee':
                deleteEmployee();
                break;
            case 'Add an employee':
                addEmployee();
                break;
            case 'Add a role':
              addRole();
              break;
        }

    })
};

showEmployees = () => {
    connection.query(
        `SELECT * FROM employees`,
        function (err, results, fields) {
            console.table(results);
            initialPrompt();
        }
    )
};

showRoles = () => {
    connection.query(
        `SELECT * FROM roles`,
        function (err, results, fields) {
            console.table(results);
            initialPrompt();
        }
    )
};

showDept = () => {
    connection.query(
        `SELECT * FROM departments`,
        function (err, results, fields) {
            console.table(results);
            initialPrompt();
        }
    )
};

addDept = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'addDept',
            message: 'What is the name of this department?',
            validate: addDeptInput => {
                if (addDeptInput) {
                    return true;
                } else {
                    console.log('Please enter a department name!');
                    return false;
                }
            }
        }
    ]).then(answers = (userInput) => {
        console.log(userInput);
        const query = connection.query(
            'INSERT INTO departments SET ?',
            {
                department: userInput.addDept
            },
            function (err, res) {
                if (err) throw err;
                showDept();
            }
        );
        console.log(query.sql);
    })
};

addRole = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'role',
            message: 'Enter the title of the new role',
            validate: roleInput => {
                if (roleInput) {
                    return true;
                } else {
                    console.log('Please enter a role!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'role_dept',
            message: 'What department is this role in?',
            validate: role_deptInput => {
                if (role_deptInput) {
                    return true;
                } else {
                    console.log('Please enter a department!');
                    return false;
                }
            }
        }, {
            type: 'input',
            name: 'role_sal',
            message: 'Enter the salary of the new role',
            validate: role_salInput => {
                if (role_salInput) {
                    return true;
                } else {
                    console.log('Please enter a salary!');
                    return false;
                }
            }
        }
    ]).then(answers = (userInput) => {
        console.log(userInput);
        const query = connection.query(
            'INSERT INTO roles SET ?',
            {
                role: userInput.role,
                role_dept: userInput.role_dept,
                role_sal: userInput.role_sal

            },
            function (err, res) {
                if (err) throw err;
                showDept();
            }
        );
        console.log(query.sql);
    })
};

addEmployee = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'first',
            message: 'What is the first name of this employee?',
            validate: firstInput => {
                if (firstInput) {
                    return true;
                } else {
                    console.log('Please enter a first name!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'last',
            message: 'What is the last name of this employee?',
            validate: lastInput => {
                if (lastInput) {
                    return true;
                } else {
                    console.log('Please enter a last name!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'role',
            message: 'What is this employee"s role?',
            validate: roleInput => {
                if (roleInput) {
                    return true;
                } else {
                    console.log('Please enter a role!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'manager',
            message: 'Who is their manager?',
            validate: managerInput => {
                if (managerInput) {
                    return true;
                } else {
                    console.log('Please enter a manager!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'department',
            message: 'What department are they in?',
            validate: departmentInput => {
                if (departmentInput) {
                    return true;
                } else {
                    console.log('Please enter a department!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'salary',
            message: 'What is their salary?',
            validate: salaryInput => {
                if (salaryInput) {
                    return true;
                } else {
                    console.log('Please enter a salary!');
                    return false;
                }
            }
        }
    ]).then(answers = (userInput) => {
        console.log(userInput);
        const query = connection.query(
            'INSERT INTO employees SET ?',
            {
                first_name: userInput.first,
                last_name: userInput.last,
                title: userInput.role,
                manager: userInput.manager,
                department: userInput.department,
                salary: userInput.salary

            },
            function (err, res) {
                if (err) throw err;
                console.log(res);
                showEmployees();
            }
        );
        console.log(query.sql);
    })
};


deleteEmployee = () => {
    connection.query(
        `SELECT CONCAT (first_name, " ", last_name) AS full_name
        FROM employees`,
        function (err, res) {
            if (err) throw err;
            res = JSON.stringify(res);
            let fullName = JSON.parse(res);
            fullName = fullName.map(obj => {
                return obj.full_name;
            })
            return inquirer.prompt([
                {
                    type: 'list',
                    name: 'delEmp',
                    message: 'Select an employee to delete',
                    choices: fullName
                }
            ]).then(convert = (answers) => {

                console.log(answers);
                let newArray = answers.delEmp.split(' ');
                connection.query(
                    `DELETE FROM employees WHERE first_name = "${newArray[0]}" AND last_name = "${newArray[1]}"`,
                    function (err, res) {
                        if (err) throw err;
                        showEmployees();
                    }
                )
            })
        }
    )
};

