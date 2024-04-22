const Project = require("../models/projects")

const addNewProjects = async (req, res) => {
    try {
        const existingProject = await Project.findOne({ projectName: req.body.projectName });
        if (existingProject) {
            return res.status(400).json({ msg: 'Project already exists' });
        }

        const refactorDetails={...req.body, projectLead:req.body.projectLead[0]}
        await Project.create(refactorDetails);
        return res.status(200).json({ msg: 'Project created successfully' });

    } catch (err) {
        console.log(err); // Log the actual error
        return res.status(500).json({ msg: 'Failed to create project' });
    }
}

const getAllProjects = async (req, res) => {
    try{
        const allProjects= await Project.find()
        res.status(200).json({allProjects, msg:'All projects fetched successfully'})
        
    }catch(err){
        console.log(Error)
        res.status(404).json({msg:'Failed to get all projects'})
    }
}

module.exports = {addNewProjects, getAllProjects}