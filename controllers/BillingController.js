const Models = require("../models");
const axios = require("axios");

module.exports.handlePaymentOutcome = async (req, res) => {
    const { notificationItems, live } = req.body;
    notificationItems.forEach(async ({ NotificationRequestItem }) => {
        const transaction_id = NotificationRequestItem.merchantReference;
        await Models.Transaction.findOneAndUpdate({
            session_id: NotificationRequestItem.additionalData.checkoutSessionId
        }, {
            $push: {
                notifications: NotificationRequestItem
            }
        });
    });

    res.sendStatus(200);
};

module.exports.createDropInSession = async (req, res) => {
    Models.Transaction.create({
        amount: req.body.amount,
        currency: "USD",
        mentorship: req.body.mentorship,
        user: req.body.user,
        return_url: process.env.ADYEN_WEBHOOK_HANDLER_URL
    }, async (error, transaction) => {
        if (error) {
            res.send({
                success: false,
                error: error.message
            });
        } else {
            axios.post(`${process.env.ADYEN_API}/sessions`, {
                merchantAccount: process.env.ADYEN_MERCHANT_ACCOUNT,
                amount: {
                    value: transaction.amount,
                    currency: transaction.currency
                },
                reference: transaction._id.toString(),
                shopperInteraction: "Ecommerce",
                returnUrl: transaction.return_url
            }, {
                headers: {
                    "x-API-key": process.env.ADYEN_API_KEY,
                    "Content-Type": "application/json"
                }
            }).then(({ data }) => {
                Models.Transaction.findByIdAndUpdate(transaction._id, {
                    session_data: data.sessionData,
                    session_id: data.id,
                    expires_at: data.expiresAt,
                }, () => {
                    res.send({
                        success: true,
                        data: {
                            sessionData: data.sessionData,
                            id: data.id,
                            expiresAt: data.expiresAt,
                        }
                    });
                });

            }).catch((axios_error) => {
                res.send({
                    success: false,
                    error: axios_error.message
                });
            });
        }
    });
};
