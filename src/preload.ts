// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
import { webFrame } from "electron";
window.addEventListener("DOMContentLoaded", () => {
  const replaceText = (selector: string, text: string) => {
    const element = document.getElementById(selector);
    if (element) {
      element.innerText = text;
    }
};

  for (const type of ["chrome", "node", "electron"]) {
    replaceText(`${type}-version`, process.versions[type as keyof NodeJS.ProcessVersions]);
  }
});

const zoomIn = document.getElementById('zoomIn')
const zoomOut = document.getElementById('zoomOut')
const Reset = document.getElementById('Reset')

zoomIn.addEventListener('click', function () {
  console.log("click");
  
  webFrame.setZoomFactor(webFrame.getZoomFactor()+1)
})

zoomOut.addEventListener('click', function () {
  webFrame.setZoomFactor(webFrame.getZoomFactor()-1)

})
Reset.addEventListener('click', function () {
  webFrame.setZoomFactor(1)

})