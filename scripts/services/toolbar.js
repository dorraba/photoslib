var app = app || {};

(function () {
    var locked = false;
    app.toolbar = function (callback) {
        $('#lock').click(function () {
            locked = !locked;
            if (locked) {
                $(this).addClass("btn-danger");
                $('#container').removeClass('editable');
            } else {
                $(this).removeClass("btn-danger");
                $('#container').addClass('editable');
            }
            callback("lock", {
                locked: locked
            })
        });

        $('#fetch').click(function () {
            callback("search", {
                query: $('#query').val()
            })
        });

        return {
            isLocked: function() { return locked; }
        };
    }
})()