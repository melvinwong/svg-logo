// Function from David Walsh: http://davidwalsh.name/css-animation-callback
function whichTransitionEvent(){
  var t,
      el = document.createElement("fakeelement");
  var transitions = {
    "transition"      : "transitionend",
    "OTransition"     : "oTransitionEnd",
    "MozTransition"   : "transitionend",
    "WebkitTransition": "webkitTransitionEnd"
  }

  for (t in transitions){
    if (el.style[t] !== undefined){
      return transitions[t];
    }
  }
}
var transitionEvent = whichTransitionEvent();

jQuery(document).ready(function(){
  loadingLogo.init();
  loadingLogo.run();
});

jQuery(window).load(function(){
  window.isPageLoaded = true;
});


var loadingLogo = {
  animationDuration: 500,
  sOffsets: [313, 926, 313, 679, 1013, 215, 1013],
  init: function(){
    this.$logo = jQuery('#logo');
    this.$loadingLogo = jQuery('#loading-logo');
    this.s = jQuery('.s');
    this.f = jQuery('.f');
  },
  drawStrokes: function(forward){
    if (forward === true) {
      this.s.animate({'stroke-dashoffset': 0}, this.animationDuration, 'swing');
    } else {
      for(var i=0; i<this.sOffsets.length; i++) {
        this.s.eq(i).animate({'stroke-dashoffset': this.sOffsets[i]}, this.animationDuration, 'swing');
      }
    }
  },
  fillShapes: function(opacity){
    opacity = parseFloat(opacity) || 0;
    this.f.animate({'fill-opacity':opacity}, this.animationDuration, 'swing');
  },
  forward: function(){
    var _this = this;
    _this.drawStrokes(true);
    setTimeout(function(){
      _this.fillShapes(1);
    }, _this.animationDuration / 2)
  },
  reverse: function(){
    var _this = this;
    _this.fillShapes(0);
    setTimeout(function(){
      _this.drawStrokes(false)
    }, _this.animationDuration * 2);
  },
  run: function(){
    var _this = this;
    _this.forward();
    _this.$loadingLogo.one(transitionEvent, function(){
      if (window.isPageLoaded) {
        var logoOffsets = _this.$logo.offset();
        var loadingLogoOffsets = jQuery('#loading-logo-wrap').position();
        _this.$loadingLogo.css({
          position:'fixed',
          top:loadingLogoOffsets.top+'px',
          left:loadingLogoOffsets.left+'px',
        });
        setTimeout(function(){
          _this.$loadingLogo.css({
            top:logoOffsets.top+'px',
            left:logoOffsets.left+'px',
            width: _this.$logo.width(),
            height: _this.$logo.height(),
          });
        },1);
        setTimeout(function(){
          jQuery('#page-loader').fadeOut(400, function(){});
        }, _this.animationDuration);
      } else {
        _this.reverse();
        setTimeout(function(){_this.run();}, _this.animationDuration*3);
      }
    });
  }
};