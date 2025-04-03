export function renderPage(pageData) {
    const logoContainer = document.getElementById("logo-container");
    const bgContainer = document.getElementById("bg-container");
    const faviconElement = document.getElementById("favicon");
    const metaDescription = document.querySelector('meta[name="description"]');
  
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
  }