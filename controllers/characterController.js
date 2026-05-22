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
    if(!req.session.user){
        res.render("login",{
            title: "Login"
        })
    }else{
        res.render("index",{
            title: "Character creator",
            layout: false,
            user: req.session.user
        })}
};

function render_register_page(req,res){
    if(!req.session.user){
        res.render("register",{
            title: "Register",
        })
    }else{
        res.render("index",{
            title: "Character creator",
            layout: false,
            user: req.session.user
        })
    }
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


async function login(req,res){

    const username = req.body.username
    const password = req.body.password

    const current_user = await character_model.login(username, password)


    if(current_user !== null){
        const user_id = current_user.id

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

    const id = req.session.user.id

    const current_character = character_model.get_character_from_user_SQL(id);
    const inventory = character_model.get_inventory_from_SQL(id)

    if(!current_character){
        res.json({
        Error: "Cant find character from id"
        })
    }else{

        res.json({
            strength: current_character.strength,
            dexterity: current_character.dexterity,
            intelligence: current_character.intelligence,
            charisma: current_character.charisma,
            hp: current_character.hp,
            weapon_id: current_character.weapon_id,
            armor_id: current_character.armor_id,
            inventory: inventory
        })

    }
}

async function put_uppdated_character_stats(req, res){

    const id = req.session.user.id
    const saved_data = req.body;

    const uppdated_stats = saved_data.stats
    const inventory = saved_data.inventory

    const new_stats = await character_model.uppdate_character_stats(id, uppdated_stats, inventory);

    res.json({
        anser: new_stats
    })
}

async function delete_account(req,res){

    const password = req.body.password
    const username = req.body.username

    const current_user = req.session.user
    const id = current_user.id

    const was_deleted = await character_model.remove_account(id, password, username)

    if(was_deleted){
        req.session.destroy(()=>{
        res.redirect("/register")
        })
    } else{
        res.redirect("/settings")
    }

}

function log_out(req, res){

    req.session.destroy(()=>{
        res.redirect("/login")
    })

}

async function post_new_user(req, res){

    const username = req.body.username

    const password = req.body.password

    const rep_password = req.body.rep_password

    if(password === rep_password && username && password){
        const name_already_in_use = await character_model.add_new_user(username, password)  
        
        if(name_already_in_use === true){
            
            res.redirect("/register")

        }else{
            res.redirect("/")
        }
    } else{

        res.redirect("/register")

    }

    

}

function get_weapon(req, res){
    const id = Number(req.params.id)

    const returned_weapon = character_model.get_weapon_from_sql(id)

    res.json({
        weapon: returned_weapon.name,
    })
}

function get_armor(req, res){
    const id = Number(req.params.id)

    const returned_armor = character_model.get_armor_from_sql(id)

    res.json({
        armor: returned_armor.name,
    })
}

async function get_table_lengths(req, res){

    const weapon_length = await character_model.get_weapon_table_length();
    const armor_length = await character_model.get_armor_table_length();

    res.json({
        weapon_table_length: weapon_length,
        armor_table_length: armor_length
    })

}

function get_items_from_sql(req, res){

    const all_items = character_model.get_items_from_sql();

    res.json({
        items: all_items
    })

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
    log_out,
    delete_account,
    get_weapon,
    get_armor,
    get_table_lengths,
    get_items_from_sql
};
