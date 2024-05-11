const {addNewProjects, getAllProjects, getAllMembersByProjectId} = require('../controllers/projects')
const express= require('express')

const router= express.Router()
router.post('/projects', addNewProjects)
router.get('/projects', getAllProjects)
router.get("/members/:projectId", getAllMembersByProjectId);

module.exports= router