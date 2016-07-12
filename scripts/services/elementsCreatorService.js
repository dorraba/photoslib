var app = app || {};

(function () {
    app.elementsCreatorService = {
        create: create
    };

    function create(photos, containerElement) {
        var container = $("#container");
        container.html("");
        for (var url in photos) {
            (function () {
                var imgContainerElement = createImageContainerElement(photos[url]);
                var imgElement = createImageElement(url);
                imgContainerElement.append(imgElement)
                $(containerElement).append(imgContainerElement);
            })();
        }

        return containerElement.childNodes;
    }

    function createImageContainerElement(photo) {
        var element = $('<div class="imageitem"></div>');
        element.css({
            "top": photo.top,
            "left": photo.left,
             "transform": 'rotate(' + photo.degree + 'deg)',
             "transform-origin": '50% 50%',
        });
        return element;
    }

    function createImageElement(url) {
        var element = $('<img />');
        element.attr("draggable", "false");
        element.attr("src", url);
        return element;
    }

  
})();

