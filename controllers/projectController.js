const { Project } = require('../database');

async function getProjects(req, res) {
    const projects = await Project.findAll({
        where: { userId: req.session.userId },
        order: [['createdAt', 'DESC']]
    });
    res.json(projects);
}

async function createProject(req, res) {
    const { name, description } = req.body;

    if (!name || !description)
        return res.status(400).json({ error: 'All fields are required' });

    const project = await Project.create({ name, description, userId: req.session.userId });
    res.status(201).json(project);
}

async function updateProject(req, res) {
    const project = await Project.findOne({ where: { id: req.params.id, userId: req.session.userId } });
    if (!project)
        return res.status(404).json({ error: 'Project not found' });

    const { name, description } = req.body;
    if (!name || !description)
        return res.status(400).json({ error: 'All fields are required' });

    await project.update({ name, description });
    res.json(project);
}

async function deleteProject(req, res) {
    const project = await Project.findOne({ where: { id: req.params.id, userId: req.session.userId } });
    if (!project)
        return res.status(404).json({ error: 'Project not found' });

    await project.destroy();
    res.json({ message: 'Project deleted' });
}

module.exports = { getProjects, createProject, updateProject, deleteProject };
