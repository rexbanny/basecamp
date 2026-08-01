const express    = require('express');
const router     = express.Router();
const controller = require('../controllers/projectController');
const { requireLogin } = require('../middleware/auth');

router.get('/',       requireLogin, controller.getProjects);
router.post('/',      requireLogin, controller.createProject);
router.put('/:id',   requireLogin, controller.updateProject);
router.delete('/:id',requireLogin, controller.deleteProject);

module.exports = router;
