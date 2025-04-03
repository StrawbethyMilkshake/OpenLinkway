import { fetchData } from './fetch.js';
import { renderPage } from './page.js';
import { renderLinks } from './links.js';
import { renderBars } from './bars.js';
import './responsive.js';

document.addEventListener("DOMContentLoaded", async function () {
  if (!document.documentElement.hasAttribute('rendered')) {
    try {
      const linksData = await fetchData("config/links.json");
      const pageData = await fetchData("config/page.json");
      const barsData = await fetchData("config/bars.json");

      if (linksData) {
        renderLinks(linksData);
      }
      if (pageData) {
        renderPage(pageData);
      }
      if (barsData) {
        renderBars(barsData);
      }
    } catch (error) {
      console.error("Error loading configuration:", error);
    }
  }
});