const ConnectionUtil = require("../utils/Connections.js");
const BillingController = require("../controllers/BillingController");

module.exports.init = async (app) => {
    ConnectionUtil.connect();

    app.post("/billing/create/session", BillingController.createDropInSession);
    app.post("/billing/webhooks/events", BillingController.handlePaymentOutcome);
};
