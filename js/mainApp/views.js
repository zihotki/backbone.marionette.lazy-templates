"use strict";

MainApp.ItemView = Backbone.Marionette.ItemView;
MainApp.CollectionView = Backbone.Marionette.CollectionView;
MainApp.CompositeView = Backbone.Marionette.CompositeView;

MainApp.Views = (function (MainApp) {

    var menuView = MainApp.ItemView.extend({
        tagName: "ul",
        className: "nav nav-pills",
        template: "#content-menu-tmpl"
    });

    return {
        ContentMenuView : menuView
    };

})(MainApp);