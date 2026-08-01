function requireLogin(req, res, next) {
    if (!req.session.userId)
        return res.status(401).json({ error: 'You must be logged in' });
    next();
}

function requireAdmin(req, res, next) {
    if (!req.session.userId)
        return res.status(401).json({ error: 'You must be logged in' });
    if (req.session.role !== 'admin' && req.session.role !== 'superadmin')
        return res.status(403).json({ error: 'Admin access required' });
    next();
}

function requireSuperAdmin(req, res, next) {
    if (!req.session.userId)
        return res.status(401).json({ error: 'You must be logged in' });
    if (req.session.role !== 'superadmin')
        return res.status(403).json({ error: 'Super admin access required' });
    next();
}

module.exports = { requireLogin, requireAdmin, requireSuperAdmin };
