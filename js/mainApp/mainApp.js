MainApp = new Backbone.Marionette.Application();

MainApp.addRegions({
    content: "#content",
    contentMenu: "#sub-navigation"
});

MainApp.on("start", function () {
    (Backbone.history || (Backbone.history = new Backbone.History())).start();
});

MainApp.addInitializer(function () {
    var menuView = new MainApp.Views.ContentMenuView();

    MainApp.contentMenu.show(menuView);
});