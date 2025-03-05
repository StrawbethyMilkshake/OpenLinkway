// OpenLinkway Rendering Code
  document.addEventListener("DOMContentLoaded", function () {
    if (!document.documentElement.hasAttribute('rendered')) { // If page is marked as rendered do not render again
      // Define Containers for adding elements to
        const logoContainer = document.getElementById("logo-container");
        const linksContainer = document.getElementById("links-container");
        const bgContainer = document.getElementById("bg-container");
        const footerBar = document.getElementById("footer-bar");
        const headerBar = document.getElementById("header-bar");
        const metaDescription = document.querySelector('meta[name="description"]'); // TODO: Fix descriptions not applying

      // Generate a unique query parameter - This is for non pre rendered sites to prevent cache errors
        const timestamp = Date.now();

      // Fetch links info
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

      // Fetch general page config
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

      // Fetch header/footer bars info
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

      // Processing page
      Promise.all([linksPromise, pagePromise, barsPromise])
        .then(([linksData, pageData, barsData]) => {
          // Set the page logo
          if (pageData.logo) {
            const logoImg = document.createElement("img");
            logoImg.src = pageData.logo;
            logoImg.alt = "Logo";
            logoContainer.appendChild(logoImg);
          }
          
          // Set the page background image
          if (pageData.backgroundImage) {
            bgContainer.style.backgroundImage = `url(${pageData.backgroundImage})`;
          }

          // Set the Favicon
          if (pageData.favicon) {
            const faviconElement = document.getElementById("favicon");
            faviconElement.href = pageData.favicon;
          }

          // Set the page title
          if (pageData.title) {
            document.title = pageData.title;
          }

          // Set the page description - TODO: Fix this and maybe do more metadata tags
          if (pageData.description) {
            metaDescription.textContent = pageData.description;
          }

          // Set page language
          if (pageData.language) {
            document.documentElement.lang = pageData.language;
          }  

          // Process the links configuration
          linksData.forEach((link) => {
            // Create button
            const linkButton = document.createElement("a");
            linkButton.href = link.url;
            linkButton.classList.add("link-button");

            // set rel config
            if (link.rel) {
              linkButton.rel = link.rel;
            } 
            else {
              linkButton.rel = "noopener";
            }

            // Set button colour
            if (link.color) {
              linkButton.style.backgroundColor = link.color;
            }

            // Set button icon
            if (link.logo) {
              const logoImg = document.createElement("img");
              logoImg.src = link.logo;
              logoImg.alt = link.text;
              linkButton.appendChild(logoImg);
            }

            // Open link in a new tab?
            if (link.newTab) {
              linkButton.target = "_blank"; 
            }

            // Create a span to hold the link's text and add it to the button.
            const spanText = document.createElement("span");
            spanText.textContent = link.text;
            linkButton.appendChild(spanText);

            // Set hover text
            linkButton.setAttribute("title", link.hoverText);

            // Configure text settings
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

            // Configure button gradient
            if (link.gradient) {
              const gradientStyle = generateGradientStyle(link.gradient);
              linkButton.style.backgroundImage = gradientStyle;
            }

            // Set screen reader label
            linkButton.setAttribute("aria-label", link.text);

            // Add button to links
            linksContainer.appendChild(linkButton);
          });

          // Process the bars configuration
          const { header, footer } = barsData;

          // Header Bar
            if (header) {
              headerBar.style.backgroundColor = header.color; // Set header bar colour

            // Process header items
            if (header.items) {
              header.items.forEach((item) => {
                const headerItem = createBarItem(item);
                headerBar.appendChild(headerItem);
              });
            }
          }

          // Footer Bar
            if (footer) {
              footerBar.style.backgroundColor = footer.color;  // Set footer bar colour

            // Process footer items
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
    }
  });

// OpenLinkway Functions
  // Function for button colour gradients
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

  // Function for converting markdown links into HTML links for the header/footer bars
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

  // Function for adding elements to the header/footer bars (Calls processMarkdownLinks)
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

  // Function to rightsize elements on page for desktop/mobile view
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

// Page Rightsizing
  document.addEventListener("DOMContentLoaded", pageRightsize); // Rightsize elements on page load
  window.addEventListener("resize", pageRightsize); // Rightsize elements on canvas resize
