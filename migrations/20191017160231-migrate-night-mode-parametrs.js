'use strict';

module.exports = {
  up : (queryInterface, Sequelize) => {
    const Promise = require('bluebird') ;
    const sequelize = queryInterface.sequelize ;
    return  sequelize.query('SELECT * FROM widgets',{ type: sequelize.QueryTypes.SELECT }).then(function(widgets) {
      console.log(widgets);
      widgets = widgets.filter((widget) => {
        let changed = false ;
        if(widget.bgColor!=='white'){
          widget.bgColor = 'white' ;
          changed = true ;
        }
        if(widget.advanced && widget.advanced.chartColor && widget.advanced.chartColor!=='blue'){
          widget.advanced.chartColor = 'blue' ;
          changed = true ;
        }
        return changed ;
      }) ;
      return Promise.each(widgets,function(widget){
        return queryInterface.bulkUpdate('widgets', widget,{ id:widget.id }) ;
      }) ;
    })
  },
  down : (queryInterface, Sequelize) => {

  }
};