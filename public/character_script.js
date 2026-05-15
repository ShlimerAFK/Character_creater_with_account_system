
// Code definitions

const str_value = document.getElementById("Strength_value_box");
const str_incrament = document.getElementById("Str_incrament_button");
const str_decrament = document.getElementById("Str_decrament_button");

const dex_value = document.getElementById("Dextarity_value");
const dex_incrament = document.getElementById("Dex_incrament_button");
const dex_decrament = document.getElementById("Dex_decrament_button");

const int_value = document.getElementById("Inteligence_value_box");
const int_incrament = document.getElementById("Int_incrament_button");
const int_decrament = document.getElementById("Int_decrament_button");

const cha_value = document.getElementById("Charisma_value_box");
const cha_incrament = document.getElementById("Cha_incrament_button");
const cha_decrament = document.getElementById("Cha_decrament_button");

const hp_value = document.getElementById("hp_value_text");
const hp_incrament = document.getElementById("hp_incrament_button");
const hp_decrament = document.getElementById("hp_decrament_button");
const hp_helth_state = document.getElementById("hp_bottom_text")

const current_weapon = document.getElementById("current_weapon");
const weapon_button = document.getElementById("weapon_button");

const current_armor = document.getElementById("current_armor")
const armor_button = document.getElementById("armor_button");

const inventory_add_button = document.getElementById("inventory_add_button")

const item_select = document.getElementById("item_select")

const inventory_box = document.getElementById("inventory_items_box")

const save_button = document.getElementById("save_button")

let strength;
let dexterity;
let intelligence;
let charisma;

let hp;

let weapon_id;
let armor_id;

let weapon_table_length;
let armor_table_length;

let items_list
let inventory_list;


async function load_character(){

    const table_response = await fetch(`/lengths`);
    const table_data = await table_response.json();

    weapon_table_length = table_data.weapon_table_length
    armor_table_length = table_data.armor_table_length
    

    const charecter_response = await fetch(`/character_stats`);
    const character_data = await charecter_response.json();

    strength = character_data.strength;
    dexterity = character_data.dexterity;
    intelligence = character_data.intelligence;
    charisma = character_data. charisma;
    hp = character_data.hp;
    weapon_id = character_data.weapon_id;
    armor_id = character_data.armor_id;
    inventory_list = character_data.inventory;

    str_value.innerText = strength;
    dex_value.innerText = dexterity;
    int_value.innerText = intelligence;
    cha_value.innerText = charisma;
    hp_value.innerText = hp

    current_weapon.innerText = weapon_id;
    current_armor.innerText = armor_id;

    uppdate_helth_state();
    get_weapon_data();
    get_armor_data();
    get_all_items();
    uppdate_inventory_div_contetnt();
    
}

async function save_character(){
    try{
        console.log(inventory_list)

        const response = await fetch(`/uppdate_stats`, {
            headers: {
            'Content-Type': 'application/json'
            },
            method: "PUT",
            body: JSON.stringify({
                stats: {
                    strength: strength,
                    dexterity: dexterity,
                    intelligence: intelligence,
                    charisma: charisma,
                    hp: hp,
                    weapon_id: weapon_id,
                    armor_id: armor_id,
                },
                inventory: inventory_list
            })
        })
        //const data = await response.json();

    }catch(error){
        console.log(error)
    }
}

function increase_stat(stat){

    if(stat === "strength" && strength < 10){
        strength ++;
        str_value.innerText = strength;

    }

    else if(stat === "dexterity" && dexterity < 10){
        dexterity++;
        dex_value.innerText = dexterity

    }else if(stat === "intelligence" && intelligence < 10){
        intelligence++;
        int_value.innerText = intelligence

    }else if(stat === "charisma" && charisma < 10){
        charisma++;
        cha_value.innerText = charisma
    }
};

function decrease_stat(stat){

    if(stat === "strength" && strength > 1){
        strength--;
        str_value.innerText = strength;
    }

    else if(stat === "dexterity" && dexterity > 1){
        dexterity--;
        dex_value.innerText = dexterity;

    }else if(stat === "intelligence" && intelligence > 1){
        intelligence--;
        int_value.innerText = intelligence;

    }else if(stat === "charisma" && charisma > 1){
        charisma--;
        cha_value.innerText = charisma;
    }
};

function uppdate_helth_state(){

    if(hp == 30){
        hp_helth_state.innerText = "Full health"
    } else if(30 > hp && hp > 10){
        hp_helth_state.innerText = "Damaged"
    } else if(15 >= hp && hp > 0){
        hp_helth_state.innerText = "Badly damaged"
    } else if(0 >= hp && hp > -30){
        hp_helth_state.innerText = "Knoked"
    } else if(hp == -30){
        hp_helth_state.innerText = "Dead"
    }

}

function change_health(change_value){

    
    if(hp < 30 && change_value > 0|| hp > -30 && change_value < 0){

        hp += change_value

        hp_value.innerText = hp

        uppdate_helth_state()
    }

}

async function increase_weapon_index(){
    weapon_id += 1;
    
    if(weapon_id > weapon_table_length){
        weapon_id = 1;
    }

    get_weapon_data()

}

function increase_armor_index(){
    armor_id += 1;

    console.log(armor_table_length)

    if(armor_id > armor_table_length){
        armor_id = 1;
    }

    get_armor_data()

}

async function get_weapon_data(){

    const response = await fetch(`/weapon/${weapon_id}`);
    const data = await response.json();

    current_weapon.innerText = data.weapon;
}

async function get_armor_data(){

    const response = await fetch(`/armor/${armor_id}`);
    const data = await response.json();

    current_armor.innerText = data.armor;
}

function add_item_to_inventory(){

    if(item_select.value && inventory_box.childElementCount < 12){

        for(let i = 0; i < items_list.length; i++){

            if(item_select.value === items_list[i].name){

                inventory_list.push({
                    name: item_select.value,
                    item_id: items_list[i].id
                }); 

                console.log(inventory_list)
            }
        }

        inventory_box.innerHTML = ""

        uppdate_inventory_div_contetnt()
    }

}

function remove_item_from_inventory(element){

    const elemtent_id = element.id

    for(let i = 0; i < inventory_list.length; i++){

        if(i = elemtent_id){

            inventory_list.splice(i,1);
            console.log(inventory_list)

            inventory_box.innerHTML = ""

            uppdate_inventory_div_contetnt()

            return
        }
    }


}

function uppdate_inventory_div_contetnt(){

    for(let i = 0; i < inventory_list.length; i++){
        inventory_box.innerHTML += `<div id="${i}" onclick="remove_item_from_inventory(this)"> <p> ${inventory_list[i].name} </p> </div>`
    }

}

async function get_all_items(){

    const response = await fetch(`/items`);
    const data = await response.json();

    items_list = data.items

    console.log(items_list)

    for(let i = 0; i < items_list.length; i++){

        item_select.innerHTML += `<option id="${data.items[i].id}" value="${data.items[i].name}"> ${data.items[i].name} </option>`

    
    }
}

// Loose code 


window.onload = load_character;


save_button.addEventListener("click", () => save_character());

str_incrament.addEventListener("click", () => increase_stat("strength"));
str_decrament.addEventListener("click", () => decrease_stat("strength"));

dex_incrament.addEventListener("click", () => increase_stat("dexterity"));
dex_decrament.addEventListener("click", () => decrease_stat("dexterity"));

int_incrament.addEventListener("click", () => increase_stat("intelligence"));
int_decrament.addEventListener("click", () => decrease_stat("intelligence"));

cha_incrament.addEventListener("click", () => increase_stat("charisma"));
cha_decrament.addEventListener("click", () => decrease_stat("charisma"));


hp_incrament.addEventListener("click", () => change_health(1))
hp_decrament.addEventListener("click", () => change_health(-1))

weapon_button.addEventListener("click", () => increase_weapon_index())
armor_button.addEventListener("click", () => increase_armor_index())

inventory_add_button.addEventListener("click", () => add_item_to_inventory())   