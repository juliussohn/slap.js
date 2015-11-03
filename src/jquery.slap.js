(function ($) {
    var swooshAudio = document.createElement('audio');
    var slapAudio = document.createElement('audio');
   
    $.fn.slap = function (options) {
        
        var settings = $.extend({
            pathToSlap: "slap.js/dist/",
            slapDuration: 200,
            slapIntensity: 1,
            slapEasing: 'swing'
        }, options);
        
        swooshAudio.setAttribute('src', settings.pathToSlap+'swoosh.mp3');
        slapAudio.setAttribute('src', settings.pathToSlap+'slap.mp3');

        return this.each(function () {
            var self = $(this);
            self.css({
                'cursor': 'pointer',
                borderSpacing: 0,
            });
            if (self.css("display") != "block" && self.css("display") != "inline-block") {
                self.css("display", "inline-block");
            }
            self.on("mousedown", function () {
                swooshAudio.play();
            });
            self.on("mouseup", function () {
                slapAudio.play();
                var stepCount = 0;

                var x = Math.random() * 2 - 1;
                var y = Math.random() * 2 - 1;
                var z = Math.random() * 2 - 1;

                self.animate({
                    borderSpacing: -90
                }, {
                    step: function (now, fx) {
                        stepCount++;
                        deg = ( ( 360 * settings.slapIntensity ) / ( settings.slapDuration / 13.333 )) * stepCount;
                        $(this)
                            .css({
                                'transform': 'rotate3d(' + (x) + ',' + (y) + ',' + (z) + ',' + (deg) + 'deg)'
                            });
                    },
                    duration: settings.slapDuration
                }, settings.slapEasing, function () {
                });
                
            });
        });
    };
}(jQuery));