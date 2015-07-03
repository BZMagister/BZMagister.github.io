var old_onload = window.onload || function() {};
window.onload = function() {
    old_onload();

    var msDuration = 500;

    $(".cardBoxSenzaiDetail").append(
        $("<a>").prop({
            "href": "javascript: void(0);",
            "id": "cardBoxSenzaiDetailBtnOK"
        }).click(function() {
            var theWidth  = $(".cardBoxSenzaiDetail").css("width");
            var theHeight = $(".cardBoxSenzaiDetail").css("height");

            $(".cardBoxSenzaiDetail").animate({
                width: 0,
                height: 0,
                opacity: 0
            },
                msDuration,
                function() {
                    $(".cardBoxSenzaiDetail").css({
                        width: theWidth,
                        height: theHeight,
                        display: "none"
                    });
            });
        })
    );

    $(".cardBoxSenzaiData").click(function() {
        var theHeight = $(".cardBoxSenzaiDetail").css("height");

        $(".cardBoxSenzaiDetail").css({
            height: 0,
            opacity: 0
        }).show();
        $(".cardBoxSenzaiDetail").animate({
            height: theHeight,
            opacity: 1
        },
            msDuration
        );
    });
}

