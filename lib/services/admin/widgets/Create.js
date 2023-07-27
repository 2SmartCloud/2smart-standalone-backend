const X              = require('chista/Exception').default;
const ServiceBase    = require('../BaseService');
const {
    dumpWidget,
    dumpTopic
}                     = require('../utils.js');
const { sequelize }   = require('../../../sequelize');

const Widgets        = sequelize.model('Widgets');
const Screens        = sequelize.model('Screens');
const GlobalSettings = sequelize.model('GlobalSettings');
const Topics         = sequelize.model('Topics');

class WidgetsCreate extends ServiceBase {
    async validate(data) {
        const rules = {
            data : [ 'required', { 'nested_object' : {
                name   : [ 'true_string', 'trim', { 'max_length': 25 } ],
                type   : [ 'string', 'not_empty', 'required', 'trim' ],
                screen : [ 'positive_integer' ],
                topics : [ 'required', { 'list_of_objects' : {
                    topic        : [ 'true_string' ],
                    topicName    : [ 'true_string' ],
                    dataType     : [ 'true_string' ],
                    deviceId     : [ 'property_id' ],
                    nodeId       : [ 'property_id' ],
                    propertyId   : [ 'property_id' ],
                    hardwareType : [ { 'one_of': [ 'device', 'node', 'threshold', 'scenario', 'group' ] } ],
                    propertyType : [ { 'one_of': [ 'sensors', 'telemetry', 'options', 'threshold', 'scenario', 'group' ] } ],
                    order        : [ 'integer' ]
                } } ],
                bgColor  : [ 'true_string' ],
                advanced : 'any_object'
            } } ]
        };

        return this.doValidation(data, rules);
    }
    async middleCheckPermissions() {
        if (typeof super.checkPermissions === 'function') await super.checkPermissions();
        if (await GlobalSettings.get('secure_mode_enabled')) {
            if (!this.context || !this.context.pin) throw new X({ code: 'PERMISSION_DENIED', fields: {} });
        }
    }

    async execute({ data }) {
        await this.middleCheckPermissions();

        const { topics, screen, ...widgetData } = data;

        widgetData.screenId = screen;

        const widget = await sequelize.transaction(async (transaction) => {
            const widgetScreen = await Screens.findOne({ where: { id: widgetData.screenId }, transaction });

            if (!widgetScreen) {
                throw new X({
                    code   : 'NOT_FOUND',
                    fields : {
                        screen : 'NOT_FOUND'
                    }
                });
            }
            // eslint-disable-next-line no-shadow
            const widget = await Widgets.create(widgetData, { transaction, returning: true, individualHooks: true });

            const topicsWithWidgetId = topics.map(topic => {
                // eslint-disable-next-line no-param-reassign
                topic.widgetId = widget.dataValues.id;

                return topic;
            });

            const insertedTopics = await Topics.bulkCreate(topicsWithWidgetId, { transaction, returning: true });

            widget.topics = insertedTopics.map(dumpTopic);

            return widget;
        });

        return {
            status : 1,
            data   : dumpWidget(widget)
        };
    }
}

module.exports = WidgetsCreate;
