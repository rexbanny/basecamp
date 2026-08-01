const express    = require('express');
const router     = express.Router();
const controller = require('../controllers/adminController');
const { requireAdmin, requireSuperAdmin } = require('../middleware/auth');

router.get('/users',            requireAdmin,      controller.getAllUsers);
router.get('/projects',         requireAdmin,      controller.getAllProjects);
router.delete('/users/:id',     requireAdmin,      controller.deleteUser);
router.delete('/projects/:id',  requireAdmin,      controller.deleteAnyProject);
router.put('/users/:id/role',   requireSuperAdmin, controller.updateUserRole);

module.exports = router;
