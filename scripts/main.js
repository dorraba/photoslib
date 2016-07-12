var app = app || {};
app.initializePhotos = function (query) {
    app.photoService.get(query)
        .then(function(photos){
            var container = document.getElementById("container");
            var elements = app.elementsCreatorService.create(photos, container);
            var saveFunc = app.photoService.save.bind(null,photos);
            app.transformationsService.enableTransformations(photos, elements, saveFunc);
        });
}

$('#fetch').click(function(){
    app.initializePhotos($('#query').val())
});

app.initializePhotos();

