const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'user.db',
    logging: false
});

const SUPER_ADMIN_EMAIL = 'elmirabbasli4@gmail.com';

//Models

const User = sequelize.define('User', {
    id:       { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name:     { type: DataTypes.STRING,  allowNull: false },
    email:    { type: DataTypes.STRING,  allowNull: false, unique: true },
    password: { type: DataTypes.STRING,  allowNull: false },
    role:     { type: DataTypes.ENUM('user', 'admin', 'superadmin'), defaultValue: 'user' }
}, { tableName: 'users', timestamps: true });

const Project = sequelize.define('Project', {
    id:          { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name:        { type: DataTypes.STRING,  allowNull: false },
    description: { type: DataTypes.TEXT,   allowNull: false },
    userId:      { type: DataTypes.INTEGER, allowNull: false }
}, { tableName: 'projects', timestamps: true });

//Associations

User.hasMany(Project,    { foreignKey: 'userId', as: 'projects' });
Project.belongsTo(User,  { foreignKey: 'userId', as: 'owner' });

//Sync

async function initDB() {
    await sequelize.sync({ alter: true });
    console.log('Database synced');
}

module.exports = { sequelize, User, Project, initDB, SUPER_ADMIN_EMAIL };
