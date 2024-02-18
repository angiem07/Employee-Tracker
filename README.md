# Employee Tracker
Modeule 12 Challenge

## Description
The Employee Tracker application is a command-line application that allows users to view and manage a company's employee database, using Node.js, Inquirer, and MySQL.
The purpose of this project is to build a command-line application from scratch that allows the user to add departments, roles, and employees. View all departments, roles, salaries, and employees, view employees by manager and update employee roles.

## Usage
1. Clone to your computer using SSH from GitHub:
```
git clone git@github.com:angiem07/Employee-Tracker.git
```
2. Install node dependencies by running:
```
npm install
```
3. Configure your MySQL user/password in the config/connection.js file
4. Add an .env file with the following items and populute with your credentials
```
DB_NAME='DB_NAME='employeetracker_db'
DB_USER=''
DB_PASSWORD=''
```
5. To build the database and tables and then seed/populate the tables run:
```
mysql -u root -p
SOURCE db/schema.sql
SOURCE db/seeds.sql
```

6. To start the application run in the command line:
```
npm start
```
7. You'll then be able to access the menu and select the option you want to view, add, or update. \

See video walkthrough:\


https://github.com/angiem07/Employee-Tracker/assets/143362421/86892999-e2bf-497e-a209-2a28dd904ccf



## Credits
References:\
https://www.w3schools.com/sql/sql_in.asp \
https://stackoverflow.com/questions/4587069/how-to-use-in-clause-in-mysql \
https://github.com/jscobie/EmployeeTracker/blob/main/README.md \
https://github.com/Danster4/employee-tracker/blob/main/README.md \
https://github.com/htariku/SQL-Employee-Tracker/blob/main/README.md
