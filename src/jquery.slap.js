

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
        swooshAudio.setAttribute('src', settings.pathToSlap + 'swoosh.mp3');
        slapAudio.setAttribute('src', settings.pathToSlap + 'slap.mp3');
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
            self.on("mouseup", function (event) {
                slapAudio.play();
                halfX = (self.width() / 2);
                halfY = (self.height() / 2);
                longerSide = halfX > halfY ? halfX : halfY;
                coordX = event.offsetX - halfX;
                coordY = event.offsetY - halfY;
                radius = Math.sqrt((coordX * coordX) + (coordY * coordY))
                intensity = radius / longerSide;
                console.log(intensity)
                if (coordX > 0) {
                    // console.log( "X", ((Math.atan2(coordX, coordY) / Math.PI) * 2) - 1);
                    x = ((Math.atan2(coordX, coordY) / Math.PI) * 2) - 1;
                }
                else {
                    // console.log( "X", ((Math.atan2(coordX, coordY) / Math.PI) * -2) - 1);
                    x = ((Math.atan2(coordX, coordY) / Math.PI) * -2) - 1;
                }
                if (coordY < 0) {
                    console.log("Y", ((Math.atan2(coordX, -coordY) / Math.PI) * 2));
                    y = ((Math.atan2(coordX, -coordY) / Math.PI) * 2);
                }
                else {
                    console.log("Y", ((Math.atan2(coordX, coordY) / Math.PI) * 2));
                    y = ((Math.atan2(coordX, coordY) / Math.PI) * 2);
                }
                console.log(Math.round(x * 10) / 10, Math.round(y * 10) / 10);
                // console.log( "Y", ((Math.atan2(coordX, coordY) / Math.PI) * 2 ) + 2);
                //var x =  ((Math.atan2(coordX, coordY) / Math.PI) * 2) -1
                //var y =  ((Math.atan2(coordX, coordY) / Math.PI) * -2 ) + 2
                //event.offsetX
                //event.offsetY
                //self.width();
                //self.height();
                var stepCount = 0;
                //oben:      -1     0     0   ATAN 1
                //o r      -0.5   0.5     0   ATAN 0.75
                //rechts:     0     1     0   ATAN 0.5
                //ur    :   0.5   0.5     0   ATAN 0.25
                //unten:      1     0     0   ATAN 0
                //ul   :    0.5  -0.5     0   ATAN -0.25
                //links:      0    -1     0   ATAN -0.5
                //ol:      -0.5  -0.5     0   ATAN -0.75
                //var x = 0.5//Math.random() * 2 - 1;
                //var y = 0.5//Math.random() * 2 - 1;
                var z = 0; //Math.random() * 2 - 1;
                self.animate({
                    borderSpacing: -90
                }, {
                    step: function (now, fx) {
                        stepCount++;
                        d = (settings.slapDuration / 13.333);
                        t = stepCount;
                        b = 0;
                        c = 360 * intensity ;

                       
                        deg = -c * ((t=t/d-1)*t*t*t - 1) + b;
                        
                        $(this)
                            .css({
                                'transform': 'rotate3d(' + (x) + ',' + (y) + ',' + (z) + ',' + (deg) + 'deg)'
                            });
                    },
                    duration: settings.slapDuration
                }, "easeOutQuad");
            });
        });
    };
}(jQuery));