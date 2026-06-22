import db from "../db/database.js";
import Teacher from "../models/modelsTeacher.js";
import { createUser } from "./servicesUsers.js";


// CREER UN PROFFESSEUR

const createTeacher = (nom, subject_id, password) => {

    // CREATION DU PROF EN FONCTION DU MODULE

    const appTeacher = new Teacher(nom, subject_id, password) ;

    const insertTeachers = db.prepare(`
            INSERT OR IGNORE INTO teachers(nom, subject_id)
            VALUES(?, ?)
        `);

        // INSERT LES INFO DU PROFDANS LA TABLE DES UITILISATEURS
        createUser(nom, "professeur", password);

       return insertTeachers.run(appTeacher.nom, appTeacher.subject_id);

       
};




// AFFICHER LES PROFFESSEUR

const getAllTeacher = () => {
    return db.prepare(`
            SELECT * FROM teachers
        `).all();
};

// AFFICHE LE PROF EN PRECISENT LE NOM MATIERRE ET NON L'ID DE LA MATIERE

const getAllTeacherAvecMatiere = () => {

    return db.prepare(`
        SELECT teachers.id, teachers.nom, subjects.nom AS matiere
        FROM teachers
        LEFT JOIN subjects ON teachers.subject_id = subjects.id  
    `).all();
    
};



// AFFICHER UN PROFFESSEUR

const getTeacherById = (id) => {
    return db.prepare(`
            SELECT * FROM teachers
            WHERE id = ?
        `).get(id);
};




// MODIFIER UN UTILISATEUR

const updateTeacher = (id, data) => {

    const updateTeacherStmt = db.prepare(`
        UPDATE teachers SET  nom = ?, subject_id = ?
        WHERE id = ?
    `);
    return updateTeacherStmt.run(data.nom, data.subject_id, id);
}



// SUPPRIMER UN UTILISATEUR

const deleteTeacher = (id) => {

    // DESACTIVATION DE TEACHER_ID DANS LA TABLE SUBJECT ET REN LA COLONE NULL
    
    db.prepare(` 
             UPDATE subjects SET teacher_id = NULL WHERE teacher_id = ?
        `).run(id) ;

    // SUPRESSION DU PROFESSEUR PAR SON ID

    return db.prepare(`
            DELETE FROM teachers WHERE id = ?
        `).run(id);
};



export { createTeacher, getAllTeacher, getAllTeacherAvecMatiere, getTeacherById, updateTeacher, deleteTeacher}