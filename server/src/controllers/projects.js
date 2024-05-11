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
        const count= await Project.find().count()
        const skipCount=(req.query.page-1)*5
        const allProjects= await Project.find().limit(5).skip(skipCount)

        res.status(200).json({allProjects, count, msg:'All projects fetched successfully'})
        
    }catch(err){
        console.log(Error)
        res.status(404).json({msg:'Failed to get all projects'})
    }
}

const getAllMembersByProjectId = async (req, res) => {
    console.log(req.params.projectId)
    const projectList = await Project.findById(req.params.projectId)
      .select("members")
      .populate("members");
    return res.json({ projectList, msg:'members fetched successfully'});
  };

module.exports = {addNewProjects, getAllProjects, getAllMembersByProjectId}