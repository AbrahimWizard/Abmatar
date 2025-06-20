# Abmatar Personal Website

This repository contains a simple yet modern personal website built with **HTML**, **CSS**, and **JavaScript**. It can serve as a portfolio and personal landing page. The project is intentionally lightweight so you can easily customize and expand it.

## Features

- Responsive layout that works on desktop and mobile.
- Navigation bar with a hamburger menu on small screens.
- Dark mode toggle (click the moon icon in the navigation).
- Animated hero text using [TypewriterJS](https://github.com/tameemsafi/typewriterjs).
- Example "Now Playing" music widget using a Spotify embed.
- Four main pages: Home, About, Projects, and Contact.

## Folder Structure

```
/ (root)
├── index.html        # Home page
├── about.html        # About me
├── projects.html     # Project gallery
├── contact.html      # Contact form
├── assets/
│   ├── styles.css    # Styles shared across pages
│   ├── scripts.js    # JavaScript for interactivity
│   └── images/       # Put your images here
├── CNAME             # Optional domain configuration for GitHub Pages
└── README.md
```

## Customization Tips

- **Update content**: Edit the HTML pages to add your own text, images, and project details.
- **Styling**: Tweak `assets/styles.css` to change fonts, colors, or layout.
- **Add projects**: Duplicate the `.project-card` divs in `projects.html` and link them to your work.
- **Now Playing**: Replace the `src` URL of the Spotify iframe on `index.html` with your favorite song or playlist.
- **More interactions**: Feel free to include additional JavaScript libraries or your own scripts in `assets/scripts.js`.

## Getting Started

Simply open `index.html` in a browser or host the repository with GitHub Pages. The site is static, so no build step is required.

Enjoy building your personal corner of the web!
