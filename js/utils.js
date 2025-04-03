export function generateGradientStyle(gradient) {
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
  
  export function processMarkdownLinks(text) {
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
  
  export function createBarItem(item) {
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
  