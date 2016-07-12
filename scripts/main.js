var app = app || {};
app.lock = false;
(function () {
    var transformService = app.transformationsService();
    initializePhotos();

    function initializePhotos(query) {
        app.photoService.get(query)
            .then(function (photos) {
                var container = document.getElementById("container");
                var elements = app.elementsCreatorService.create(photos, container);
                var saveFunc = app.photoService.save.bind(null, photos);
                transformService.initialize(photos, elements, saveFunc);
                transformService.enable();
            });
    }

    $('#lock').click(function () {
        app.lock = !app.lock;
        if (app.lock) {
            $(this).text("Unlock");
            transformService.disable();
            $('#container').removeClass('editable');
        } else {
            $(this).text("Lock");
            transformService.enable();
            $('#container').addClass('editable');
        }
    });

    $('#fetch').click(function () {
        initializePhotos($('#query').val())
    });
})();

