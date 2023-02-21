

const excludedKeywords = ["jpg", "woff", "image", "png" ];

chrome.webRequest.onBeforeRequest.addListener(
  function (details) {

    if(!excludedKeywords.some((keyword) => details.url.includes(keyword))) {
      console.log("Intercepted Request:", details.requestId, details.url);
      console.log("JSON:", JSON.stringify(details, null, 2))
      }
  },
  {
      urls: [
"<all_urls>"
      ],
  },
  ["blocking"]
);

chrome.webRequest.onCompleted.addListener(
  function (details) {
    if(!excludedKeywords.some((keyword) => details.url.includes(keyword))) {
      console.log(
        "Intercepted Response:",
        details.requestId,
        details.url,
        details.statusCode
      );
      console.log("JSON:", JSON.stringify(details, null, 2))

    }
  },
  {
      urls: [
          "<all_urls>"
      ],
  }
);
