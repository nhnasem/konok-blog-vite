const express = require("express")
const router = express.Router()

const postRoute = require('./postRoute')
const authRoute = require("./authRoute")

router.use("/posts", postRoute)
router.use("/auth", authRoute)

module.exports = router