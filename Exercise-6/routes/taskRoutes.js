const express = require('express');
const router = express.Router();



router.route("/").get().post().delete()

router.route("/id").get().patch().delete()

modules.exports = router;