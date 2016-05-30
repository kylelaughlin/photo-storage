// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

$(function(){
  function userModel() {
    var self = this;
    self.firstName = ko.observable();
    self.lastName = ko.observable();
    self.userId = ko.observable();
    self.dataresponse = ko.observable();
    self.showEdit = function(){
      $("#user-edit").hide().removeClass("display-hide").slideDown(600);
    }
    self.hideEdit = function(){
      $("#user-edit").slideUp(200);
    }

    $.get('/users/current', function(data){
      alert(data.first_name);
      self.firstName(data.first_name);
      self.lastName(data.last_name);
      self.userId(data.id);
    });


  }

  ko.applyBindings(new userModel());

  var ImageModel = function() {
    var self = this;
    self.myImages = ko.observableArray([]);
    self.allImages = ko.observableArray([]);
  }
});
