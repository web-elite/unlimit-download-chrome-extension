const container =
  document.getElementById("downloads");

chrome.tabs.query(
  {
    active: true,
    currentWindow: true
  },
  async ([tab]) => {

    chrome.tabs.sendMessage(
      tab.id,
      {
        action: "scan"
      },
      response => {

        if (!response || !response.results.length) {

          container.innerHTML =
            "<p>No download found</p>";

          return;
        }

        response.results.forEach(item => {

          if (!item.href) return;

          const btn =
            document.createElement("button");

          btn.className =
            "download-btn";

          btn.innerText =
            item.text ||
            "Download";

          btn.onclick = () => {

            chrome.tabs.create({
              url: item.href
            });

          };

          container.appendChild(btn);

        });

      }
    );

  }
);