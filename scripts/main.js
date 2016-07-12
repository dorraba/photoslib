var app = app || {};
(function () {
    initializePhotos();

    $('#fetch').click(function () {
        initializePhotos($('#query').val())
    });

    function initializePhotos(query) {
        app.photoService.get(query)
            .then(function (photos) {
                var container = document.getElementById("container");
                var elements = app.elementsCreatorService.create(photos, container);
                var saveFunc = app.photoService.save.bind(null, photos);
                app.transformationsService.enableTransformations(photos, elements, saveFunc);
            });
    }
})();
