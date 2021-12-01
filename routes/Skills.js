const ConnectionUtil = require("../utils/Connections.js");
const SkillsController = require("../controllers/SkillsController");

module.exports.init = async (app) => {
    ConnectionUtil.connect();

    app.get("/skills", SkillsController.get);
    app.get("/skills/:id", SkillsController.show);
    app.post("/skills", SkillsController.create);
    app.put("/skills/:id", SkillsController.update);
    app.delete("/skills/:id", SkillsController.delete);
};
