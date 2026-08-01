const container = document.getElementById("downloads");

chrome.tabs.query(
  {
    active: true,
    currentWindow: true
  },
  ([tab]) => {

    chrome.tabs.sendMessage(
      tab.id,
      {
        action: "scan"
      },
      response => {

        if (chrome.runtime.lastError) {
          container.innerHTML =
            "<p>Content script error</p>";
          return;
        }

        console.log(response);

        if (!response || !response.results?.length) {

          container.innerHTML =
            "<p>No download found</p>";

          return;
        }

        response.results.forEach(item => {

          const btn =
            document.createElement("button");

          btn.className =
            "download-btn";

          btn.innerText =
            item.text ||
            item.title ||
            "Download";

          btn.onclick = () => {

            let url = item.href;

            if (!url) {
              alert("No URL found");
              return;
            }

            try {
              url =
                new URL(
                  url,
                  tab.url
                ).href;
            } catch(e) {}

            chrome.tabs.create({
              url
            });

          };

          container.appendChild(btn);

        });

      }
    );

  }
);