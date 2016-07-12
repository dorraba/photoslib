var app = app || {};
app.transformationsService = {};
app.transformationsService.enableTransformations = function (photos, elements, finishCallback) {
    var _photos = photos;
    var _elements = elements
    var _currentElement = null;
    var _currentPhoto = null;
    var _currentAction = null; //rotate, move
    var MOVE_ACTION = "move";
    var ROTATE_ACTION = "rotate";
    initialize();

    function initialize() {
        for (var element of _elements) {
            (function () {
                var jElement = $(element);
                var rotateButton = jElement.find(".rotatebtn");
                rotateButton.mousedown(function () {
                    startTranformationForElement(jElement, ROTATE_ACTION);
                    event.stopPropagation();
                });
                jElement.mousedown(function () {
                    startTranformationForElement(jElement, MOVE_ACTION);
                });
            })()
        }
    }

    function startTranformationForElement(element, action) {
        var imgSrc = element.find("img").attr('src');
        _currentElement = element;
        _currentPhoto = _photos[imgSrc];
        _currentAction = action;
    }

    $(document).mouseup(function () {
        if (_currentElement) {
            _currentElement = null;
            _currentAction = null;
            finishCallback();
        }
    })

    $(document).mousemove(function (e) {
        if (_currentElement) {
            if (_currentAction == ROTATE_ACTION) {
                var radX = e.pageX - _currentElement[0].offsetLeft - (_currentElement.width() / 2);
                var radY = e.pageY - _currentElement[0].offsetTop - (_currentElement.height() / 2);
                var radians = Math.atan2(radX, radY);
                var degree = (radians * (180 / Math.PI) * -1) + 90;
                _currentElement.css('transform', 'rotate(' + degree + 'deg)');
                _currentPhoto.degree = degree;
            }
            else if (_currentAction == MOVE_ACTION) {
                var top = e.pageY - (_currentElement.height() / 2);
                var left = e.pageX - (_currentElement.width() / 2);
                _currentElement.css({
                    top: top,
                    left: left
                })
                _currentPhoto.top = top;
                _currentPhoto.left = left;
            }
        }
    })
}
