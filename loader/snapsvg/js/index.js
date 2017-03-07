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
var s = new Snap('#loading_logo');
var $logo = $('#logo');
var $loadingLogo = $('#loading_logo');

var c1 = s.select('#c1');
var c2 = s.select('#c2');
var c3 = s.select('#c3');
var c4 = s.select('#c4');
var d1 = s.select('#d1');
var d2 = s.select('#d2');
var d3 = s.select('#d3');

var a = s.selectAll('.a');
var c = s.selectAll('.c');
var d = s.selectAll('.d');

var c1Length = c1.getTotalLength();
var c2Length = c2.getTotalLength();
var c4Length = c4.getTotalLength();

var d1Length = d1.getTotalLength();
var d2Length = d2.getTotalLength();
var animationDuration = 500;

window.isPageLoaded = false;

function drawStrokes(reverse) {
  if(reverse === true) {
    c1Offset = 0;
    c2Offset = 0;
    c4Offset = 0;
    d1Offset = 0;
    d2Offset = 0;
  } else {
    c1Offset = c1Length;
    c2Offset = c2Length;
    c4Offset = c4Length;
    d1Offset = d1Length;
    d2Offset = d2Length;
  }

  c1.animate({'stroke-dashoffset':c1Offset}, animationDuration, mina.ease);
  c2.animate({'stroke-dashoffset':c2Offset}, animationDuration, mina.ease);
  c3.animate({'stroke-dashoffset':c1Offset}, animationDuration, mina.ease);
  c4.animate({'stroke-dashoffset':c4Offset}, animationDuration, mina.ease);

  d1.animate({'stroke-dashoffset':d1Offset}, animationDuration, mina.ease);
  d2.animate({'stroke-dashoffset':d2Offset}, animationDuration, mina.ease);
  d3.animate({'stroke-dashoffset':d1Offset}, animationDuration, mina.ease);
}

function fillShapes(opacity){
  for (var i = 0; i < a.length; i++) {
    a[i].animate({'fill-opacity':opacity},animationDuration, mina.ease);
  }
}

function forward() {
  drawStrokes(true);
  setTimeout(function(){fillShapes(1)}, animationDuration/4);
}

function reverse(){
  fillShapes(0);
  setTimeout(function(){drawStrokes(false)}, animationDuration*2);
}

function run() {
  forward();
  $loadingLogo.one(transitionEvent, function(){
    if (window.isPageLoaded) {
      var logoOffsets = $logo.offset();
      var loadingLogoOffsets = $loadingLogo.offset();
      $loadingLogo.css({
        position:'fixed',
        top:loadingLogoOffsets.top+'px',
        left:loadingLogoOffsets.left+'px',
      });
      setTimeout(function(){
        $loadingLogo.css({
          top:logoOffsets.top+'px',
          left:logoOffsets.left+'px',
          width: $logo.width(),
          height: $logo.height(),
        });
      },2);
      setTimeout(function(){
        jQuery('#page-loader').fadeOut(400, function(){});
      }, 500);

    } else {
      reverse();
      setTimeout(run,animationDuration*3);
    }
  });

}


$(document).ready(function(){
  //run();
});

$(window).load(function(){
 //window.isPageLoaded = true;
});


