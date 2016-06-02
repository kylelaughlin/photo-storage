// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

$(function(){

  // initialize an email to be shared
  function shareEmail(name, email){
    var self = this;
    this.email = email;
  }

  // Viewmodel
  function userModel() {
    var self = this;
    self.firstName = ko.observable();
    self.lastName = ko.observable();
    self.email = ko.observable();
    self.userId = ko.observable();
    self.myEmails = ko.observableArray([]);

    // Send Images via AJAX to server
    self.uploadImage = function(){
      var fileSelect = document.getElementById('file-selected');
      var files = fileSelect.files;
      var formData = new FormData();
      for(var i= 0; i < files.length; i++){
        var file = files[i];
        formData.append('images[]',file);
      };
      $.ajax({
        url: '/images/upload',
        type: 'post',
        data: formData,
        cache: false,
        dataType: 'json',
        processData: false,
        contentType: false,
        success: function(data){
          $.ajax({
            url: '/images/images_update',
            type: 'get'
          });
        }
      });
    }

    // Display user info edit form
    self.showEdit = function(){
      $("#user-edit").hide().removeClass("display-hide").slideDown(600);
    }

    // Upon submit click - Hide user info edit form and send info to server
    self.hideEdit = function(){
      var postData = {first_name: self.firstName, last_name: self.lastName, email: self.email}
      $.ajax({
        url: '/users/update',
        type: 'post',
        data: postData
      });
      $("#user-edit").slideUp(200);
    }

    // Hide Images and show email sharing
    self.showShare = function(){
      $("#image-show").addClass("display-hide");
      $("#email-share").removeClass("display-hide");
    }

    // Hide email sharing and show images
    self.showImages = function(){
      $("#email-share").addClass("display-hide");
      $("#image-show").removeClass("display-hide");
    }

    // Add another email to the myEmails ko.observableArray
    self.addEmail = function(){
      self.myEmails.push(new shareEmail("", ""));
    }

    // Remove an email from the myEmails ko.observableArray
    self.removeEmail = function(email){
      self.myEmails.remove(email);
    }

    // Package all share emails into a dataObject to be sent via AJAX to server
    self.sendEmail = function(){
      var emailList = [];
      for(var i = 0; i < self.myEmails().length; i++){
        emailList.push(self.myEmails()[i].email);
      };
      var postData = {};
      postData["myEmail"] = emailList;
      $.ajax({
        url: '/users/mailer',
        type: 'get',
        data: postData,
        success: function(){
          self.myEmails([]);
        }
      });
    }

    // Populate iniital observable values
    $.get('/users/current', function(data){
      self.firstName(data.first_name);
      self.lastName(data.last_name);
      self.email(data.email);
      self.userId(data.id);
      self.myEmails([

      ])
    });

  }

  // Instantiate ko bindings
  ko.applyBindings(new userModel());

});
