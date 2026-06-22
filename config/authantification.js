import readline from "readline"; // "readline" va nous permettre de lire ce l'utilisateur va entré dans le terminale

import { getUserByNom } from "../services/servicesUsers.js"; 
import { getStudentByMatricule } from "../services/servicesStudents.js";
import { logger } from "../utils/logger.js";



// on va créer l'interface afin de pourvoir entré quelque chose et le reçevoir (inpunt et output)

const reponse = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


// cette ligne nous permet  de poser une question à 
// l'utilisateur et de recevoir une reponse

const question = (texte) => new Promise(resolve => reponse.question(texte, resolve));


const fermer = () => reponse.close(); 



// CONNEXION ADMIN ET PROFFESSEUR

const connexionUser = async (role) => {

    const nom = await question("Nom : ");

    const password = await question("Mot de passe : ");

    const user = getUserByNom(nom, password);


    // c'est condition vériffie l'existance de l'utilisateur,
    // son role te ses information

    if (!user) {
        
        console.log("Nom ou mot de passe incorrect.");
        return null;
    }


    if (user.role !== role) {
       
        console.log(`Ce compte n'est pas un ${role}.`);
        return null;
    }


    
    console.log(` Connecté : ${user.nom}`);
    return user;
};




// CONNEXION ETUDIANT

const connexionEtudiant = async () => {

    const matricule = await question("Matricule : ");
    const password = await question("Mot de passe : ");

    const etudiant = getStudentByMatricule(matricule);


    // c'est condition vériffie l'existance de l'étudiant,
    // son matricule te ses information

    if (!etudiant) {
        
        console.log("Matricule incorrect.");
        return null;
    }
    console.log(etudiant);

    
    // DEMANDER LE MOT DE PASS DE L'TUDIANT STOKER DANS LA TABLE USERS

    const user = getUserByNom(`${etudiant.prenom} ${etudiant.nom}`, password);
    console.log(user);
    
    if (!user) {
        
        
        console.log("Mot de passe incorrect.");
        return null;
    }

    
    console.log(` Connecté : ${etudiant.nom}  ${etudiant.prenom}`);
    return etudiant;
};




export { question, fermer, connexionUser, connexionEtudiant };