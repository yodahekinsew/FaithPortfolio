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
 * Startup
 */
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

    // Check if we're done running through all the words (there are 7)
    if (numIterations == 7) {
      setTimeout(() => {
        document.getElementById("sliding-text-viewport").style.overflow =
          "unset";
        document.getElementById("sliding-text-holder").style.transition =
          "unset";
      }, 500);
      clearInterval(test);
    }
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
