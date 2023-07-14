# OpenLinkway
OpenLinkway is a simple web application that allows you to create and customise a collection of links with ease.

## Project Goals

🔗 Simplify Link Management: OpenLinkway aims to provide a simple web application that allows users to create and customise a collection of links effortlessly.

👩‍💻 No Coding Required: The primary goal of OpenLinkway is to eliminate the need for users to write any code. Instead, users can configure OpenLinkway through easily editable configuration files.

🍦 Vanilla JS: OpenLinkway is built using only vanilla JavaScript, avoiding the use of any frameworks or libraries. This choice ensures simplicity and eliminates dependencies.

💻 Client-side Rendering: All rendering is done in the user's browser without the need for server-side code. This approach allows for minimal running costs, potentially making it feasible to host OpenLinkway for free or at very low cost.

✨ Easy customisation: With OpenLinkway, users can easily customise the appearance of their OpenLinkway page by editing configuration files. This flexibility enables users to create a personalised collection of links that aligns with their preferences and branding.

📚 Documentation: OpenLinkway strives to provide comprehensive documentation to assist users in setting up and configuring their OpenLinkway page. This ensures a smooth and hassle-free experience.

## Getting Started
To use OpenLinkway with your custom configurations, follow these steps:

### 1. Set up the `page.json` file with the desired logo and background image URLs.

The `page.json` file is responsible for configuring the appearance of the OpenLinkway page. It contains the following properties:

- `logo`: Specifies the URL of the logo image to be displayed in the header.
- `backgroundImage`: Specifies the URL of the background image for OpenLinkway.
- `favicon`: Specifies the URL for the favicon.
- `title`: Specifies the title of the page.
- `description`: Specifies the page description.
- `language`: Specifies a language for the page.

Example usage:
```json
{
  "logo": "assets/logo.png",
  "backgroundImage": "https://cataas.com/cat?filter=sepia&width=1280&height=720",
  "favicon": "https://cdn3.iconfinder.com/data/icons/font-awesome-regular-1/512/face-grin-squint-512.png",
  "title": "Cat - OpenLinkway",
  "description": "Cat's Link site",
  "language": "en"
}
```

### 2. Configure the links by editing the `links.json` file. Add, modify, or remove link objects as needed. Customise the URL, text, hover text, logo, colour, or gradient for each link.

The `links.json` file is used to define the links displayed in OpenLinkway. It consists of an array of link objects, where each object represents a link with the following properties:

 - `url` (string): The URL or page associated with the link.
 - `text` (string): The text displayed for the link.
 - `hoverText` (string): The text displayed as a tooltip when hovering over the link.
 - `newTab` (boolean): Specifies whether the link should open in a new tab.
 - `gradient` (object): Defines a gradient background for the link.
    - `type` (string): The type of gradient ("linear" or "radial").
    - `direction` (string): The direction of the linear gradient ("to right", "to left", "to top", "to bottom", etc.).
    - `shape` (string): The shape of the radial gradient ("circle", "ellipse", etc.).
    - `position` (string): The position of the radial gradient ("center", "top left", "bottom right", etc.).
    - `colors` (array): An array of colors to create the gradient.
 - `fontFamily` (string): Specifies the font family for the link text.
 - `fontWeight` (string): Specifies the font weight for the link text.
 - `fontSize` (string): Specifies the font size for the link text.
 - `textDecoration` (object): Defines the decoration for the link text.
    - `line` (string): The text decoration line ("underline", "line-through", etc.).
    - `thickness` (string): The thickness of the text decoration line.
    - `style` (string): The style of the text decoration line ("solid", "dashed", "dotted", "wavy", etc.).
    - `color` (string): The color of the text decoration line.
 - `textColor` (string): Specifies the color for the link text.
 - `logo` (string): The URL of an image to be displayed alongside the link.
 - `color` (string): Specifies a background color for the link.

Example usage:
```json
[
  {
    "url": "https://another-example.com",
    "text": "Another Example",
    "hoverText": "Visit Another Example",
    "logo": "https://picsum.photos/200",
    "color": "#ff0000"
  },
  {
    "url": "https://example.local",
    "text": "Example",
    "hoverText": "Visit Example",
    "newTab": true,
    "gradient": {
      "type": "linear",
      "direction": "to right",
      "colors": ["#ff0000", "#00ff0022"]
    },
    "color": "transparent",
    "fontFamily": "monospace",
    "fontWeight": "100",
    "fontSize": "small",
    "textDecoration": {
      "line": "underline",
      "thickness": "initial",
      "style": "wavy",
      "color": "green"
    },
    "textColor": "#000000"
  },
  ...
]
```

### 3. Customise the footer and header bars in the bars.json file. Set the background colour and define the items to be displayed. You can use plain text or markdown-style links.
The bars.json file is responsible for configuring the header and footer sections of OpenLinkway. It contains the following properties:

 - header: An object representing the header bar configuration.
    - color: The background colour of the header bar.
    - items: An array of items displayed in the header bar. Each item can be either a string or a string with markdown-style links using the format [link text](link URL).
 - footer: An object representing the footer bar configuration.
    - color: The background colour of the footer bar.
    - items: An array of items displayed in the footer bar. Each item can be either a string or a string with markdown-style links using the format [link text](link URL).
Example usage:
```json
{
    "header": { "color": "#94f5afB0",
    "items": [
    "Powered by [OpenLinkway](https://github.com/StrawbethyMilkshake/OpenLinkway) create your own!"
    ]},
    "footer": { "color": "#94f5afB0",
    "items": [
    "Powered by [OpenLinkway](https://github.com/StrawbethyMilkshake/OpenLinkway) create your own!",
    "Facebook icon designed by [OpenMoji](https://openmoji.org) - the open-source emoji and icon project. License: [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/)",
    "Demo button/Background images from [Lorem Picsum](https://picsum.photos) and [Cat as a service](https://cataas.com/)"
    ]}
}
```
