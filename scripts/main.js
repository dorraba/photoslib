var app = app || {};
(function () {
    var transformService = app.transformationsService();
    var toolbar = app.toolbar(toolbarClicked);
    initializePhotos();

    function initializePhotos(query) {
        app.photoService.get(query)
            .then(function (photos) {
                var container = document.getElementById("container");
                var elements = app.elementsCreatorService.create(photos, container);
                var saveFunc = app.photoService.save.bind(null, photos);
                transformService.initialize(photos, elements, saveFunc);
                if (!toolbar.isLocked()) {
                    transformService.enable();
                }
            });
    }

    function toolbarClicked(action, value) {
        if (action == "lock") {
            value.locked ? transformService.disable() : transformService.enable();
        }
        else if (action == "search") {
            initializePhotos(value.query);
        }
    }

})();

