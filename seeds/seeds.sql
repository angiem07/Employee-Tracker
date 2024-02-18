USE employeetracker_db;

INSERT INTO department (name)
VALUES
  ('Engineering'),
  ('Marketing'),
  ('Sales');

INSERT INTO role (title, salary, department_id)
VALUES
  ('Software Engineer', 80000, 1),
  ('Marketing Specialist', 60000, 2),
  ('Sales Representative', 70000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
  ('John', 'Doe', 1, NULL),
  ('Jane', 'Smith', 2, 1),
  ('Michael', 'Johnson', 3, 1);
  
  