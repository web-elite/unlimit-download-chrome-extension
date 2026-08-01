const keywords = [
  "download",
  "دانلود",
  "continue",
  "get file",
  "start"
];

function scanPage() {

  const elements = [
    ...document.querySelectorAll(
      "button,a,input"
    )
  ];

  return elements
    .map(el => {

      const text = (
        el.innerText ||
        el.value ||
        el.getAttribute("aria-label") ||
        ""
      )
      .trim();

      const href =
        el.href ||
        el.getAttribute("data-url") ||
        el.getAttribute("data-href");

      return {
        tag: el.tagName,
        text,
        href,
        disabled:
          el.disabled ||
          el.hasAttribute("disabled"),
        visible:
          !!(
            el.offsetWidth ||
            el.offsetHeight ||
            el.getClientRects().length
          )
      };

    })
    .filter(item => {

      const text =
        item.text.toLowerCase();

      return keywords.some(k =>
        text.includes(k)
      );

    });

}

chrome.runtime.onMessage.addListener(
  (request, sender, sendResponse) => {

    if(request.action === "scan") {

      sendResponse({
        url: location.href,
        results: scanPage()
      });

    }

  }
);

const observer =
new MutationObserver(() => {

  scanPage();

});

observer.observe(
  document.body,
  {
    childList:true,
    subtree:true,
    attributes:true
  }
);