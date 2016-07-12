var app = app || {};
app.transformsService = {};
(function () {
    var currentElement = null;
    var currentPhoto = null;
    var currentAction = null; //rotate, move
    var MOVE_ACTION = "move";
    var ROTATE_ACTION = "rotate";
    function startTranformationForElement(element, action) {
        var imgSrc = element.find("img").attr('src');
        currentElement = element;
        currentPhoto = app.photoService.photos[imgSrc];
        currentAction = action;
    }

    app.transformsService.attachEvents = function (element) {
        var rotateButton = element.find(".rotatebtn");
        rotateButton.mousedown(function () {
            startTranformationForElement(element, ROTATE_ACTION);
            event.stopPropagation();
        });
        element.mousedown(function () {
            startTranformationForElement(element, MOVE_ACTION);
        });
    }


    $(document).mouseup(function () {
        if (currentElement) {
            app.photoService.save();
            currentElement = null;
            currentAction = null;
        }
    })

    $(document).mousemove(function (e) {
        if (currentElement) {
            if (currentAction == ROTATE_ACTION) {
                var radX = e.pageX - currentElement[0].offsetLeft - (currentElement.width() / 2);
                var radY = e.pageY - currentElement[0].offsetTop - (currentElement.height() / 2);
                var radians = Math.atan2(radX, radY);
                var degree = (radians * (180 / Math.PI) * -1) + 90;
                currentElement.css('transform', 'rotate(' + degree + 'deg)');
                currentPhoto.degree = degree;
            }
            else if (currentAction == MOVE_ACTION) {
                var top = e.pageY - (currentElement.height() / 2);
                var left = e.pageX - (currentElement.width() / 2);
                currentElement.css({
                    top: top,
                    left: left
                })
                currentPhoto.top = top;
                currentPhoto.left = left;
            }
        }
    })
})();