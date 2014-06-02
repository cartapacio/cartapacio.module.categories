'use strict';

var $ = require('jquery'),
  Backbone = require('backbone'),
  _ = require('lodash'),
  model = require('../models/CategoryModel'),
  config = require('../config'),
  template = require('../templates/New.hbs'),
  FormSerializer = require('form-serializer'),
  serializer = new FormSerializer($)

Backbone.$ = $


module.exports = Backbone.View.extend({
  //el: '.main-content',

  initialize: function(){
    console.info('new category view --- initialize')

    this.model = this.model || new model()

    this.model.on('invalid', this.handleError)
  },

  events:{
    'click #save': 'save',
    'click #delete': 'delete',
    'click #cancel': 'cancel'
  },

  render: function(){
    this.template = template(this.model.attributes)
    // Dynamically updates the UI with the view's template
    this.$el.html(this.template);

    return this
  },

  save: function(){
    // clean validation feedback
    $('.form-group').removeClass('has-error')

    var info = $('#info').serializeArray()
    var doc = serializer.addPairs(info).serialize()


    this.model.save(doc,{
      success: function(model){
        global.cartapacio.collections.categories.add(model)
        global.cartapacio.router.navigate(config.url, {trigger: true})
      }
    })
  },

  delete: function(){
    this.model.destroy({
      success: function(){
        global.cartapacio.router.navigate(config.url, {trigger: true})
      }
    })
  },

  cancel: function(){
    global.cartapacio.router.navigate(config.url, {trigger: true})
  },

  handleError: function(model, err){
    _.each(err, function (item){
      $('#'+item.id).parent().toggleClass('has-error')
    })
  },
});
