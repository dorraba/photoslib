var app = app || {};

(function () {
    app.elementsCreatorService = {};

    app.elementsCreatorService.create = function(photos, containerElement) {
        var container = $("#container");
        container.html("");
        for (var url in photos) {
            (function () {
                var imgContainerElement = createImageContainerElement(photos[url]);
                var imgElement = createImageElement(url);
                var rotateButtonelement = createRotateButtonElement();
                imgContainerElement.append(imgElement)
                imgContainerElement.append(rotateButtonelement);
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
        element.attr("src", url);
        element.attr("draggable", "false");
        return element;
    }

    function createRotateButtonElement() {
        var element = $('<button class="rotatebtn"></button>');
        return element;
    }
})();

