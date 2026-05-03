const express = require("express");
const router = express.Router();
const Project = require("../models/Project");
const logger = require('../util/logger');
const { v4: uuidv4 } = require('uuid');
const { validateNewTechnician } = require("../util/validationHelpers")

// /projects

// fetch all active projects
router.get("/", async (req, res, next) => {
    try {
        const projects = await Project.findAll({
            where: {
                [Op.not]:
                    [
                        { 'status': "CLOSED" },
                    ]
            }

        });
        res.json(projects);
    } catch (error) {
        return res.json({ "status": "500", "message": error.message })
    }

})

module.exports = router