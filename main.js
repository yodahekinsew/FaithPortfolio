/**
 * File Helper Functions
 */
function base64ToArrayBuffer(base64) {
  var binaryString = window.atob(base64);
  var binaryLen = binaryString.length;
  var bytes = new Uint8Array(binaryLen);
  for (var i = 0; i < binaryLen; i++) {
    var ascii = binaryString.charCodeAt(i);
    bytes[i] = ascii;
  }
  return bytes;
}

function saveByteArray(reportName, byte) {
  var blob = new Blob([byte], { type: "application/pdf" });
  var link = document.createElement("a");
  link.href = window.URL.createObjectURL(blob);
  var fileName = reportName;
  link.download = fileName;
  link.click();
}

/**
 * Portfolio Logic
 */
var pdf = require("pdf-lib");

// getPortfolioPage is expecting a url
const getPortfolioPage = async (url) => {
  const existingPdfBytes = await fetch(url).then((res) => res.arrayBuffer());
  const pdfDoc = await pdf.PDFDocument.load(existingPdfBytes);
  return pdfDoc;
};

// createCustomPortfolio is expecting a series of Portfolio page names
const createCustomPortfolio = async (...sectionNames) => {
  console.log("Creating custom portfolio");

  // Convert the section names to the file names
  sectionNames.unshift("title", "introduction");
  fileNames = sectionNames.map(
    (x) => "/static/portfolio_sections/" + x + ".pdf"
  );

  // Load PDF pages and insert them into the custom PDF
  const customPDF = await pdf.PDFDocument.create();

  for (const fileName of fileNames) {
    let section = await getPortfolioPage(fileName);
    let copiedPages = await customPDF.copyPages(
      section,
      section.getPageIndices()
    );
    copiedPages.forEach((page) => customPDF.addPage(page));
  }

  // Save the custom PDF and download it
  const pdfBytes = await customPDF.save();
  saveByteArray("Faith Jones Portfolio", pdfBytes);
};

// createCustomPortfolio("battle_boats", "solace", "pi_pie");

/**
 * Startup Animation
 */
// setTimeout(() => {
//   var numIterations = 1;
//   document.getElementById("sliding-text-holder").style.transform =
//     "translate(0px, calc(100% - 5vw - 15px))";
//   let test = setInterval(() => {
//     numIterations++;

//     let string = `translate(0px, calc(100% - ${numIterations * 5}vw - ${numIterations * 15}px))`;
//     document.getElementById("sliding-text-holder").style.transform = string;
//     console.log("Setting transform to " + string);

//     // Check if we're done running through all the words (there are 7)
//     if (numIterations == 7) {
//       setTimeout(() => {
//         document.getElementById("sliding-text-viewport").style.overflow =
//           "unset";
//         document.getElementById("sliding-text-holder").style.transition =
//           "unset";
//       }, 500);
//       clearInterval(test);
//     }
//   }, 500);
//   // document.getElementById("sliding-text-holder").style.transform =
//   //   "translate(0px, -10px)";
//   setTimeout(() => {
//     document.getElementById("all-content").classList.add("scrollable-content");
//     navButtons.classList.add("home-nav");
//     setTimeout(() => (navButtons.style.pointerEvents = "unset"), 1500);
//   }, 3500);
//   // }, 0);
//   // }, 5000);
// }, 1000);c

var numIterations = 6;
const getStyleString = () => `translate(0px, calc(5vw + ${numIterations * 5}vw + ${numIterations * 15}px + 7.5px - 10px))`;
console.log(getStyleString());
document.getElementById("sliding-text-holder").style.transform = getStyleString();
document.getElementById("sliding-text-viewport").style.overflow = "hidden";
var startingAnimInterval;
const startingAnimTimeout = setTimeout(() => {
  startingAnimInterval = setInterval(() => {
    numIterations--;

    if (numIterations > -1) {
      document.getElementById("sliding-text-holder").style.transform = getStyleString();
    } else if (numIterations == -1) {
      document.getElementById("sliding-text-holder").style.transform = "translate(0, -10px)";
    } else {
      setTimeout(() => {
        document.getElementById("sliding-text-viewport").style.overflow = "unset";
        document.getElementById("sliding-text-holder").style.transition = "unset";
      }, 500);
      clearInterval(startingAnimInterval);
    }
  }, 750);
}, 0)

function myFunction(x) {
  if (!x.matches) {
    clearTimeout(startingAnimTimeout);
    clearInterval(startingAnimInterval);
    document.getElementById("sliding-text-viewport").style.overflow = "unset";
    document.getElementById("sliding-text-holder").style.transition = "unset";
    document.getElementById("sliding-text-holder").style.transform = "translate(0, -10px)";
  }
}

var x = window.matchMedia("(min-width: 768px)")
myFunction(x) // Call listener function at run time
x.addListener(myFunction) // Attach listener function on state changes