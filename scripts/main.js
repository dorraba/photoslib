var app = app || {};
app.initializePhotos = function (forceRetreive) {
    var query = $('#query').val();
    app.photoService.initialize(query, forceRetreive)
        .then(app.elementsCreatorService.create);
}

app.initializePhotos();

