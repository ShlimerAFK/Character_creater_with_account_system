
const { title } = require("node:process");

const { db } = require('../src/db')
const { character } = require('../src/schema')
const { eq } = require('drizzle-orm');

// Variable definitions

main_weapon = "Sworb";

hp = 10;

armor = "Cardbord armor";

let strength;
let intelligence;
let charisma;
let dexterity;


inventory = [
    {
        Title: "Health potion",
        Info: "Heal 1d4"
    },
    {
        Title: "Haste potion",
        Info: "Add 100 foot movement" 
    }
]

user_credentials = [{
    id: 1,
    username: "admin",
    password: "pasword123",
    character: {
        strength: 5,
        dexterity: 5,
        intelligence: 5,
        charisma: 5
    }
}]


// Functions

function uppdate_character_stats(current_character, uppdated_stats){

    current_character.strength = uppdated_stats.strength;
    current_character.dexterity = uppdated_stats.dexterity;
    current_character.intelligence = uppdated_stats.intelligence;
    current_character.charisma = uppdated_stats.charisma;
    

}

function get_character_from_user_SQL(id){

    const rows = db.select().from(character).where(eq(character.id, id)).get();

    return rows;
}

function add_user(){};

function remove_user(){};

function log_in(){};

function log_out(){};

function add_object_to_inventory(){};

function remove_object_from_inventory(){};

function change_max_hp(){};

function change_current_hp(){};

function change_armor(){};

function change_weapon(){};


module.exports = {

    add_user,
    remove_user,
    log_in,
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


