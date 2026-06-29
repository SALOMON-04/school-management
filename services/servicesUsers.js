import db from "../db/database.js";
import Users from "../models/modelsUser.js"
import generPassword from "../utils/password.js";


//AJOUTER UN UTILISATEUR

const createUser = (nom, role, username) => {

    const  password = generPassword(nom) ; //génération du mot de passe automatique

    // Appel du models utilisateur
    const addUsers = new Users(nom, role, username, password);


    const insertUsers = db.prepare(`
            INSERT OR IGNORE INTO users(nom, role, username, password)
            VALUES(?, ?, ?, ?)
    `)
    
    const result = insertUsers.run(addUsers.nom, addUsers.role, addUsers.username, addUsers.password)

    console.log(`Mot de passe généré : ${password}`);


    // on retourne le résultat ET l'id généré, pour que createStudent/createTeacher puissent l'utiliser
    return result.lastInsertRowid ;
}



// AFFICHER LES UTILISATEUR

const getAllUsers = () => {
    return db.prepare(`
            SELECT * FROM users
    `).all();
};



// AFFICHER UN UTILISATEUR

const getUserById = (id) => {

    return db.prepare(`
            SELECT * FROM users
            WHERE id = ?
    `).get(id);

};



// RECHERCHE D'UN UTILISATUER PAR SON NOM ET MOT DE PASSE

const getUserByUsername = (username, password) => {
    return db.prepare(`
        SELECT * FROM users
        WHERE username = ? AND password = ?
    `).get(username, password);
};


// MODIFICATION D'UN UTILISATEUR

const updateUsers = (id, data) => {

    const updateUsersStmt = db.prepare(`
        UPDATE users SET  nom = ?, role = ?
        WHERE id = ?
    `);

    return updateUsersStmt.run(data.nom, data.role, id);
}



//SUPPRESION D'UN UTILISATEUR

const deleteUser = (id) => {


    //supression des lien entre les clé lien les differentes table d'utilisateur

    db.prepare(`UPDATE students SET user_id = NULL WHERE user_id = ?`).get(id)
    db.prepare(`UPDATE teachers SET user_id = NULL WHERE user_id = ?`).get(id)
    

    // cette condition permet de cibler toute les table ou se trouve la clé du de l'etudiant en verifiant l'id choisis lors de la supression
    if (student) {

        db.prepare(`DELETE FROM grades WHERE student_id = ?`).run(student.id);
        db.prepare(`DELETE FROM absences WHERE student_id = ?`).run(student.id);
        db.prepare(`DELETE FROM students WHERE id = ?`).run(student.id);
    
    }


    
    // cette condition permet de cibler toute les table ou se trouve la clé du teacher en verifiant l'id choisis lors de la supression
    if (teacher) {

        db.prepare(`UPDATE subjects SET teacher_id = NULL WHERE teacher_id = ?`).run(teacher.id);
        db.prepare(`DELETE FROM teachers WHERE id = ?`).run(teacher.id);
    
    }


    return db.prepare(`
            DELETE FROM users WHERE id = ?
    `).run(id);

};



export { createUser, getAllUsers, getUserByUsername, updateUsers, getUserById, deleteUser }