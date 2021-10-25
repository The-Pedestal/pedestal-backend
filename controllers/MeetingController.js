const Models = require("../models");
const jwt = require("jsonwebtoken");
const uuid4 = require("uuid4");
const request = require("request");
const { VIDEOSDK_API_KEY, VIDEOSDK_SECRET, VIDEOSDK_API_ENDPOINT } = process.env;

function generateAccessToken(callback, permissions) {
    const payload = {
        apikey: VIDEOSDK_API_KEY,
        permissions: permissions,
    };
    jwt.sign(payload, VIDEOSDK_SECRET, {
        algorithm: "HS256",
        expiresIn: "24h",
        jwtid: uuid4(),
    }, (err, token) => callback(err, token));
};

module.exports.authorizeCalendly = (req, res) => {
    console.log(req.body);
    res.send(200);
};

module.exports.getAuthenticationToken = (req, res) => {
    generateAccessToken((err, token) => {

        res.send({
            success: true,
            data: {
                token: token
            }
        });
    }, ["allow_join", "allow_mod"]);
};

module.exports.createMeeting = async (req, res) => {
    generateAccessToken((err, token) => {
        const options = {
            method: "POST",
            url: "https://api.videosdk.live/v1/meetings",
            headers: { authorization: token },
        };
        request(options, function (error, response, body) {
            if (error) throw new Error(error);
            res.send({
                body: body,
                token: token
            });
        });

    }, ["allow_join", "allow_mod"]);
};
