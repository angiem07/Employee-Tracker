const inquirer = require('inquirer');
const db = require('./config/connection');

// All Question Arrays
const startMenuQuestion = [
  {
    type: 'list',
    name: 'startMenuQuestion',
    message: 'What would you like to do?',
    choices: [
      "View all Roles",
      "Add a Role",
      "View all Departments",
      "Add a Department",
      "View all Employees",
      "Add an Employee",
      "Update Employee role"
    ]
  }
]

const addRoleQuestions = [
  {
    type: 'input',
    name: 'title',
    message: 'What is the title of the new role?'
  },
  {
    type: 'input',
    name: 'salary',
    message: 'What is the salary of the new role? (numbers only, i.e. 100000)'
  },
  {
    type: 'input',
    name: 'department',
    message: 'What department is the new role in? Type the id number only of the department table shown above. (i.e. 4)'
  }
]

const addDepartmentQuestion = [
  {
    type: 'input',
    name: 'name',
    message: 'What is the name of the new department?'
  }
]

const addEmployeeQuestions = [
  {
    type: 'input',
    name: 'first_name',
    message: 'What is the first name of the new employee?'
  },
  {
    type: 'input',
    name: 'last_name',
    message: 'What is the last name of the new employee?'
  },
  {
    type: 'input',
    name: 'role_id',
    message: 'What role is the new employee in? Type the id number only of the role table shown above. (i.e. 4)'
  },
  {
    type: 'input',
    name: 'manager_id',
    message: 'Who is the manager for the new employee? Type the id number only of the table shown above. (i.e. 4)'
  }
]

const chooseEmployeeQuestion = [
  {
    type: 'input',
    name: 'employee_id',
    message: 'Which employee would you like to update? Type the id number only of the table shown above. (i.e. 4)'
  },
]

const updateEmployeeRoleQuestion = [
  {
    type: 'input',
    name: 'role_id',
    message: 'What new role would you like for your employee? Type the id number only of the table shown above. (i.e. 4)'
  },
]

// All functions to use for manipulating MySQL database
const addRole = async () => {
  try {
    const result = await inquirer.prompt(addRoleQuestions);
    const sql = `INSERT INTO role (title, salary, department_id) VALUES (?,?,?)`;
    const params = [result.title, result.salary, result.department];
    const [rows, fields] = await db.execute(sql, params);
    console.log("");
    console.table(rows);
    startMenu();
  } catch (error) {
    console.error('Error adding role:', error);
    startMenu();
  }
};

const addDepartment = async () => {
  try {
    const result = await inquirer.prompt(addDepartmentQuestion);
    const sql = `INSERT INTO department (name) VALUES (?)`;
    const params = [result.name];
    const [rows, fields] = await db.execute(sql, params);
    console.log("");
    console.table(rows);
    startMenu();
  } catch (error) {
    console.error('Error adding department:', error);
    startMenu();
  }
};

const addEmployee = async () => {
  try {
    const result = await inquirer.prompt(addEmployeeQuestions);
    const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`;
    const params = [result.first_name, result.last_name, result.role_id, result.manager_id];
    const [rows, fields] = await db.execute(sql, params);
    console.log("");
    console.table(rows);
    startMenu();
  } catch (error) {
    console.error('Error adding employee:', error);
    startMenu();
  }
};

const chooseEmployee = async () => {
  try {
    const result = await inquirer.prompt(chooseEmployeeQuestion);
    const [rows, fields] = await db.execute('SELECT role.id, role.title FROM role');
    console.log("");
    console.table(rows);
    updateEmployeeRole(result.employee_id);
  } catch (error) {
    console.error('Error:', error);
    startMenu();
  }
};

const updateEmployeeRole = async (employeeID) => {
  try {
    const result = await inquirer.prompt(updateEmployeeRoleQuestion);
    const sql = `UPDATE employee SET role_id = ? WHERE id = ?`;
    const params = [result.role_id, employeeID];
    const [rows, fields] = await db.execute(sql, params);
    console.log("");
    console.table(rows);
    startMenu();
  } catch (error) {
    console.error('Error updating employee role:', error);
    startMenu();
  }
};

// startMenu function acts as switchboard for options to manipulate database
const startMenu = async () => {
  try {
    const result = await inquirer.prompt(startMenuQuestion);
    switch (result.startMenuQuestion) {
      case "View all Roles":
        const [rolesRows] = await db.execute('SELECT role.id, role.title, role.salary, department.name AS department_name FROM role LEFT JOIN department ON role.department_id = department.id');
        console.log("");
        console.table(rolesRows);
        startMenu();
        break;
      case "Add a Role":
        const [departmentsRows] = await db.execute('SELECT * FROM department');
        console.log("");
        console.table(departmentsRows);
        addRole();
        break;
      case "View all Departments":
        const [departmentsRows2] = await db.execute('SELECT * FROM department');
        console.log("");
        console.table(departmentsRows2);
        startMenu();
        break;
      case "Add a Department":
        addDepartment();
        break;
      case "View all Employees":
        const [employeesRows] = await db.execute("SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;");
        console.log("");
        console.table(employeesRows);
        startMenu();
        break;
      case "Add an Employee":
        const [rolesRows2] = await db.execute('SELECT role.*, department.name AS department_name FROM role LEFT JOIN department ON role.department_id = department.id');
        console.log("");
        console.table(rolesRows2);
        const [employeesRows2] = await db.execute('SELECT employee.*, role.title AS role_title FROM employee LEFT JOIN role ON employee.role_id = role.id');
        console.log("");
        console.table(employeesRows2);
        addEmployee();
        break;
      case "Update Employee role":
        const [employeesRows3] = await db.execute('SELECT employee.id, employee.first_name, employee.last_name FROM employee');
        console.log("");
        console.table(employeesRows3);
        chooseEmployee();
        break;
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

// startApp function to welcome user and routes to main startMenu function as switchboard for app
const startApp = async () => {
  try {
    await db.connect();
    console.log('Connected to the database');
    console.log('Welcome to the Employee Tracker!');
    console.log('Please choose an option below to get started:');
    await startMenu();
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
};

// calls startApp function to begin app
startApp();
