document.addEventListener("DOMContentLoaded", function () {
  const logoContainer = document.getElementById("logo-container");
  const linksContainer = document.getElementById("links-container");
  const bgContainer = document.getElementById("bg-container");

  // Generate a unique query parameter
  const timestamp = Date.now();

  fetch(`config/page.json?t=${timestamp}`)
    .then((response) => response.json())
    .then((config) => {
      // Set the logo
      if (config.logo) {
        const logoImg = document.createElement("img");
        logoImg.src = config.logo;
        logoImg.alt = "Logo";
        logoContainer.appendChild(logoImg);
      }

      // Set the background image
      if (config.backgroundImage) {
        bgContainer.style.backgroundImage = `url(${config.backgroundImage})`;
      }

      // Set the favicon
      if (config.favicon) {
        const faviconElement = document.getElementById("favicon");
        faviconElement.href = config.favicon;
      }

      // Set the title
      if (config.title) {
        document.title = config.title;
      }
    });

  fetch(`config/links.json?t=${timestamp}`)
    .then((response) => response.json())
    .then((data) => {
      data.forEach((link) => {
        const linkButton = document.createElement("a");
        linkButton.href = link.url;
        linkButton.rel = "noopener";
        linkButton.classList.add("link-button");

        if (link.color) {
          linkButton.style.backgroundColor = link.color;
        }

        if (link.logo) {
          const logoImg = document.createElement("img");
          logoImg.src = link.logo;
          logoImg.alt = link.text;
          linkButton.appendChild(logoImg);
        }

        const spanText = document.createElement("span");
        spanText.textContent = link.text;
        linkButton.appendChild(spanText);

        linkButton.setAttribute("title", link.hoverText);

        if (link.gradient) {
          const gradientStyle = generateGradientStyle(link.gradient);
          linkButton.style.backgroundImage = gradientStyle;
        }

        linkButton.setAttribute("aria-label", link.text);

        linksContainer.appendChild(linkButton);
      });
    })
    .catch((error) => {
      console.error("Error fetching links:", error);
    });
});

document.addEventListener("DOMContentLoaded", function () {
  const footerBar = document.getElementById("footer-bar");

  // Generate a unique query parameter
  const timestamp = Date.now();

  fetch(`config/footer.json?t=${timestamp}`)
    .then((response) => response.json())
    .then((data) => {
      const { color, items } = data;

      // Set the color of the footer bar
      footerBar.style.backgroundColor = color;

      items.forEach((item) => {
        const footerItem = document.createElement("p");
        footerItem.classList.add("footer-bar-item");

        if (typeof item === "string") {
          const linkRegex = /\[(.*?)\]\((.*?)\)/g;
          const linkMatches = item.match(linkRegex);

          if (linkMatches) {
            const linkText = linkMatches[0].match(/\[(.*?)\]/)[1];
            const linkUrl = linkMatches[0].match(/\((.*?)\)/)[1];

            const linkElement = document.createElement("a");
            linkElement.href = linkUrl;
            linkElement.textContent = linkText;

            const additionalText = item.split(linkMatches[0]);
            footerItem.appendChild(document.createTextNode(additionalText[0]));
            footerItem.appendChild(linkElement);
            footerItem.appendChild(document.createTextNode(additionalText[1]));
          } else {
            footerItem.innerText = item;
          }
        } else {
          footerItem.innerText = item;
        }

        footerBar.appendChild(footerItem);
      });
    })
    .catch((error) => {
      console.error("Error fetching footer items:", error);
    });
});

function generateGradientStyle(gradient) {
  if (gradient.type === "linear") {
    return `linear-gradient(${gradient.direction}, ${gradient.colors.join(
      ", "
    )})`;
  } else if (gradient.type === "radial") {
    return `radial-gradient(${gradient.shape} ${
      gradient.position
    }, ${gradient.colors.join(", ")})`;
  }

  return "";
}

function setButtonMargins() {
  const aspectRatio = window.innerWidth / window.innerHeight;
  const linksContainer = document.getElementById("links-container");

  if (aspectRatio < 1) {
    linksContainer.style.marginLeft = "10%";
    linksContainer.style.marginRight = "10%";
  } else {
    linksContainer.style.marginLeft = "30%";
    linksContainer.style.marginRight = "30%";
  }
}

// Call the function initially when the page loads
document.addEventListener("DOMContentLoaded", setButtonMargins);

// Call the function whenever the window is resized
window.addEventListener("resize", setButtonMargins);
