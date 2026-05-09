
const { title } = require("node:process");

const { db } = require('../src/db')
const { character, user } = require('../src/schema')
const { eq } = require('drizzle-orm');
const bcrypt = require("bcrypt");



// Functions


function uppdate_character_stats(id, uppdated_stats){

    db.update(character).set(uppdated_stats).where(eq(character.id, id)).run();

    const new_stats = db.select().from(character).where(eq(character.id, id)).get();

    return new_stats;
    
}

function get_character_from_user_SQL(id){

    const rows = db.select().from(character).where(eq(character.id, id)).get();

    return rows;
}

async function add_new_user(name, password){

    const username = name
    const encrypted_password = await bcrypt.hash(password, 10)

    try{

        // await db.transaction(async (tx) => {

            await db.insert(user).values({
                username: username,
                password: encrypted_password

            });

            const new_user = db.select().from(user).where(eq(user.username, username)).get();
            const id = new_user.id

            await db.insert(character).values({
            name: "username",
            strength: 5,
            dexterity: 5,
            intelligence: 5,
            charisma: 5,
            user_id: id
        })
    // })

    }catch(error){
        console.log(error)
    }

};


function login(input_username, input_password){

    try{
        const username = input_username;
        const password = input_password;

        const current_user = db.select().from(user).where(eq(user.username, username)).get();

        const password_matches = bcrypt.compare(password, current_user.password)


        if(current_user.username = username && password_matches){

            return current_user;

        } else {

            return false;
        }

    }catch(error){
        console.log(error)
    }

};


function remove_account(input_id, input_password, input_username){

    const id = input_id
    const password = input_password
    const username = input_username

    current_user = db.select().from(user).where(eq(user.id, id)).get();

    const password_matches = bcrypt.compare(password, current_user.password)

    if(current_user.username == username && password_matches){
        
        const character_result = db.delete(character).where(eq(character.user_id, id)).run();
        const user_result = db.delete(user).where(eq(user.id, id)).run();

        if( character_result.changes === 0 || user_result.changes === 0){
            console.log("Error")
        } else{
            return true
        }
    }
}



module.exports = {

    add_new_user,
    login,
    uppdate_character_stats,
    get_character_from_user_SQL,
    remove_account

}


