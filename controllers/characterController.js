const { title } = require("node:process")
const character_model = require("../modes/characterModel")



function render_character_page(req,res){

    res.render("index",{
        title: "Character creator",
    })
};

function get_character_stats(req, res){

    const id = Number(req.params.id);

    const current_character = character_model.get_character_from_user_SQL(id);

    if(!current_character){
        res.json({
        Error: "Not a valid id"
        })
    }else{

        res.json({
        strength: current_character.strength,
        dexterity: current_character.dexterity,
        intelligence: current_character.intelligence,
        charisma: current_character.charisma
        })
    }
}

function put_uppdated_character_stats(req, res){

    
    const uppdated_stats = req.body;

    let current_character = character_model.get_character_from_user_SQL(id);
    character_model.uppdate_character_stats(current_character, uppdated_stats);


    res.json({
        anser: uppdated_stats
    })

    console.log(uppdated_stats)

}

function render_log_in_page(req,res){};

function render_register_page(req,res){};

function render_account_settings_page(req,res){};

module.exports = {
    render_character_page,
    render_log_in_page,
    render_register_page,
    render_account_settings_page,
    get_character_stats,
    put_uppdated_character_stats
};
