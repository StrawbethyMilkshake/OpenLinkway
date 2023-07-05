# LinkFree
LinkFree is a simple web application that allows you to create and customise a collection of links with ease.

## Project Goals

🔗 Simplify Link Management: LinkFree aims to provide a simple web application that allows users to create and customise a collection of links effortlessly.

👩‍💻 No Coding Required: The primary goal of LinkFree is to eliminate the need for users to write any code. Instead, users can configure LinkFree through easily editable configuration files.

🍦 Vanilla JS: LinkFree is built using only vanilla JavaScript, avoiding the use of any frameworks or libraries. This choice ensures simplicity and eliminates dependencies.

💻 Client-side Rendering: All rendering is done in the user's browser without the need for server-side code. This approach allows for minimal running costs, potentially making it feasible to host LinkFree for free or at very low cost.

✨ Easy customisation: With LinkFree, users can easily customise the appearance of their LinkFree page by editing configuration files. This flexibility enables users to create a personalised collection of links that aligns with their preferences and branding.

📚 Documentation: LinkFree strives to provide comprehensive documentation to assist users in setting up and configuring their LinkFree page. This ensures a smooth and hassle-free experience.

## Screenshots
|Desktop|Mobile|
|--------|-----|
|![Desktop UI](https://media.discordapp.net/attachments/912542259893915670/1125172067415896155/image.png?width=1026&height=666)|![Mobile UI](https://media.discordapp.net/attachments/795745894036275231/1125148064240382052/image.png?width=432&height=666)|

## Getting Started
To use LinkFree with your custom configurations, follow these steps:

### 1. Set up the `page.json` file with the desired logo and background image URLs.

The `page.json` file is responsible for configuring the appearance of the LinkFree page. It contains the following properties:

- `logo`: Specifies the URL of the logo image to be displayed in the header.
- `backgroundImage`: Specifies the URL of the background image for LinkFree.
- `favicon`: Specifies the URL for the favicon.

Example usage:
```json
{
  "logo": "assets/logo.png",
  "backgroundImage": "https://cataas.com/cat?filter=sepia&width=1280&height=720",
  "favicon": "https://cdn3.iconfinder.com/data/icons/font-awesome-regular-1/512/face-grin-squint-512.png"
}
```

### 2. Configure the links by editing the `links.json` file. Add, modify, or remove link objects as needed. Customise the URL, text, hover text, logo, colour, or gradient for each link.

The `links.json` file is used to define the links displayed in LinkFree. It consists of an array of link objects, where each object represents a link with the following properties:

- `url`: The URL of the link.
- `text`: The text displayed for the link.
- `hoverText`: The text displayed when hovering over the link.
- `logo`: The URL of the logo image associated with the link.
- `color`: The background colour of the link.
- `gradient`: An object defining a gradient background for the link. It includes the following properties:
    - `type`: The type of gradient (either "linear" or "radial").
    - `direction` (for linear gradients): The direction of the gradient.
    - `colors`: An array of colours to create the gradient.

Example usage:
```json
[
  {
    "url": "https://example.com",
    "text": "Example",
    "hoverText": "Visit Example",
    "gradient": {
      "type": "linear",
      "direction": "to right",
      "colors": ["#ff0000", "#00ff00"]
    }
  },
  {
    "url": "https://another-example.com",
    "text": "Another Example",
    "hoverText": "Visit Another Example",
    "logo": "https://picsum.photos/200",
    "color": "#ff0000"
  },
  ...
]
```

### Customise the footer and header bars in the bars.json file. Set the background colour and define the items to be displayed. You can use plain text or markdown-style links.
The bars.json file is responsible for configuring the header and footer sections of LinkFree. It contains the following properties:

 - header: An object representing the header bar configuration.
    - color: The background colour of the header bar.
    - items: An array of items displayed in the header bar. Each item can be either a string or a string with markdown-style links using the format [link text](link URL).
 - footer: An object representing the footer bar configuration.
    - color: The background colour of the footer bar.
    - items: An array of items displayed in the footer bar. Each item can be either a string or a string with markdown-style links using the format [link text](link URL).
Example usage:
```json
{
  "header": {
    "color": "#94f5af",
    "items": [
      "Powered by [LinkFree](https://github.com/StrawbethyMilkshake/LinkFree) - create your own!"
    ]
  },
  "footer": {
    "color": "#94f5af",
    "items": [
      "Hello",
      "Footer item 2",
      "Powered by [LinkFree](https://github.com/StrawbethyMilkshake/LinkFree) - create your own!"
    ]
  }
}
```
