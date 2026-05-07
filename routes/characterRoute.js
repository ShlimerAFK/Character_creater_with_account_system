const express = require("express");
const router = express.Router();

const characterController = require("../controllers/characterController");


router.get("/", characterController.render_character_page);
router.get("/character_stats/:id", characterController.get_character_stats);
router.put("/uppdate_stats/:id", characterController.put_uppdated_character_stats);

router.get("/settings", characterController.render_account_settings_page)

router.get("/login", characterController.render_log_in_page);
router.post("/login", characterController.login)


router.get("/register", characterController.render_register_page);
router.post("/register", characterController.post_new_user);

module.exports = router;