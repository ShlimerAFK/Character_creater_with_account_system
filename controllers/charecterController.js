const { title } = require("node:process")
const charecter_model = require("../modes/charecterModel")



function render_charecter_page(req,res){

    res.render("index",{
        title: "Charecter creator",
        strength: charecter_model.strength,
        dextarity: charecter_model.dexstarity,
        inteligence: charecter_model.intelligence,
        charisma: charecter_model.charisma
    })
};

function get_charecter_stats(req, res){

    let curent_charecter = charecter_model.get_charecter_from_user(1);
    
    res.json({
        strength: curent_charecter.strength,
        dexterity: curent_charecter.dexterity,
        intelligence: curent_charecter.intelligence,
        charisma: curent_charecter.charisma
    })
}

function post_uppdated_charecter_stats(req, res){

    const uppdated_stats = req.body.strength;

    res.json({
        anser: uppdated_stats
    })

    console.log(uppdated_stats)

}

function render_log_in_page(req,res){};

function render_register_page(req,res){};

function render_account_settings_page(req,res){};

module.exports = {
    render_charecter_page,
    render_log_in_page,
    render_register_page,
    render_account_settings_page,
    get_charecter_stats,
    post_uppdated_charecter_stats
};
