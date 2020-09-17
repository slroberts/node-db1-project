const express = require("express")

const db = require ("../data/dbConfig.js")

const router = express.Router()

// GET /api/accounts
router.get("/", async (req, res) => {
    try {
        const accounts = await db("accounts");
        res.json(accounts);
    } catch(err) {
        console.log(err) 
        res.status(500).json({message: "Error retrieving accounts", err})
        
    }
})

// GET /api/accounts/:id
router.get("/:id", async (req, res) => {
    const {id} = req.params;

    try {
        const account = await db.select("*").from("accounts").where({id}).first()
        if (account) {
            res.status(200).json(post)
           
        }  else {
            res.status(400).json({
                message: "Account not found"
            })
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "Error retrieving account", err
        })
    }
})

//POST /api/accounts
router.post("/", async (req, res) => {
    const newAccount = req.body;

    try {
        const account = await db.insert(newAccount).into("accounts")
        res.status(201).json(account)
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "db problem", err
        })
    }
})

//PUT /api/accounts/:id
router.put("/:id", async (req, res) => {
    const {id} = req.params;
    const changes = req.body

    try {
         const update = await db("accounts").where({id}).update(changes);
            if (update) {
                res.status(200).json({
                    message: "account updated"
                })
            } else {
                res.status(404).json({
                    message: "invalid id"
                })
            }
    } catch (err) {
        res.status(500).json({
            message: "db problem"
        })
    }

    
})

//DELETE /api/accounts/:id
router.delete("/:id", async (req, res) => {
    const {id} = req.params;

    try {
        const count = await db.del().from("accounts").where({id})
        count ? res.status(200).json({message: "account deleted"}) : res.status(404).json({message: "invalid id"})
    } catch (err) {
        res.status(500).json({message: "database error", err})
    }
})



module.exports = router
