const Sequelize = require('sequelize');
const conn = new Sequelize(process.env.DATABASE_URL);

const Users = conn.define('users', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true
        }
    }
});

Users.belongsTo(Users, { as: "manager" });

const sync = () => {
    return conn.sync({ force: true });
}

const seed = () => {
    return Promise.all([
        Users.create({name: "moe"}),
        Users.create({name: "larry"}),
        Users.create({name: 'curly'})
    ]).then(([moe, larry, curly]) => {
        return Promise.all([
            larry.setManager(moe),
            curly.setManager(larry)
        ]);
    });
}

module.exports = {
    sync,
    seed,
    models: {
        Users
    }
}