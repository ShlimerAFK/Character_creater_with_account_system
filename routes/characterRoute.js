const express = require("express");
const router = express.Router();

const characterController = require("../controllers/characterController");


router.get("/", characterController.render_character_page);
router.get("/character_stats", characterController.get_character_stats);
router.put("/uppdate_stats", characterController.put_uppdated_character_stats);

router.get("/settings", characterController.render_account_settings_page)
router.post("/settings", characterController.delete_account)


router.get("/login", characterController.render_log_in_page);
router.post("/login", characterController.login)

router.get("/logout", characterController.log_out)


router.get("/register", characterController.render_register_page);
router.post("/register", characterController.post_new_user);

router.get("/weapon/:id", characterController.get_weapon)
router.get("/armor/:id", characterController.get_armor)

router.get("/lengths", characterController.get_table_lengths)
router.get("/items", characterController.get_items_from_sql)

module.exports = router;