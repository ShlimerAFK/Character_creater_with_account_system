
const { title } = require("node:process");

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
    charecter: {
        strength: 5,
        dexterity: 5,
        intelligence: 5,
        charisma: 5
    }
}]


// Functions

function uppdate_charecter_stats(charecter_stats){

    console.log(charecter_stats)

    strength = charecter_stats.strength
}

function get_charecter_from_user(input_id){


    let current_user;

    for(let i = 0; i < user_credentials.length; i++){

        if(input_id === user_credentials[i].id){
            
            current_user = user_credentials[i];
            return current_user.charecter;
            
        }
    }
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
    uppdate_charecter_stats,
    get_charecter_from_user,

    strength,
    intelligence,
    charisma,
    dexterity


}


