const { title } = require("node:process")
const character_model = require("../modes/characterModel")

// RENDER

function render_character_page(req,res){

    res.render("index",{
        title: "Character creator",
        layout: false
    })
};


function render_log_in_page(req,res){};

function render_register_page(req,res){};

function render_account_settings_page(req,res){

        res.render("accountSettings",{

            title: "Account Settings"
        })
};

// CRUD

function get_character_stats(req, res){

    const id = Number(req.params.id);

    const current_character = character_model.get_character_from_user_SQL(id);

    if(!current_character){
        res.json({
        Error: "Cant find character from id"
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

    const id = Number(req.params.id);
    const uppdated_stats = req.body;

    const new_stats = character_model.uppdate_character_stats(id, uppdated_stats);

    res.json({
        anser: new_stats
    })

    console.log(new_stats)

}

module.exports = {
    render_character_page,
    render_log_in_page,
    render_register_page,
    render_account_settings_page,
    get_character_stats,
    put_uppdated_character_stats
};
