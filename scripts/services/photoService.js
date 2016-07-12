var app = app || {};

(function () {
    app.photoService = {
        get: get,
        save: save,
    };

    function get(query) {
        var photosStr = localStorage.getItem("photos");
        if (photosStr && photosStr != "{}" && query == undefined) {
            var def = $.Deferred();
            var photos = JSON.parse(photosStr);
            def.resolve(photos);
            return def.promise();
        }
        else {
            return fetchPhotos(query);
        }
    }

    function fetchPhotos(query) {
        var def = $.Deferred();
        var photos = {};
        app.flickrService.get(query).then(function (data) {
            for (var item of data) {
                photos[item.media.m] = {
                    degree: Math.random() * 360,
                    top: Math.random() * (window.innerHeight - 300),
                    left: Math.random() * (window.innerWidth - 300),
                    url: item.media.m
                }
            }
            save(photos);
            def.resolve(photos);
        }).fail(function (err) {
            alert("Error occured while fetching from flickr.");
            def.reject(err);
        });
        return def.promise();
    }

    function save(photos) {
        localStorage.setItem("photos", JSON.stringify(photos));
    }
})();