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
  
  document.addEventListener("DOMContentLoaded", pageRightsize);
  
  window.addEventListener("resize", pageRightsize);
  