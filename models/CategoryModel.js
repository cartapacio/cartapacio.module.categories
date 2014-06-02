'use strict';

var $ = require('jquery'),
  Backbone = require('backbone'),
  config = require('../config')

Backbone.$ = $

module.exports = Backbone.Model.extend({

  urlRoot: config.CARTAPACIO_SERVER + '/doc',

  idAttribute: '_id',

  // Default values for all of the Model attributes
  defaults: {
    doctype: 'category',
    name_es: '',
    name_en: '',
    order: ''
  },

  // Gets called automatically by Backbone when the set and/or save methods are called (Add your own logic)
  validate: function(attrs) {
    var errors = []

    if(!attrs.name_es){
      errors.push({
        id: 'name_es',
        msg: 'empty name'
      })
    }

    if(!attrs.name_en){
      errors.push({
        id: 'name_en',
        msg: 'empty name'
      })
    }

    return errors.length > 0 ? errors : false
  }

})
