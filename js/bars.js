import { createBarItem } from './utils.js';

export function renderBars(barsData) {
  const headerBar = document.getElementById("header-bar");
  const footerBar = document.getElementById("footer-bar");

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
}