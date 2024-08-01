const jwt = require("jsonwebtoken")
const { model } = require("mongoose")

function verifyAccessToken(token) {
    return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
}

function verifyRefreshToken(token) {
    return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET)

}

model.exports = { verifyAccessToken, verifyRefreshToken }