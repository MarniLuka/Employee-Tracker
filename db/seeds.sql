INSERT INTO department (name)
VALUES ("Hobbit"),
        ("Man"),
        ("Elf"),
        ("Dwarf"),
        ("Wizard");

INSERT INTO role (title, salary, department_id)
VALUES ("Leader", 250000, 5),
        ("Ring Bearer", 300000, 1),
        ("Swordsman", 200000, 2),
        ("Archer", 150000, 3),
        ("Axeman", 150000, 4),
        ("The True Hero", 500000, 1),
        ("Comedic Relief", 100000, 1);
    
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Frodo", "Baggins", 2, 2),
        ("Samwise", "Gamgee", 6, 8),
        ("Pippin", "Took", 7, 8),
        ("Merry", "Brandybuck", 7, 8),
        ("Aragorn", "son of Arathorn", 3, 8),
        ("Legolas", "Greenleaf", 4, 5),
        ("Gimli", "son of Gloin", 5, 5),
        ("Gandalf", "the White", 1, NULL),
        ("Boromir", "son of Denethor", 3, 5);