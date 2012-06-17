"use strict";

Backbone.Marionette.LazyTemplates = (function (Marionette, $) {

    var moduleRouter = Marionette.AppRouter.extend({
        // Internal method to process the `appRoutes` for the
        // router, and turn them in to routes that trigger the
        // specified method on the specified `controller`.
        processAppRoutes: function (controller, appRoutes) {
            var method, methodName;
            var route, routesLength, i;
            var routes = [];
            var router = this;

            for (route in appRoutes) {
                if (appRoutes.hasOwnProperty(route)) {
                    routes.unshift([route, appRoutes[route]]);
                }
            }

            routesLength = routes.length;
            for (i = 0; i < routesLength; i++) {
                route = routes[i][0];
                methodName = routes[i][1];
                method = controller[methodName];

                if (!method) {
                    var msg = "Method '" + methodName + "' was not found on the controller";
                    var err = new Error(msg);
                    err.name = "NoMethodError";
                    throw err;
                }

                method = _.bind(method, controller);
                router.route(route, methodName, this._wrap(method));
            }
        },

        _wrap: function (method) {
            var navigateToRoute = this.navigateToRoute;

            return function () {
                // saving passed arguments and current `this` pointer so we can call wrapped method 
                // in the same context and with the same arguments later
                var args = arguments;
                var that = this;
                
                var m = _.wrap(method, function (func) {
                    func.apply(that, args);
                });

                navigateToRoute(m);
            };
        },

        navigateToRoute: function (routeAction) {
            routeAction();
        }
    });

    // TODO: 
    var templatesLoader = {
        loadTemplates: function (templateFileUrl, templateIds, callback, context) {
            $.ajax(templateFileUrl, {
                cache: false,
                success: function (templatesContent) {
                    var templates = $(templatesContent);

                    _.forEach(templateIds, function (templateId) {
                        var templateCache = new Marionette.TemplateCache(templateId),
                            template = templates.filter(templateId).html();

                        if (!template) {
                            var msg = "Template with id '" + templateId + "' was not found in file '" + this.templateFile + "'";
                            var err = new Error(msg);
                            err.name = "TemplateNotFoundError";
                            throw err;
                        }

                        templateCache.compiledTemplate = templateCache.compileTemplate(template);

                        Marionette.TemplateCache.templateCaches[templateId] = templateCache;
                    });

                    callback.call(context);
                }
            });
        }
    };

    return {
        AppRouter: moduleRouter,
        TemplatesLoader: templatesLoader
    };

})(Backbone.Marionette, jQuery);