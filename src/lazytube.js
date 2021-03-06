/*
 * lazytube
 * https://github.com/soenkekluth/lazytube
 *
 * Copyright (c) 2014 Sönke Kluth
 * Licensed under the MIT license.
 */

(function($) {

    'use strict';


    var defaults = {

        width: 320,
        height: 200,
        playButton:1,
        autoplay: 1,
        modestbranding: 1,
        autohide: 1,
        showinfo: 0,
        controls: 0
    };


    function LazyTube(element, options) {
        this.element = element;
        this.$el = $(element);

        this.settings = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = 'lazytube';

        this.init();
    }


    LazyTube.prototype = {

        init: function() {

            var $el = this.$el,
                width = this.settings.width = $el.data('width'),
                height = this.settings.height = $el.data('height'),
                videoID = this.settings.videoID = $el.data('lazytube-id');

            $el.css({
                'position': 'relative',
                'height': height,
                'width': width,
                'background': 'url(http://img.youtube.com/vi/' + videoID + '/maxresdefault.jpg) center center no-repeat',
                'cursor': 'pointer',
                '-webkit-background-size': 'cover',
                '-moz-background-size': 'cover',
                '-o-background-size': 'cover',
                'background-size': 'cover'
            })
                .on('click', $.proxy(function(event) {
                    event.preventDefault();
                    this.tube();
                }, this));

            this.createPlayButton();

            return this;
        },

        createPlayButton:function(){

            $('<button>',{
                class:'lazytube-playbutton',
                css:{
                    'position' : 'absolute',
                    'cursor': 'pointer',
                    'margin':'auto',
                    'border':'none',
                    'outline':'none',
                    'width':'60px',
                    'height':'40px',
                    'top':'0',
                    'right':'0',
                    'bottom':'0',
                    'left':'0',
                    'background': 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAApCAYAAABp50paAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAABV9JREFUeNrcWk1IK1cUvrmZGBOjJvr6xKe+Slvroi6kK6GrUkSxO12IC6GgUFBcuOlC8GdRulERV3VRQV0IKhRU0NJupK3tpi1dCRaxffWHGjWZPJNnNJlMz9FzX+ZNkzylcxP1wMdMZiYz97vnu+ee+2Njmc0GyANwgANQDCgAuABOwGOAG6AAiuh+MV3Lo+fc9KyN3qGYvnEBSAA0QBTwAnBp+P0ccAxQ6bkw/T4HRABn9B+8F6f/ZiRktjJANaCSUE0kkVApoBDgAeQTIeM7dAKjAuiG6+b7wniKstgMv+2m5xMGslgZIUAAEAOcAv4GHAL+BDwDBNMRxvOPAZ8C3iUPOVNUiGaCfgOV3MZe9z5OlSDAUzxzQZXyC+BLwM+pCtMJGCTvCTJxOlpBxGpLVzF2ajqiMvyAzwDfGuXyPuALkmyY5KGZ5GVGri1duXRyVIyOPsA7gO9R/iIYtQLKiSy7Q6T+b2UkSN7vAT4U7QGDz9Mbtp/7SPySjh9gj8EpApeyh2/YoyicuhlvhuBkVU3n2jA/cBkJxyUVjBuipz2HEf0qYcKs5w1ify6DbFVVVbSrq0s9ODhQlpaWClRVdUtWUyqLE0cPEn5CXkhI8HC8ubk5ODw8XJBIJOJNTU2H/f39j/f29jxZDJI2Iowq9nJiLk1KZWWYqcKHOC9pa2t7c21tLdTR0XHgdDo1kng22rdGQaucU2YlraY1TRPJACrIXldXVzU/P+8YHR09rqysVIkwz1JWxjmNZqQRBimbBxdIvLyvr8+7uroabGxs9NP1bAS0fOmE09Q2SsxdX19fsbCw4BgcHNzzeDxhGrDItCJO2s52hiVIO3w+X+nIyEgxRPCjmpqaE8lp7VU/nCeTMASrTO++GrTDM8UQzStB4uHOzs5niqIkJLRrLIeTG2QkpVZtthu9Fgk6amtrn8zMzLgmJyePvV7vmcVl0kUuncfuhumkiIqenh7f4uJiAJKWMwuDmS4krdyxURKOYz0Qvd0NDQ1Ri9+tKIbh050Zx+q6fjg1NaWtr6/7SO5WvTuq0ABZuNyWY7L6ycnJ0dDQ0OXc3FxFJBKxW0w4opCEcmnYrDh4Vd3c3FS7u7t929vbj6ipWT3IuOREOFeeRQ/GQqGQf2xsLNDS0vIIyBbRdU2Cgl5K2pYD+SKpF1tbW0cDAwOu5eXlKkleNdqVpMMyk3eQaioJ6zCo8M/OzsZh6Fi0v79fYsi+ZNpzJByU6WHD4AEJ4QxpfHd392hiYuJyenq64vz8XGGvrlJIHSbix46lavc60xISVjc2NsK9vb0ukHKZYeIhG00I7WpeOirxQ3xnZwc99w90MaHx8fFAa2trMZAtYcl542wYOhbXoU7xox8BvmLJFTxLCRcWFkbb29tVv9+vrKyseOnj2SL6MqUEHAA+QcJ1gDl2PTcdldCexeKXCEq5GIrizOzvgC5OUTrI/rtua1ncYsl1nlzm7CjpCKcTld3vtaQbZVlY+SJoBR4wUeHIPUyykDBOwP8mZgTYw1pQQy755N2fsGlxurgO+JUmAxyGh/V7VgHmMjspNn0D+IEZZhOwDf/FrheOn7Lkdgexkm43vfB18rF8JuQGvYCD4DSUH69/B/gccJSqgG+z630euJb6Fv3JaSCfjpBm6McTFqWKNvbqPg6eIefXSbYXVAbc8PIH4EfA1+x620NGj2Cf7KMOG7cm4fi0hK5XUw0KiG1MeHQTHBZGVrFjJ0znuEXpjIItdnX7FHRPCeLeITPt4LmtBEWNiz1XYj7MxZJbmPIJpSy5pUlUXDrPxAzKiBBJN53vk9fE/q0okY4ZVBS7jaL+FWAA/y++OTUmOgsAAAAASUVORK5CYII=)'
                }
            }).appendTo(this.$el);
        },


        tube: function() {
            if (!this.$el.hasClass('lazytube-loaded')) {
                this.$el.html('<iframe width="' + this.settings.width + '" height="' + this.settings.height + '" src="http://www.youtube.com/embed/' + this.settings.videoID + '?autoplay='+this.settings.autoplay+'&modestbranding='+this.settings.modestbranding+'autohide='+this.settings.autohide+'&showinfo='+this.settings.showinfo+'&controls='+this.settings.controls+'" frameborder="0" allowfullscreen></iframe>')
                    .addClass('lazytube-loaded').off('click');
            }
            return this;
        }
    };


    $.fn.lazytube = function(options) {
        return this.each(function() {
            if (!$.data(this, 'plugin_lazytube')) {
                $.data(this, 'plugin_lazytube', new LazyTube(this, options));
            }
        });
    };


    // Static method.
    $.lazytube = function(options) {
        // Override default options with passed-in options.
        options = $.extend({}, $.lazytube.options, options);
        // Return something awesome.
        return 'awesome' + options.punctuation;
    };

    // Static method default options.
    $.lazytube.options = {
        punctuation: '.'

    };

    // Custom selector.
    $.expr[':'].lazytube = function(elem) {
        // Is this element awesome?
        return $(elem).text().indexOf('awesome') !== -1;
    };

}(jQuery));
