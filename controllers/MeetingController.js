const Models = require("../models");
const jwt = require("jsonwebtoken");
const uuid4 = require("uuid4");
const request = require("request");
const axios = require("axios");
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

module.exports.authorizeCalendly = async (req, res) => {
    const { code, id } = req.query;
    axios.post(`${process.env.CALENDLY_AUTH_URL}/oauth/token`, {
        grant_type: "authorization_code",
        client_id: process.env.CALENDLY_CLIENT_ID,
        client_secret: process.env.CALENDLY_CLIENT_SECRET,
        code: code,
        redirect_uri: `${process.env.CALENDLY_REDIRECT_URL}?id=${id}`
    }).then(async (response) => {
        const { data } = response;
        await Models.User.findByIdAndUpdate(id, { calendly_authorization_object: data }, { upsert: true });
        return res.redirect(`${process.env.APP_URL}/oauth/calendly/result?success`);
    }).catch(err => {
        return res.redirect(`${process.env.APP_URL}/oauth/calendly/result?failed`);
    });
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
            url: `${process.env.VIDEOSDK_API_ENDPOINT}/v1/meetings`,
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
