// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

$(function(){
  function userModel() {
    var self = this;
    self.firstName = ko.observable();
    self.lastName = ko.observable();
    self.userId = ko.observable();
    self.myImages = ko.observableArray([]);

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
          alert("hello");
        }
      });
    }

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

});
