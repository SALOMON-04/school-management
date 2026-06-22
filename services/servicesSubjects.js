import db from "../db/database.js"
import Subject from "../models/modelsSubject.js"





// AJOUR UNE MATIERE

const createSubject = (nom) => {

  //AJOUT D'UNE MATIERE EN FONCTION DU MODEL SUBJECT

    const addSubject = new Subject(nom);

    const insertSubjects = db.prepare(`
        INSERT OR IGNORE INTO subjects (nom)
        VALUES(?)
        `);

  return insertSubjects.run(addSubject.nom);
};



//LISTE DES MATIERES

const getAllSubjects = () => {
  return db.prepare(`
            SELECT * FROM subjects
     `,).all();
};



//AFFICHER UNE MATIER 

const getSubjectById = (id) => {

  return db.prepare(`
            SELECT * FROM subjects
            WHERE id = ?
    `).get(id);
    
};


// AFFECTATION D'UNE MATIERE A UN PROF

const affectTeacherSubject = (subjectId, teacherId) => {

  const assign = db.prepare(`
            UPDATE subjects 
            SET teacher_id = ?
            WHERE id = ?
        `);

  return assign.run(teacherId, subjectId);
}


// MODIFIER UNE MATIERE


const updateASubject = (id, data) =>{

  const updateMatiere = db.prepare(`
      UPDATE subjects  SET nom = ? 
      WHERE id = ?
    `)

    return updateMatiere.run(data.nom, id)
}

// SUPPRESSION D'UNE MATIERE


const deleteSubject = (id) => {
  return db.prepare(`
            DELETE FROM subjects 
            WHERE  id = ?
        `).run(id)
};


export { createSubject, getAllSubjects, getSubjectById, updateASubject, affectTeacherSubject, deleteSubject }


