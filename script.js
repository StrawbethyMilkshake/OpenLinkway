document.addEventListener("DOMContentLoaded", function () {
  const logoContainer = document.getElementById("logo-container");
  const linksContainer = document.getElementById("links-container");
  const bgContainer = document.getElementById("bg-container");
  const footerBar = document.getElementById("footer-bar");
  const headerBar = document.getElementById("header-bar");
  const metaDescription = document.querySelector('meta[name="description"]');

  // Generate a unique query parameter 
  const timestamp = Date.now();

  const linksPromise = fetch(`config/links.json?t=${timestamp}`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        console.error("Error fetching links:", response.status);
        return []; // Provide an empty array as a fallback
      }
    })
    .catch((error) => {
      console.error("Error fetching links:", error);
      return []; // Provide an empty array as a fallback
    });

  const pagePromise = fetch(`config/page.json?t=${timestamp}`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        console.error("Error fetching page configuration:", response.status);
        return {}; // Provide an empty object as a fallback
      }
    })
    .catch((error) => {
      console.error("Error fetching page configuration:", error);
      return {}; // Provide an empty object as a fallback
    });

  const barsPromise = fetch(`config/bars.json?t=${timestamp}`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        console.error("Error fetching bar configuration:", response.status);
        return {}; // Provide an empty object as a fallback
      }
    })
    .catch((error) => {
      console.error("Error fetching bar configuration:", error);
      return {}; // Provide an empty object as a fallback
    });

  Promise.all([linksPromise, pagePromise, barsPromise])
    .then(([linksData, pageData, barsData]) => {
      // Process the page configuration
      if (pageData.logo) {
        const logoImg = document.createElement("img");
        logoImg.src = pageData.logo;
        logoImg.alt = "Logo";
        logoContainer.appendChild(logoImg);
      }

      if (pageData.backgroundImage) {
        bgContainer.style.backgroundImage = `url(${pageData.backgroundImage})`;
      }

      if (pageData.favicon) {
        const faviconElement = document.getElementById("favicon");
        faviconElement.href = pageData.favicon;
      }

      if (pageData.title) {
        document.title = pageData.title;
      }

      if (pageData.description) {
        metaDescription.textContent = pageData.description;
      }

      if (pageData.language) {
        document.documentElement.lang = pageData.language;
      }  

      // Process the links configuration
      linksData.forEach((link) => {
        const linkButton = document.createElement("a");
        linkButton.href = link.url;
        linkButton.classList.add("link-button");

        if (link.rel) {
          linkButton.rel = link.rel;
        } 
        else {
          linkButton.rel = "noopener";
        }

        if (link.color) {
          linkButton.style.backgroundColor = link.color;
        }

        if (link.logo) {
          const logoImg = document.createElement("img");
          logoImg.src = link.logo;
          logoImg.alt = link.text;
          linkButton.appendChild(logoImg);
        }

        if (link.newTab) {
          linkButton.target = "_blank"; // Open link in a new tab
        }

        const spanText = document.createElement("span");
        spanText.textContent = link.text;
        linkButton.appendChild(spanText);

        linkButton.setAttribute("title", link.hoverText);

        if (link.fontFamily) {
          linkButton.style.fontFamily = link.fontFamily;
        }

        if (link.fontWeight) {
          linkButton.style.fontWeight = link.fontWeight;
        }

        if (link.fontSize) {
          linkButton.style.fontSize = link.fontSize;
        }

        if (link.textDecoration) {
          if (link.textDecoration.line) {
            linkButton.style.textDecorationLine = link.textDecoration.line;
          }
          if (link.textDecoration.thickness) {
            linkButton.style.textDecorationThickness = link.textDecoration.thickness;
          }
          if (link.textDecoration.style) {
            linkButton.style.textDecorationStyle = link.textDecoration.style;
          }
          if (link.textDecoration.color) {
            linkButton.style.textDecorationColor = link.textDecoration.color;
          }
        }

        if (link.textColor) {
          linkButton.style.color = link.textColor;
        }

        if (link.gradient) {
          const gradientStyle = generateGradientStyle(link.gradient);
          linkButton.style.backgroundImage = gradientStyle;
        }

        linkButton.setAttribute("aria-label", link.text);

        linksContainer.appendChild(linkButton);
      });

      // Process the bars configuration
      const { header, footer } = barsData;

      if (header) {
        headerBar.style.backgroundColor = header.color;

        if (header.items) {
          header.items.forEach((item) => {
            const headerItem = createBarItem(item);
            headerBar.appendChild(headerItem);
          });
        }
      }

      if (footer) {
        footerBar.style.backgroundColor = footer.color;

        if (footer.items) {
          footer.items.forEach((item) => {
            const footerItem = createBarItem(item);
            footerBar.appendChild(footerItem);
          });
        }
      }
    })
    .catch((error) => {
      console.error("Error loading configuration:", error);
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

function pageRightsize() {
  const aspectRatio = window.innerWidth / window.innerHeight;
  const logoContainer = document.getElementById('logo-container');
  const linksContainer = document.getElementById("links-container");
  const footer = document.querySelector("footer");

  if (aspectRatio < 1) {
    linksContainer.style.marginLeft = "10%";
    linksContainer.style.marginRight = "10%";
    logoContainer.classList.add("large");
    footer.classList.add("unpinned"); // Add the "unpinned" class
    
  } else {
    linksContainer.style.marginLeft = "30%";
    linksContainer.style.marginRight = "30%";
    footer.classList.remove("unpinned"); // Remove the "unpinned" class
    logoContainer.classList.remove("large");
  }
}

function processMarkdownLinks(text) {
  const linkRegex = /\[(.*?)\]\((.*?)\)/g;
  let remainingText = text;
  let processedText = "";

  while (remainingText.length > 0) {
    const linkMatches = remainingText.match(linkRegex);
    if (linkMatches) {
      const linkMatch = linkMatches[0];
      const linkText = linkMatch.match(/\[(.*?)\]/)[1];
      const linkUrl = linkMatch.match(/\((.*?)\)/)[1];

      const linkElement = `<a href="${linkUrl}">${linkText}</a>`;

      const linkIndex = remainingText.indexOf(linkMatch);
      const plainText = remainingText.substring(0, linkIndex);
      remainingText = remainingText.substring(linkIndex + linkMatch.length);

      processedText += plainText + linkElement;
    } else {
      processedText += remainingText;
      break;
    }
  }

  return processedText;
}

function createBarItem(item) {
  const barItem = document.createElement("p");
  barItem.classList.add("bar-item");

  if (typeof item === "string") {
    const processedItem = processMarkdownLinks(item);
    barItem.innerHTML = processedItem;
  } else {
    barItem.innerText = item;
  }

  return barItem;
}

// Call the function initially when the page loads
document.addEventListener("DOMContentLoaded", pageRightsize);

// Call the function whenever the window is resized
window.addEventListener("resize", pageRightsize);
