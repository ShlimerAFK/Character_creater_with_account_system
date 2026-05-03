
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

const save_button = document.getElementById("save_button")

let strength;
let dexterity;
let intelligence;
let charisma;

const id = 1;


async function load_character(){

    const response = await fetch(`/character_stats/${id}`);
    const character_data = await response.json();

    console.log(character_data);


    strength = character_data.strength;
    dexterity = character_data.dexterity;
    intelligence = character_data.intelligence;
    charisma = character_data. charisma;


    str_value.innerText = strength;
    dex_value.innerText = dexterity;
    int_value.innerText = intelligence;
    cha_value.innerText = charisma;
    
}

async function save_character(){
    try{
        console.log("Posting")

        const response = await fetch(`/uppdate_stats/${id}`, {
            headers: {
            'Content-Type': 'application/json'
            },
            method: "PUT",
            body: JSON.stringify({
                strength: strength,
                dexterity: dexterity,
                intelligence: intelligence,
                charisma: charisma,
                id: 1
            })
        })
        const data = await response.json();

        console.log(data)
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


// Loose code 

window.onload = load_character();

save_button.addEventListener("click", () => save_character());

str_incrament.addEventListener("click", () => increase_stat("strength"));
str_decrament.addEventListener("click", () => decrease_stat("strength"));

dex_incrament.addEventListener("click", () => increase_stat("dexterity"));
dex_decrament.addEventListener("click", () => decrease_stat("dexterity"));

int_incrament.addEventListener("click", () => increase_stat("intelligence"));
int_decrament.addEventListener("click", () => decrease_stat("intelligence"));

cha_incrament.addEventListener("click", () => increase_stat("charisma"));
cha_decrament.addEventListener("click", () => decrease_stat("charisma"));
