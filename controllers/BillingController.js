const Models = require("../models");
const axios = require("axios");

module.exports.handlePaymentOutcome = async (req, res) => {

};

module.exports.createDropInSession = async (req, res) => {
    const config = {
        headers: {

            "x-API-key": process.env.ADYEN_API_KEY,
            "Content-Type": "application/json"
        }
    };

    const data = {
        merchantAccount: process.env.ADYEN_MERCHANT_ACCOUNT,
        amount: {
            value: req.body.amount,
            currency: req.body.currency
        },
        reference: "12324abc",
        countryCode: "NL",
        returnUrl: "http://localhost/billing/result"
    };

    axios.post(`${process.env.ADYEN_API}/sessions`, data, config)
        .then(function (response) {
            res.send({
                success: true,
                data: {
                    sessionData: response.data.sessionData,
                }
            });
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        });
};
