const puppeteer = require('puppeteer');
const fs = require('fs-extra');
const path = require('path');

async function preRender() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Load webpage
    await page.goto('http://0.0.0.0:8000/', { waitUntil: 'networkidle2' });


    // Get all the links to assets (CSS, JavaScript, images, etc.)
    const assets = await page.evaluate(() => {
        const links = Array.from(document.querySelectorAll('link[rel="stylesheet"], script[src]'));
        const images = Array.from(document.querySelectorAll('img'));
        return [
            ...links.map(link => link.href || link.src),
            ...images.map(img => img.src)
        ];
    });

    // Create the build directory if it doesn't exist
    const buildDir = path.resolve(__dirname, 'build');
    await fs.ensureDir(buildDir);

    // Save the rendered HTML
    const html = await page.content();

    // Add the "rendered" tag to the HTML content
    const modifiedHtml = html.replace(/<html[^>]*>/, (match) => match.replace('>', ' rendered>'));

    await fs.writeFile(path.join(buildDir, 'index.html'), modifiedHtml);

    // Copy styles.css and assets folder to build directory
    await fs.copy('styles.css', path.join(buildDir, 'styles.css'));
    await fs.copy('script.js', path.join(buildDir, 'script.js'));
    await fs.copy('config', path.join(buildDir, 'config'));
    await fs.copy('assets', path.join(buildDir, 'assets'));
    await fs.copy('robots.txt', path.join(buildDir, 'robots.txt'));
    await fs.copy('LICENSE.md', path.join(buildDir, 'LICENSE.md'));

    await browser.close();
}

preRender();