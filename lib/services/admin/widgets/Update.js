const { Op }        = require('sequelize');
const X             = require('chista/Exception').default;
const ServiceBase   = require('../BaseService');
const {
    dumpWidget,
    dumpTopic
}                   = require('../utils.js');
const { sequelize } = require('../../../sequelize');

const Screens        = sequelize.model('Screens');
const Widgets        = sequelize.model('Widgets');
const GlobalSettings = sequelize.model('GlobalSettings');
const Topics         = sequelize.model('Topics');

class WidgetsUpdate extends ServiceBase {
    async validate(data) {
        const rules = {
            id   : [ 'required', 'primitive' ],
            data : [ 'required', { 'nested_object' : {
                name   : [ 'true_string', 'trim', { 'max_length': 25 } ],
                type   : [ 'string', 'not_empty', 'required', 'trim' ],
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

    async execute({ id, data }) {
        await this.middleCheckPermissions();

        const { topics, ...widgetData } = data;

        const widget = await sequelize.transaction(async (transaction) => {
            // eslint-disable-next-line no-shadow
            const widget = await Widgets.findOne({
                where   : { id },
                include : [ { model: Screens, as: 'screen' } ],
                transaction
            });

            if (!widget) {
                throw new X({
                    code   : 'NOT_FOUND',
                    fields : {
                        widget : 'NOT_FOUND'
                    }
                });
            }

            if (!widget.screen) {
                throw new X({
                    code   : 'NOT_FOUND',
                    fields : {
                        screen : 'NOT_FOUND'
                    }
                });
            }

            for (const topic of topics) {
                const targetTopic = await Topics.findOne({
                    where : {
                        [Op.and] : {
                            topic    : topic.topic,
                            widgetId : id
                        }
                    },
                    transaction
                });

                if (targetTopic) {
                    await targetTopic.update(topic, { transaction });
                } else {
                    await Topics.create({ ...topic, widgetId: id }, { transaction });
                }
            }

            const topicsToKeep = topics.map(topic => topic.topic);

            // Remove topics that are not presented in current topics array
            await Topics.destroy({
                where : {
                    [Op.and] : {
                        topic : {
                            [Op.notIn] : topicsToKeep
                        },
                        widgetId : id
                    }
                },
                transaction
            });

            await widget.update(widgetData, { transaction });

            widget.topics = topics.map(dumpTopic);

            return widget;
        });

        return {
            status : 1,
            data   : dumpWidget(widget)
        };
    }
}

module.exports = WidgetsUpdate;
