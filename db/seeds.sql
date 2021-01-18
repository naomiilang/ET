INSERT INTO employees (employee_ID, first_name, last_name, title, department, salary, manager)
VALUES
    (1,'Naomi', 'Lang', 'Keyholder', 'Visuals', 14, 'Nicole Lapointe'),
    (2, 'Grace', 'Oneil', 'Keyholder', 'Visuals', 14, 'Nicole Lapointe'),
    (3, 'Nicole', 'Lapointe', 'District Manager', 'Management', 30, 'Mallory'),
    (4, 'Idalis', 'Urbina', 'Sales', 'Retail', 14, 'Nicole Lapointe'),
    (5,'Callie', 'Nashif', 'Sales', 'Retail', 14, 'Nicole Lapointe'),
    (6, 'Maison', 'Snell', 'Sales', 'Retail', 14, 'Nicole Lapointe'),
    (7, 'Natalie', 'Wing', 'Sales', 'Retail', 14.25, 'Nicole Lapointe'),
    (8, 'Lizzie', 'Stegemoller', 'Schedule', 'Management', 16, 'Nicole Lapointe');

INSERT INTO departments (id, department)
VALUES
    (1, 'Visuals'),
    (2, 'Management'),
    (3, 'Retail');

INSERT INTO roles (role_id, role, role_dept, role_sal)
VALUES
    (1, 'District Manager', 'Management', 30),
    (2, 'Keyholder', 'Visuals', 14),
    (3, 'Schedule', 'Management', 16),
    (4, 'Sales', 'Retail', 14);