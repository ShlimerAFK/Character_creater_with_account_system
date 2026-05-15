
const { title } = require("node:process");

const { db } = require('../src/db')
const { character, user, weapon, armor, item, ownership } = require('../src/schema')
const { eq, count } = require('drizzle-orm');
const bcrypt = require("bcrypt");



// Functions


async function uppdate_character_stats(id, uppdated_stats, input_inventory){

    const inventory = input_inventory

    console.log("uppdate: " + inventory[0])

    db.update(character).set(uppdated_stats).where(eq(character.user_id, id)).run();

    const current_character = db.select().from(character).where(eq(character.user_id, id)).get();

    db.delete(ownership).where(eq(ownership.char_id, current_character.id)).run();

    for(let i = 0; i < inventory.length; i++){

        await db.insert(ownership).values({
            char_id: current_character.id,
            item_id: inventory[i].item_id
            })
    }

    return current_character
    
}

function get_character_from_user_SQL(id){

    const current_character = db.select().from(character).where(eq(character.user_id, id)).get();

    return current_character;
}

function get_inventory_from_SQL(id){

    const current_charecter = db.select().from(character).where(eq(character.user_id, id)).get();
    const character_id = current_charecter.id;

    const current_ownership = db.select().from(ownership).where(eq(ownership.char_id, character_id)).all();

    const inventory = [];

    for(let i = 0; i < current_ownership.length; i++){

        const current_item = db.select().from(item).where(eq(item.id, current_ownership[i].item_id)).get();

        inventory.push({
            name: current_item.name,
            item_id: current_item.id
        })
        
    }


    return inventory
}

async function add_new_user(name, password){

    const username = name
    const encrypted_password = await bcrypt.hash(password, 10)

    const existing_user = db.select().from(user).where(eq(user.username, username)).get();

    if(!existing_user){
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
                hp: 30,
                weapon_id: 1,
                armor_id: 1,
                user_id: id
            })
        // })

        return false
        

        }catch(error){
            console.log(error)
        }
    }else{

        return true
    }

};


async function login(input_username, input_password){

    try{
        const username = input_username;
        const password = input_password;


        const current_user = db.select().from(user).where(eq(user.username, username)).get();

        if(current_user){

            const password_matches = await bcrypt.compare(password, current_user.password)

            if(current_user.username === username && password_matches === true){

                return current_user;

            } else {
                return null;
        }
        }else{

            return null
        }


        

    }catch(error){
        console.log(error)
    }

};


async function remove_account(input_id, input_password, input_username){

    const id = input_id
    const password = input_password
    const username = input_username

    current_user = db.select().from(user).where(eq(user.id, id)).get();

    const password_matches = await bcrypt.compare(password, current_user.password)
    

    if(current_user.username == username && password_matches === true){
        
        const character_result = db.delete(character).where(eq(character.user_id, id)).run();
        const user_result = db.delete(user).where(eq(user.id, id)).run();

        if( character_result.changes === 0 || user_result.changes === 0){
            console.log("Error")

            return false

        } else{
            return true
        }
    }else{

        return false
    }
}

function get_weapon_from_sql(input_id){

    const id = input_id
    const current_weapon = db.select().from(weapon).where(eq(weapon.id, id)).get()

    return current_weapon
}

function get_armor_from_sql(input_id){

    const id = input_id
    const current_armor = db.select().from(armor).where(eq(armor.id, id)).get()


    return current_armor
}

async function get_weapon_table_length(){

    const length = await db.select({ count: count() }).from(weapon);

    return length[0].count
}

async function get_armor_table_length(){

    const length = await db.select({ count: count() }).from(armor);

    return length[0].count
}

function get_items_from_sql(){

    const items = db.select().from(item).all()


    return items
}


module.exports = {

    add_new_user,
    login,
    uppdate_character_stats,
    get_character_from_user_SQL,
    remove_account,
    get_weapon_from_sql,
    get_armor_from_sql,
    get_weapon_table_length,
    get_armor_table_length,
    get_items_from_sql,
    get_inventory_from_SQL

}


