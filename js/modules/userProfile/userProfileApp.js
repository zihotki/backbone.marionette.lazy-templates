"use strict";

MainApp.UserProfileApp = (function (MainApp, Backbone) {
    var app = {};

    var controller = {
        showUserProfile: function () {
            var view = new MainApp.UserProfileApp.Views.UserProfile({
                model: app.userProfile
            });

            MainApp.content.show(view);
        },
        editUserProfile: function (id) {
            console.log(id);
            var view = new MainApp.UserProfileApp.Views.EditUserProfile({
                model: app.userProfile
            });

            MainApp.content.show(view);
        }
    };

    var lazyTemplates = Backbone.Marionette.LazyTemplates;

    app.Router = lazyTemplates.AppRouter.extend({
        appRoutes: {
            "user/edit-profile/:id": "editUserProfile",
            "user/profile": "showUserProfile"
        },
        controller: controller,
        navigateToRoute: function (routeAction) {

            if (!app.userProfile) {
                app.userProfile = new app.Models.UserProfile({
                    FirstName: "Petek",
                    LastName: "Krudo",
                    Nickname: "yadda-yadda"
                });

                lazyTemplates.TemplatesLoader.loadTemplates("/js/modules/userProfile/templates.html",
                    ["#user-edit-profile-tmpl", "#user-profile-tmpl"],
                    routeAction,
                    this);
            } else {
                routeAction();
            }
        }
    });




    // Initialize the router when the application starts
    MainApp.addInitializer(function () {
        app.router = new app.Router();
        app.router.bind("all", function () {
            MainApp.vent.trigger("app:navigation", "user-profile-app");
        });
    });

    return app;
})(MainApp, Backbone);
