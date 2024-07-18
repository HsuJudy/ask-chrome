// // chrome has access to the DOM of the current page

// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//     if (request.action === "getContent") {

//         let pageContent = document.body.innerText;
//         sendResponse({content: pageContent});
//     }
// });

let pageContent = document.body.innerText;
console.log(pageContent)