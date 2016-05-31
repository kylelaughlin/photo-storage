// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

$(function(){

  function shareEmail(name, email){
    var self = this;
    this.emailName = name;
    this.email = email;
  }

  function userModel() {
    var self = this;
    self.firstName = ko.observable();
    self.lastName = ko.observable();
    self.email = ko.observable();
    self.userId = ko.observable();
    self.myEmails = ko.observableArray([]);

    self.uploadImage = function(){
      alert("start file upload");
      var fileSelect = document.getElementById('file-selected');
      var files = fileSelect.files;
      alert(files[0]);
      var formData = new FormData();
      for(var i= 0; i < files.length; i++){
        var file = files[0];
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

    self.showEdit = function(){
      $("#user-edit").hide().removeClass("display-hide").slideDown(600);
    }
    self.hideEdit = function(){
      var postData = {first_name: self.firstName, last_name: self.lastName, email: self.email}
      $.ajax({
        url: '/users/update',
        type: 'post',
        data: postData
      });
      $("#user-edit").slideUp(200);
    }

    self.showShare = function(){
      $("#image-show").addClass("display-hide");
      $("#email-share").removeClass("display-hide");
    }

    self.showImages = function(){
      $("#email-share").addClass("display-hide");
      $("#image-show").removeClass("display-hide");
    }

    self.addEmail = function(){
      self.myEmails.push(new shareEmail("", ""));
    }

    self.removeEmail = function(email){
      self.myEmails.remove(email);
    }

    $.get('/users/current', function(data){
      alert(data.first_name);
      self.firstName(data.first_name);
      self.lastName(data.last_name);
      self.email(data.email);
      self.userId(data.id);
      self.myEmails([
          new shareEmail("Kyle", "kyle@email.com"),
          new shareEmail("Bob", "bob@email.com")
      ])
    });

    $.get('/images/all_images', function(data){
      alert(data);
      self.myImages(data);
    });

  }

  ko.applyBindings(new userModel());

});
