import db from "./database.js";



// TABLE USERS

const TableUsers = `
    CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nom TEXT NOT NULL,
    role TEXT NOT NULL,
    password TEXT NOT NULL
    )
` ;

db.exec(TableUsers);

const insertUsers = db.prepare(`
        INSERT INTO users(nom, role) 
        VALUES (?, ?)
`);



// TABLE STUDENTS

const TableStudents = `
    CREATE TABLE IF NOT EXISTS students(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        matricule TEXT UNIQUE NOT NULL,
        nom TEXT NOT NULL,
        prenom TEXT NOT NULL,
        age INTEGER NOT NULL,
        classe TEXT NOT NULL
    )
` ;

db.exec(TableStudents)


const insertStudents = db.prepare(`
        INSERT INTO students(matricule, nom, prenom, age, classe) 
        VALUES (?, ?, ?, ?, ?)
`);




// TABLES TEACHERS

const TableTeachers = `
    CREATE TABLE IF NOT EXISTS teachers(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nom TEXT NOT NULL,
        subject_id INTEGER

    )
` ;

db.exec(TableTeachers)

const insertTeachers = db.prepare(`
        INSERT INTO teachers(nom, subject_id) 
        VALUES (?, ?)
`);




// TABLE SUBJECTS

const TableSubjects = `
    CREATE TABLE IF NOT EXISTS subjects(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nom TEXT NOT NULL,
        teacher_id INTEGER,
        FOREIGN KEY (teacher_id) REFERENCES teachers(id)
    )
`;

db.exec(TableSubjects)

const insertSubjects = db.prepare(`
        INSERT INTO subjects(nom,  teacher_id) 
        VALUES (?, ?)
`)




// TABLE GRADES

const TableGrades = `
    CREATE TABLE IF NOT EXISTS grades(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        student_id INTEGER NOT NULL,
        subject_id INTEGER NOT NULL,
        note REAL NOT NULL CHECK(note >= 0 AND note <= 20),
        FOREIGN KEY (student_id) REFERENCES students(id),
        FOREIGN KEY (subject_id) REFERENCES subjects(id)
    )
`;

db.exec(TableGrades)

const insertGrades = db.prepare(`
        INSERT INTO grades(student_id, subject_id, note) 
        VALUES (?, ?, ?)
`);





// TABLE ABSENCE

const TableAbsence = `
    CREATE TABLE IF NOT EXISTS absences (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        student_id INTEGER NOT NULL,
        date TEXT NOT NULL,
        status TEXT NOT NULL ,
        FOREIGN KEY (student_id) REFERENCES students(id)
    )
` ;

db.exec(TableAbsence);



const insertAbsence = db.prepare(`
        INSERT INTO absences(student_id, date, status) 
        VALUES (?, ?, ?)
`);



