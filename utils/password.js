import {randomUUID} from "crypto";
import db from "../db/database.js"



const  carctere = ["@", "#", "!", "$", "%", "&", "*", "?", "_", "/"];

const symboles = () => carctere[Math.floor(Math.random() * carctere.length)] ;


const generPassword = () => {

    let password ;

    do {

        const nbrAleatoir = randomUUID().slice(0, 4)
        const majuscule = nbrAleatoir[0].toUpperCase() ;
        const minuscule = nbrAleatoir.slice(1).toLocaleLowerCase() ;
        const chiffre = Math.floor(Math.random() * 90) + 10 ;
        password = `${majuscule}${minuscule}${symboles()}${chiffre}` ;

    }while (db.prepare("SELECT 1 FROM users WHERE password = ?").get(password) ) ;
    
    return password ;
}

export default generPassword;