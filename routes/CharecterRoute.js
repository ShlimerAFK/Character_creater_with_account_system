const express = require("express");
const router = express.Router();

const charecterController = require("../controllers/charecterController");


router.get("/", charecterController.render_charecter_page);
router.get("/charecter_stats", charecterController.get_charecter_stats);
router.put("/uppdate_stats", charecterController.post_uppdated_charecter_stats);


router.get("/login", charecterController.render_log_in_page);
router.get("/register", charecterController.render_register_page);

module.exports = router;