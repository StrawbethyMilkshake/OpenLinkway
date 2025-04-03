import { generateGradientStyle } from './utils.js';

export function renderLinks(linksData) {
    const linksContainer = document.getElementById("links-container");
  
    linksData.forEach((link) => {
      const linkButton = document.createElement("a");
      linkButton.href = link.url;
      linkButton.classList.add("link-button");
  
      if (link.rel) {
        linkButton.rel = link.rel;
      } else {
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
  }