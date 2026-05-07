
const { title } = require("node:process");

const { db } = require('../src/db')
const { character, user } = require('../src/schema')
const { eq } = require('drizzle-orm');
const bcrypt = require("bcrypt");


// Variable definitions

let strength;
let intelligence;
let charisma;
let dexterity;



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

        console.log(password_matches)

        if(current_user.username = username && password_matches){

            return current_user;

        } else {

            return false;
        }

    }catch(error){
        console.log(error)
    }

};


function remove_user(){};

function log_out(){};

function add_object_to_inventory(){};

function remove_object_from_inventory(){};

function change_max_hp(){};

function change_current_hp(){};

function change_armor(){};

function change_weapon(){};


module.exports = {

    add_new_user,
    remove_user,
    login,
    log_out,
    add_object_to_inventory,
    remove_object_from_inventory,
    change_max_hp,
    change_current_hp,
    change_armor,
    change_weapon,
    uppdate_character_stats,
    get_character_from_user_SQL,

    strength,
    intelligence,
    charisma,
    dexterity


}


