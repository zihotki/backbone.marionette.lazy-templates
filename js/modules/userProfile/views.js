"use strict";

MainApp.UserProfileApp.Views = (function (MainApp, Backbone, $) {

    var views = {};

    views.EditUserProfile = MainApp.ItemView.extend({
        template: "#user-edit-profile-tmpl",
        events: {
            "click #save-user-profile": "saveProfile",
            "click #cancel-editing-user-profile" : "cancelEditing"
        },

        saveProfile: function () {
            this.model.set('FirstName', this.$el.find('#user-profile-first-name').val())
                      .set('LastName', this.$el.find('#user-profile-last-name').val())
                      .set('Nickname', this.$el.find('#user-profile-nick-name').val());

            // TODO: improve navigation
            MainApp.UserProfileApp.router.navigate("user/profile", { trigger: true });
        },
        cancelEditing: function () {
            // TODO: improve navigation
            MainApp.UserProfileApp.router.navigate("user/profile", { trigger: true });
        }
    });

    views.UserProfile = MainApp.ItemView.extend({
        template: "#user-profile-tmpl"
        /*,
        events: {
        "click #edit-user-profile" :"editProfile"
        },
        editProfile: function () {
            
        }*/
    });

    return views;
})(MainApp, Backbone, jQuery);