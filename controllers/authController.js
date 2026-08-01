const bcrypt = require('bcrypt');
const { User, SUPER_ADMIN_EMAIL } = require('../database');

async function register(req, res) {
    const { name, email, password } = req.body;

    if (!name || !email || !password)
        return res.status(400).json({ error: 'All fields are required' });

    const existing = await User.findOne({ where: { email } });
    if (existing)
        return res.status(409).json({ error: 'Email already registered' });

    const hashed = await bcrypt.hash(password, 10);
    const role   = email === SUPER_ADMIN_EMAIL ? 'superadmin' : 'user';

    await User.create({ name, email, password: hashed, role });
    res.status(201).json({ message: 'Account created successfully' });
}

async function login(req, res) {
    const { email, password } = req.body;

    if (!email || !password)
        return res.status(400).json({ error: 'All fields are required' });

    const user = await User.findOne({ where: { email } });
    if (!user)
        return res.status(401).json({ error: 'Invalid email or password' });

    const match = await bcrypt.compare(password, user.password);
    if (!match)
        return res.status(401).json({ error: 'Invalid email or password' });

    req.session.userId   = user.id;
    req.session.userName = user.name;
    req.session.role     = user.role;

    res.status(200).json({ message: 'Login successful', name: user.name, role: user.role });
}

function logout(req, res) {
    req.session.destroy();
    res.status(200).json({ message: 'Logged out' });
}

function me(req, res) {
    res.json({ id: req.session.userId, name: req.session.userName, role: req.session.role });
}

module.exports = { register, login, logout, me };
