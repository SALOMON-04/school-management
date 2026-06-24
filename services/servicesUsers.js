import { use } from "react";
import db from "../db/database.js";
import Users from "../models/modelsUser.js"
import generPassword from "../utils/password.js";


//AJOUTER UN UTILISATEUR

const createUser = (nom, role, username) => {

    const  password = generPassword() ; //génération du mot de passe automatique

    // Appel du models utilisateur
    const addUsers = new Users(nom, role, username, password);


    const insertUsers = db.prepare(`
            INSERT OR IGNORE INTO users(nom, role, username, password)
            VALUES(?, ?, ?, ?)
    `)

    console.log(`Mot de passe généré : ${password}`);
    return insertUsers.run(addUsers.nom, addUsers.role, addUsers.username, addUsers.password)
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

const getUserByNom = (username, password) => {
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

    return db.prepare(`
            DELETE FROM users WHERE id = ?
    `).run(id);

};



export { createUser, getAllUsers, getUserByNom, updateUsers, getUserById, deleteUser }