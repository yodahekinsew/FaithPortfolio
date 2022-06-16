(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
/**
 * Startup
 */
// window.addEventListener("load", () => {});
setTimeout(() => {
  var numIterations = 1;
  document.getElementById("sliding-text-holder").style.transform =
    "translate(0px, calc(100% - 5vw - 10px))";
  let test = setInterval(() => {
    numIterations++;

    let string = `translate(0px, calc(100% - 10px - ${numIterations * 5}vw))`;
    document.getElementById("sliding-text-holder").style.transform = string;

    if (numIterations == 7) clearInterval(test);
  }, 500);
  // document.getElementById("sliding-text-holder").style.transform =
  //   "translate(0px, -10px)";
  setTimeout(() => {
    document.getElementById("all-content").classList.add("scrollable-content");
    navButtons.classList.add("home-nav");
    setTimeout(() => (navButtons.style.pointerEvents = "unset"), 1500);
  }, 3500);
  // }, 0);
  // }, 5000);
}, 0);

},{}]},{},[1]);
