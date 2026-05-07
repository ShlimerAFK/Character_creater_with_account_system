const { title } = require("node:process")
const character_model = require("../modes/characterModel")

// RENDER

function render_character_page(req,res){

    if(req.session.user){

        res.render("index",{
            title: "Character creator",
            layout: false,
            user: req.session.user
        })



    } else{

        res.render("login",{
            title: "Login",
        });
    }
};


function render_log_in_page(req,res){

    res.render("login",{
        title: "Login"
    })
};

function render_register_page(req,res){

    res.render("register",{
        title: "Register",

    })
};

function render_account_settings_page(req,res){

    if(req.session.user){
        res.render("accountSettings",{

            title: "Account Settings",
            user: req.session.user,

        })

    } else{

        res.render("login",{
            title: "Login",
        });

    }
};

// CRUD

function get_charecter_id(req, res){

    const user_information = req.session.user

    res.json({
        user_info: user_information
    })
}

function login(req,res){

    const username = req.body.username
    const password = req.body.password

    const current_user = character_model.login(username, password)
    const user_id = current_user.id

    if(current_user){
        req.session.user = {
            name: username,
            id: user_id

        }
  
        res.redirect("/")
    

    }else{
        res.redirect("/login")

    } 
}

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

function post_new_user(req, res){

    const username = req.body.username

    const password = req.body.password

    const rep_password = req.body.rep_password

    if(password === rep_password){
        character_model.add_new_user(username, password)
        res.redirect("/login")
    }else{
        res.redirect("/register")
    }


}

module.exports = {
    render_character_page,
    render_log_in_page,
    render_register_page,
    render_account_settings_page,
    get_character_stats,
    put_uppdated_character_stats,
    post_new_user,
    login,
    get_charecter_id
};
