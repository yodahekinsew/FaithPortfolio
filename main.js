/**
 * Startup
 */
// window.addEventListener("load", () => {});
setTimeout(() => {
  var numIterations = 1;
  document.getElementById("sliding-text-holder").style.transform =
    "translate(0px, calc(100% - 10px - 5vw))";
  let test = setInterval(() => {
    numIterations++;

    let string = `translate(0px, calc(100% - 10px - ${numIterations * 5}vw - ${
      numIterations * 15
    }px + 15px))`;
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
}, 1000);
