var app = app || {};
app.transformationsService = function () {
    var _photos, _elements, _finishCallback;
    var _currentTransformingElement = null;
    var _currentPhoto = null;
    var _currentAction = null; //rotate, move
    var MOVE_ACTION = "move";
    var ROTATE_ACTION = "rotate";
    var _originRelativeX, _originRelativeY;
    $(document).mouseup(mouseup);
    $(document).mousemove(mousemove);

    return {
        initialize: initialize,
        enable: enableTransformation,
        disable: disableTransformation,
    }

    function initialize(photos, elements, finishCallback) {
        _photos = photos;
        _elements = elements
        _finishCallback = finishCallback;

    }
    function enableTransformation() {
        for (var i = 0; i < _elements.length; i++) {
            attachEvents($(_elements[i]));
        }
    }

    function disableTransformation() {
        $(_elements).unbind('mouseenter mouseleave mousedown');
    }

    function attachEvents(element) {
        var overlayElement = createOverlayElement();
        element.hover(function () {
            element.append(overlayElement);
            var rotateButton = overlayElement.find(".rotatebtn");
            rotateButton.mousedown(function (e) {
                startTranformationForElement(element, ROTATE_ACTION, e);
            });
            element.mousedown(function (e) {
                startTranformationForElement(element, MOVE_ACTION, e);
            });
        }, function () {
            overlayElement.remove();
        });
    }

    function startTranformationForElement(element, action, event) {
        event.stopPropagation();
        var index = bringToFront(element);
        _currentTransformingElement = element;
        _currentPhoto = _photos[index];
        _currentAction = action;
        _originRelativeX = _currentTransformingElement[0].offsetLeft - event.pageX;
        _originRelativeY = _currentTransformingElement[0].offsetTop - event.pageY;
    }

    function createOverlayElement() {
        var element = $('<div class="overlay"></div>')
        var btnElement = $('<button class="rotatebtn btn btn-default"><i class="glyphicon glyphicon-repeat"></i></button>');
        element.append(btnElement);
        return element;
    }

    function bringToFront(element) {
        var index = getElementIndex(element[0]);
        //change photo position to top of the list (bring to front)
        var photo = _photos.splice(index, 1)[0];
        _photos.push(photo);
        //move the photo element to top
        var container = element.parent();
        container.append(element);
        return _elements.length - 1; //return new index of element
    }

    function mouseup() {
        if (_currentTransformingElement) {
            _currentTransformingElement = null;
            _currentAction = null;
            _finishCallback();
        }
    }
    function mousemove(e) {
        if (_currentTransformingElement) {
            if (_currentAction == ROTATE_ACTION) {
                var radX = e.pageX - _currentTransformingElement[0].offsetLeft - (_currentTransformingElement.width() / 2);
                var radY = e.pageY - _currentTransformingElement[0].offsetTop - (_currentTransformingElement.height() / 2);
                var radians = Math.atan2(radX, radY);
                var degree = (radians * (180 / Math.PI) * -1) + 90;
                _currentTransformingElement.css('transform', 'rotate(' + degree + 'deg)');
                _currentPhoto.degree = degree;
            }
            else if (_currentAction == MOVE_ACTION) {
                var top = e.pageY + _originRelativeY;
                var left = e.pageX + _originRelativeX;
                _currentTransformingElement.css({
                    top: top,
                    left: left
                })
                _currentPhoto.top = top;
                _currentPhoto.left = left;
            }
        }
    }

    function getElementIndex(element) {
        return Array.prototype.indexOf.call(_elements, element);
    }
}