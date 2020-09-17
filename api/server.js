const express = require("express");

const AccountsRouter = require("../accounts/accountsRouter.js")

// const db = require("../data/dbConfig.js");

const server = express();

server.use(express.json());

server.use("/api/accounts", AccountsRouter)

server.get("/", (req, res) => {
    res.status(200).json({api: "up"})
})

module.exports = server;
