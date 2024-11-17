const express = require("express");
const expressWs = require("express-ws");

const app = express();
expressWs(app); // This adds WebSocket support to your app

const router = express.Router();
const { detectCollision } = require("../controllers/CollisionDetection");

router.ws('/collision', detectCollision);

app.use(router);

module.exports = router;