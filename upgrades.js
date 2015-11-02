var animationupgrades = [
	{
		name: "Link hover",
		cost: 300,
		target: $('nav a'),
		animation: {
			height: 30
		},
		animationend: {
			height: 16
		}
	}
];

var otherupgrades = [
	{
		name: "Advertising",
		cost: 1.50,
		caffeinePerSecond: 0.0,
		caffeineInterval: 0,
		caffeinePerClick: 0,
		adverts: 1,
		browser: ""
	},
	{
		name: "Firefox browser",
		cost: 2.00,
		caffeinePerSecond: 0.5,
		caffeineInterval: 0,
		caffeinePerClick: 0,
		adverts: 0,
		browser: "firefox"
	},
	{
		name: "Chrome browser",
		cost: 3.00,
		caffeinePerSecond: 0.5,
		caffeineInterval: 0,
		caffeinePerClick: 0,
		adverts: 0,
		browser: "chrome"
	},
	{
		name: "Bigger cup (+1p/c)",
		cost: 1.00,
		caffeinePerSecond: 0,
		caffeineInterval: 0,
		caffeinePerClick: 1,
		adverts: 0,
		browser: ""
	},
	{
		name: "Cappucino (+1p/c)",
		cost: 3.00,
		caffeinePerSecond: 0,
		caffeineInterval: 0,
		caffeinePerClick: 2,
		adverts: 0,
		browser: ""
	},
	{
		name: "Espresso (+1p/c)",
		cost: 6.00,
		caffeinePerSecond: 0,
		caffeineInterval: 0,
		caffeinePerClick: 2,
		adverts: 0,
		browser: ""
	},
	{
		name: "Coffee! (+0.5/s)",
		cost: 1.00,
		caffeinePerSecond: 0.5,
		caffeineInterval: 0,
		caffeinePerClick: 0,
		adverts: 0,
		browser: ""
	},
	{
		name: "Latte! (+0.5p/s)",
		cost: 2.00,
		caffeinePerSecond: 1,
		caffeineInterval: 0,
		caffeinePerClick: 0,
		adverts: 0,
		browser: ""
	},
	{
		name: "Coffee grinder (+1p/s)",
		cost: 3.00,
		caffeinePerSecond: 1,
		caffeineInterval: 0,
		caffeinePerClick: 0,
		browser: ""
	},
	{
		name: "Ground beans (+1p/s)",
		cost: 4.00,
		caffeinePerSecond: 2,
		caffeineInterval: 0,
		caffeinePerClick: 0,
		adverts: 0,
		browser: ""
	},
	{
		name: "Intense blend (+2p/s)",
		cost: 5.00,
		caffeinePerSecond: 4,
		caffeineInterval: 0,
		caffeinePerClick: 0,
		adverts: 0,
		browser: ""
	},
	{
		name: "Speed Up! (-0.10s)",
		cost: 4.00,
		caffeinePerSecond: 0,
		caffeineInterval: 100,
		caffeinePerClick: 0,
		adverts: 0,
		browser: ""
	},
	{
		name: "Speed Up! (-0.10s)",
		cost: 5.00,
		caffeinePerSecond: 0,
		caffeineInterval: 100,
		caffeinePerClick: 0,
		adverts: 0,
		browser: ""
	},
	{
		name: "Speed Up! (-0.25s)",
		cost: 6.00,
		caffeinePerSecond: 0,
		caffeineInterval: 250,
		caffeinePerClick: 0,
		adverts: 0,
		browser: ""
	},
	{
		name: "Speed Up! (-0.25s)",
		cost: 7.00,
		caffeinePerSecond: 0,
		caffeineInterval: 250,
		caffeinePerClick: 0,
		adverts: 0,
		browser: ""
	}
];

var cssupgrades = [
	{
		name: "Site header",
		cost: 50,
		target: $('header'),
		css: "display",
		effect: "block",
		group: "header-content"
	},
	{
		name: "Site navigation",
		cost: 50,
		target: $('nav#normal'),
		css: "display",
		effect: "block",
		group: "navigation-content"
	},
	{
		name: "Site content",
		cost: 50,
		target: $('content'),
		css: "display",
		effect: "block",
		group: "content-content"
	},
	{
		name: "Site footer",
		cost: 50,
		target: $('footer'),
		css: "display",
		effect: "block",
		group: "footer-content"
	},
	{
		name: "Site padding",
		cost: 75,
		target: $('#padding'),
		css: "padding",
		effect: "8px",
		group: "site-padding"
	},
	{
		name: "Top image padding",
		cost: 75,
		target: $('#image1'),
		css: "padding",
		effect: "6px",
		group: "top-image-padding"
	},
	{
		name: "Bottom image padding",
		cost: 75,
		target: $('#image2'),
		css: "padding",
		effect: "6px",
		group: "bottom-image-padding"
	},
	{
		name: "Background blue",
		cost: 100,
		target: $('#innerWebsite'),
		css: "background-color",
		effect: "lightblue",
		group: "background-colour"
	},
	{
		name: "Background green",
		cost: 100,
		target: $('#innerWebsite'),
		css: "background-color",
		effect: "lightgreen",
		group: "background-colour"
	},
	{
		name: "Top image position",
		cost: 125,
		target: $('#image1'),
		css: "float",
		effect: "right",
		group: "top-image-position"
	},
	{
		name: "Stat links",
		cost: 550,
		target: $('nav#enhanced'),
		css: "display",
		effect: "block",
		group: "navigation-content"
	},
	{
		name: "Bottom image position",
		cost: 125,
		target: $('#image2'),
		css: "float",
		effect: "left",
		group: "bottom-image-position"
	},
	{
		name: "Header text size",
		cost: 150,
		target: $('header'),
		css: "font-size",
		effect: "26px",
		group: "header-text-size"
	},
	{
		name: "Header text white",
		cost: 150,
		target: $('header'),
		css: "color",
		effect: "white",
		group: "header-text-colour"
	},
	{
		name: "Header text green",
		cost: 150,
		target: $('header'),
		css: "color",
		effect: "lightgreen",
		group: "header-text-colour"
	},
	{
		name: "Header text blue",
		cost: 150,
		target: $('header'),
		css: "color",
		effect: "lightblue",
		group: "header-text-colour"
	},
	{
		name: "Header shadow",
		cost: 175,
		target: $('header'),
		css: "text-shadow",
		effect: "1px 1px 4px rgba(0,0,0,0.65)",
		group: "header-text-shadow"
	},
	{
		name: "Header text padding",
		cost: 175,
		target: $('header'),
		css: "padding",
		effect: "6px",
		group: "header-text-padding"
	},
	{
		name: "Right footer",
		cost: 200,
		target: $('footer'),
		css: "text-align",
		effect: "right",
		group: "footer-align"
	},
	{
		name: "Center footer",
		cost: 200,
		target: $('footer'),
		css: "text-align",
		effect: "center",
		group: "footer-align"
	},
	{
		name: "Footer spacing",
		cost: 200,
		target: $('footer'),
		css: "margin-top",
		effect: "12px",
		group: "footer-padding"
	},
	{
		name: "Footer small text",
		cost: 200,
		target: $('footer'),
		css: "font-size",
		effect: "11px",
		group: "footer-text-size"
	},
	{
		name: "Center links",
		cost: 225,
		target: $('nav'),
		css: "text-align",
		effect: "center",
		group: "links-align"
	},
	{
		name: "Right links",
		cost: 225,
		target: $('nav'),
		css: "text-align",
		effect: "right",
		group: "links-align"
	},
	{
		name: "Paragraph spacing",
		cost: 225,
		target: $('content p'),
		css: "margin-top",
		effect: "12px",
		group: "paragraph-padding"
	},
	{
		name: "Link borders",
		cost: 250,
		target: $('nav *'),
		css: "border",
		effect: "1px solid #111",
		group: "links-borders"
	},
	{
		name: "Link text dark",
		cost: 275,
		target: $('nav *'),
		css: "color",
		effect: "#111",
		group: "links-colour"
	},
	{
		name: "Link text light",
		cost: 275,
		target: $('nav *'),
		css: "color",
		effect: "#f4f4f4",
		group: "links-colour"
	},
	{
		name: "Link padding",
		cost: 300,
		target: $('nav *'),
		css: "padding",
		effect: "2px",
		group: "links-padding"
	},
	{
		name: "Wider links",
		cost: 325,
		target: $('nav *'),
		css: "width",
		effect: "100px",
		group: "links-width"
	},
	{
		name: "Content padding",
		cost: 275,
		target: $('content'),
		css: "padding-top",
		effect: "12px",
		group: "content-padding"
	},
	{
		name: "Med. header",
		cost: 325,
		target: $('header'),
		css: "height",
		effect: "165",
		group: "header-height"
	},
	{
		name: "Tall header",
		cost: 325,
		target: $('header'),
		css: "height",
		effect: "165",
		group: "header-height"
	},
	{
		name: "Summer header",
		cost: 500,
		target: $('header'),
		css: "background-image",
		effect: "url(header1.jpg)",
		group: "header-pretty"
	},
	{
		name: "Winter header",
		cost: 500,
		target: $('header'),
		css: "background-image",
		effect: "url(header2.jpg)",
		group: "header-pretty"
	},
	{
		name: "Link underline",
		cost: 325,
		target: $('nav *'),
		css: "text-decoration",
		effect: "none",
		group: "links-decoration"
	},
	{
		name: "Wallpaper 1",
		cost: 1000,
		target: $('#innerWebsite'),
		css: "background-image",
		effect: "url(wallpaper1.jpg)",
		group: "wallpaper"
	},
	{
		name: "Wallpaper 2",
		cost: 1000,
		target: $('#innerWebsite'),
		css: "background-image",
		effect: "url(wallpaper2.jpg)",
		group: "wallpaper"
	}
];