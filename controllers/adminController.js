const { User, Project } = require('../database');

async function getAllUsers(req, res) {
    const users = await User.findAll({
        attributes: ['id', 'name', 'email', 'role', 'createdAt'],
        include: [{ model: Project, as: 'projects' }],
        order: [['createdAt', 'DESC']]
    });
    res.json(users);
}

async function getAllProjects(req, res) {
    const projects = await Project.findAll({
        include: [{ model: User, as: 'owner', attributes: ['id', 'name', 'email'] }],
        order: [['createdAt', 'DESC']]
    });
    res.json(projects);
}

async function deleteUser(req, res) {
    if (req.params.id == req.session.userId)
        return res.status(400).json({ error: 'You cannot delete yourself' });

    const user = await User.findByPk(req.params.id);
    if (!user)
        return res.status(404).json({ error: 'User not found' });
    if (user.role === 'superadmin')
        return res.status(403).json({ error: 'Cannot delete super admin' });

    await Project.destroy({ where: { userId: user.id } });
    await user.destroy();
    res.json({ message: 'User deleted' });
}

async function deleteAnyProject(req, res) {
    const project = await Project.findByPk(req.params.id);
    if (!project)
        return res.status(404).json({ error: 'Project not found' });

    await project.destroy();
    res.json({ message: 'Project deleted' });
}

async function updateUserRole(req, res) {
    const { role } = req.body;
    if (!['user', 'admin'].includes(role))
        return res.status(400).json({ error: 'Invalid role' });

    const user = await User.findByPk(req.params.id);
    if (!user)
        return res.status(404).json({ error: 'User not found' });
    if (user.role === 'superadmin')
        return res.status(403).json({ error: 'Cannot change super admin role' });

    await user.update({ role });
    res.json({ message: `Role updated to ${role}` });
}

module.exports = { getAllUsers, getAllProjects, deleteUser, deleteAnyProject, updateUserRole };
