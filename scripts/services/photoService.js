var app = app || {};

(function () {
    app.photoService = {
        photos: {},
        initialize: initialize,
        save: save,
    };

    function initialize(query, forceRetreive) {
        var photosStr = localStorage.getItem("photos");
        if (photosStr && photosStr != "{}" && !forceRetreive) {
            var def = $.Deferred();
            app.photoService.photos = JSON.parse(photosStr);
            def.resolve(app.photoService.photos);
            return def.promise();
        }
        else {
            return fetchPhotos(query);
        }
    }

    function fetchPhotos(query) {
        var def = $.Deferred();
        app.photoService.photos = {};
        app.flickrService.get(query).then(function (data) {
            for (var item of data) {
                app.photoService.photos[item.media.m] = {
                    degree: Math.random() * 360,
                    top: Math.random() * (window.innerHeight - 300),
                    left: Math.random() * (window.innerWidth - 300),
                    url: item.media.m
                }
            }
            save();
            def.resolve(app.photoService.photos);
        }).fail(function (err) {
            alert("Error occured while fetching from flickr.");
            def.reject(err);
        });
        return def.promise();
    }

    function save() {
        localStorage.setItem("photos", JSON.stringify(app.photoService.photos));
    }
})();