import db from "../db/database.js";
import Users from "../models/modelsUser.js"


//AJOUTER UN UTILISATEUR

const createUser = (nom, role, password) => {

    // Appel du models utilisateur
    const addUsers = new Users(nom, role, password) ;

    const insertUsers = db.prepare(`
            INSERT OR IGNORE INTO users(nom, role, password)
            VALUES(?, ?, ?)
    `)

    return insertUsers.run(addUsers.nom, addUsers.role, addUsers.password)
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

const getUserByNom = (nom, password) => {
    return db.prepare(`
        SELECT * FROM users
        WHERE nom = ? AND password = ?
    `).get(nom, password);
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