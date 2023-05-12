USE employees_db;

INSERT INTO department(name)
VALUES ('Chips');

INSERT INTO role(title, salary, department_id)
VALUES ('Captain', 100, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Ishmael', 'Ahab', 1,);