const { sequelize } = require('../../lib/sequelize');

const users   = require('../fixtures/users');
const screens = require('../fixtures/screens');
const widgets = require('../fixtures/widgets');
const topics  = require('../fixtures/topics');

const Users   = sequelize.model('Users');
const Screens = sequelize.model('Screens');
const Widgets = sequelize.model('Widgets');
const Topics  = sequelize.model('Topics');

function fillUsers() {
    return Users.bulkCreate(users);
}

function fillScreens() {
    return Screens.bulkCreate(screens);
}

function fillWidgets() {
    return Widgets.bulkCreate(widgets);
}

function fillTopics() {
    return Topics.bulkCreate(topics);
}

module.exports = {
    fillUsers,
    fillScreens,
    fillWidgets,
    fillTopics
};
