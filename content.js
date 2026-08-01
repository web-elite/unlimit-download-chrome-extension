const keywords = [
  "download",
  "download file",
  "get file",
  "start",
  "دانلود"
];

function extractUrl(el) {
  return (
    el.href ||
    el.dataset.url ||
    el.getAttribute("data-url") ||
    el.dataset.href ||
    el.getAttribute("data-href") ||
    null
  );
}

function extractText(el) {
  return (
    el.innerText ||
    el.textContent ||
    el.value ||
    el.title ||
    ""
  )
  .trim()
  .replace(/\s+/g, " ");
}
function scanPage() {

  const elements = [
    ...document.querySelectorAll(
      "a, button, input, [data-url], [data-href]"
    )
  ];

  return elements
    .map(el => {

      const text = extractText(el);

      const result = extractUrl(el);

      if (!result)
        return null;

      return {
        tag: el.tagName,
        text,
        href: result.url,
        title: el.title || "",
        disabled:
          el.disabled ||
          el.classList.contains("disabled"),
        visible:
          !!(
            el.offsetWidth ||
            el.offsetHeight ||
            el.getClientRects().length
          )
      };

    })
    .filter(item => {

      if (!item)
        return false;

      const text =
        item.text.toLowerCase();

      const title =
        item.title.toLowerCase();

      return (
        keywords.some(k =>
          text.includes(k)
        )
        ||
        keywords.some(k =>
          title.includes(k)
        )
      )
      &&
      item.href;

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

const siteHandlers = [
  {
    match: () => location.hostname.includes("uptodown.com"),
    extract: uptodownExtractor
  }
];

function uptodownExtractor(el) {

  const token =
    el.getAttribute("data-url");

  if (!token)
    return null;

  const version =
    el.getAttribute(
      "data-download-version"
    );

  const filename =
    detectUptodownFilename();

  return {
    type: "direct",
    url:
      `https://dw.uptodown.net/dwn/${token}/${filename}`
  };

}

function detectUptodownFilename() {

  // پیدا کردن نام فایل از اطلاعات صفحه
  const links =
    [
      ...document.querySelectorAll(
        "a[href]"
      )
    ];

  for (const link of links) {

    const href =
      link.href;

    if (
      href.includes(".exe") ||
      href.includes(".msix") ||
      href.includes(".apk")
    ) {

      return href.split("/").pop();

    }

  }

  // fallback
  return "download";

}

function genericExtractor(el) {

  return (
    el.href ||
    el.getAttribute("data-url") ||
    el.getAttribute("data-href") ||
    null
  );

}

function extractUrl(el) {

  const handler =
    siteHandlers.find(
      h => h.match()
    );

  if (handler) {

    const result =
      handler.extract(el);

    if(result)
      return result;

  }

  const url =
    genericExtractor(el);

  if(!url)
    return null;

  return {
    type:"direct",
    url
  };

}