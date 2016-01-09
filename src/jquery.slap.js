

(function ($) {
    var swooshAudio = document.createElement('audio');
    var slapAudio = document.createElement('audio');
    $.fn.slap = function (options) {
        var settings = $.extend({
            pathToSlap: "slap.js/dist/",
            slapDuration: 200,
            slapIntensity: 1,
        }, options);
        swooshAudio.setAttribute('src', settings.pathToSlap + 'swoosh.mp3');
        slapAudio.setAttribute('src', settings.pathToSlap + 'slap.mp3');
        return this.each(function () {
            var self = $(this);
            self.css({
                'cursor': 'pointer',
                'transition': 'transform '+settings.slapDuration+'ms ',
                borderSpacing: 0,
                'transition-timing-function' : 'cubic-bezier(0.950, 0.050, 0.795, 0.035)'
            });
            if (self.css("display") != "block" && self.css("display") != "inline-block") {
                self.css("display", "inline-block");
            }
            self.on("mousedown", function () {
                swooshAudio.play();
            });
            var x=0,
                y=0,
                prevdeg=0;
            self.on("mouseup", function (event) {
                slapAudio.play();
                halfX = (self.width() / 2);
                halfY = (self.height() / 2);
                longerSide = halfX > halfY ? halfX : halfY;
                coordX = event.offsetX - halfX;
                coordY = event.offsetY - halfY;
                radius = Math.sqrt((coordX * coordX) + (coordY * coordY))
                intensity = (radius / longerSide) ;
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
              
            
                var stepCount = 0;


                console.log(360 * intensity * settings.slapIntensity)
                self
                            .css({
                                'transform': 'rotate3d(' + (x) + ',' + (y) + ', 0 ,' + (360 * intensity * settings.slapIntensity) + 'deg)'
                            });
                /*
                console.log((  self.css("transform")));
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
                        prevdeg = deg;
                        $(this)
                            .css({
                                'transform': 'rotate3d(' + (x) + ',' + (y) + ',' + (z) + ',' + (deg) + 'deg)'
                            });
                    },
                    duration: settings.slapDuration
                }, "easeOutQuad",function(){alert("finished")});*/
            });
        });
    };
}(jQuery));
