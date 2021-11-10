
const sitemap = require("nextjs-sitemap-generator");

sitemap({
  alternateUrls: {
    
  },
  baseUrl: "https://aeterna.be",
  ignoredPaths: ["admin"],
//   extraPaths: ["/extraPath"],
  pagesDirectory: __dirname + "//.next//server//pages",
  targetDirectory: "static/",
  sitemapFilename: "sitemap.xml",
  nextConfigPath: __dirname + "//next.config.js",
  ignoredExtensions: ["png", "jpg"],
  pagesConfig: {
    "/login": {
      priority: "0.5",
      changefreq: "daily",
    },    
    "/register": {
      priority: "0.5",
      changefreq: "daily",
    },    
    "/ons-verhaal": {
      priority: "0.5",
      changefreq: "daily",
    },
    
    "/voorbeelden": {
       priority: "0.5",
       changefreq: "daily",
    },
    
    "/#contact": {
       priority: "0.5",
       changefreq: "daily",
    },
    
  },
//   sitemapStylesheet: [
//     {
//       type: "text/css",
//       styleFile: "/test/styles.css",
//     },
//     {
//       type: "text/xsl",
//       styleFile: "test/test/styles.xls",
//     },
//   ],
});

console.log(`✅ sitemap.xml generated!`);
console.log(`${__dirname}`);
