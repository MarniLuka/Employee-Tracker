INSERT INTO department (name)
VALUES ("Hobbit"),
        ("Man"),
        ("Elf"),
        ("Dwarf"),
        ("Wizard");

INSERT INTO role (title, salary)
VALUES ("Leader", 250000),
        ("Ring Bearer", 300000),
        ("Swordsman", 200000),
        ("Archer", 150000),
        ("Axeman", 150000),
        ("The True Hero", 500000),
        ("Comedic Relief", 100000);
    
INSERT INTO employee (first_name, last_name, manager_id)
VALUES ("Frodo", "Baggins", 2),
        ("Samwise", "Gamgee", 8),
        ("Pippin", "Took", 8),
        ("Merry", "Brandybuck", 8),
        ("Aragorn", "son of Arathorn", 8),
        ("Legolas", "Greenleaf", 5),
        ("Gimli", "son of Gloin", 5),
        ("Gandalf", "the White", NULL),
        ("Boromir", "son of Denethor", 5);