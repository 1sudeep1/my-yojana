const Sprint = require("../models/sprint")

const addNewSprints = async (req, res) => {
    try {
        const existingProject = await Sprint.findOne({ sprintName: req.body.sprintName });
        if (existingSprint) {
            return res.status(400).json({ msg: 'Sprint already exists' });
        }
        await Sprint.create(req.body);
        return res.status(200).json({ msg: 'Sprint created successfully' });

    } catch (err) {
        console.log(err); // Log the actual error
        return res.status(500).json({ msg: 'Failed to create sprint' });
    }
}


module.exports = {addNewSprints}