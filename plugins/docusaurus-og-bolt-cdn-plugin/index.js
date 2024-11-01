const path = require('path');
const fs = require('fs').promises;
const cheerio = require('cheerio');

// Default supported plugins
const SUPPORTED_PLUGINS = [
  'docusaurus-plugin-content-docs',
  'docusaurus-plugin-content-pages',
  'docusaurus-plugin-content-blog'
];

module.exports = function(context, options) {
  // Get user configuration
  const {
    enabledPlugins = SUPPORTED_PLUGINS, // Allow users to specify which plugins to process
    debug = false // Enable/disable detailed logging
  } = options;

  const logDebug = (...args) => {
    if (debug) {
      console.log(...args);
    }
  };

  return {
    name: 'docusaurus-plugin-ogbolt',

    async postBuild({ outDir, siteConfig, plugins = [] }) {
      console.log('\n=== OGBolt Plugin: Starting processing ===');

      // Filter and process routes from enabled plugins
      const processableRoutes = plugins
        .filter(plugin => {
          const isSupported = SUPPORTED_PLUGINS.includes(plugin.name);
          const isEnabled = enabledPlugins.includes(plugin.name);
          
          logDebug(`Plugin ${plugin.name}:`, {
            isSupported,
            isEnabled,
            routeCount: plugin.routes?.length || 0
          });

          return isSupported && isEnabled;
        })
        .flatMap(plugin => {
          logDebug(`Processing routes for ${plugin.name}`);
          return (plugin.routes || []).map(route => ({
            ...route,
            pluginName: plugin.name
          }));
        });

      logDebug('\nProcessable Routes:', 
        processableRoutes.map(r => ({
          path: r.path,
          plugin: r.pluginName,
          component: r.component
        }))
      );

      const processHtmlFile = async (filePath, route) => {
        try {
          // Read the HTML file
          const html = await fs.readFile(filePath, 'utf8');
          
          // Load HTML into cheerio
          const $ = cheerio.load(html);
          
          // Construct the full URL for this page
          const pageUrl = `${siteConfig.url}${route.path}`;
          const ogboltUrl = `https://og-bolt-image-generator.betalectic.workers.dev?url=${encodeURIComponent(pageUrl)}`;
          
          // Remove existing og:image tags
          $('meta[property="og:image"]').remove();
          $('meta[property="twitter:image"]').remove();
          $('meta[property="image"]').remove();
          
          // Add new og:image tag
          $('head').append(`<meta property="og:image" content="${ogboltUrl}" data-rh="true">`);
          $('head').append(`<meta property="twitter:image" content="${ogboltUrl}" data-rh="true">`);
          $('head').append(`<meta property="image" content="${ogboltUrl}" data-rh="true">`);
          
          // Write the modified HTML back to file
          await fs.writeFile(filePath, $.html());
          
          console.log(`✓ Updated ${route.path}`);
          console.log(`  Plugin: ${route.pluginName}`);
          console.log(`  OG Image: ${ogboltUrl}`);
          
        } catch (error) {
          console.error(`Error processing ${route.path}:`, error);
        }
      };

      // Process each route
      for (const route of processableRoutes) {
        // Skip routes without paths
        if (!route.path) {
          logDebug(`Skipping route without path:`, route);
          continue;
        }

        // Check for direct HTML file first
        const directFilePath = path.join(outDir, route.path.replace(/\/$/, '').replace(/\.html$/, '') + '.html');
        const indexFilePath = path.join(outDir, route.path, 'index.html');

        try {
          // Check which file exists and process it
          const fileStats = await fs.stat(directFilePath).catch(() => null);
          if (fileStats) {
            await processHtmlFile(directFilePath, route);
          } else {
            const indexStats = await fs.stat(indexFilePath).catch(() => null);
            if (indexStats) {
              await processHtmlFile(indexFilePath, route);
            } else {
              console.warn(`⚠ No HTML file found for route: ${route.path}`);
            }
          }
        } catch (error) {
          console.error(`Error checking files for ${route.path}:`, error);
        }
      }
      
      console.log('\n=== OGBolt Plugin: Processing complete ===');
    }
  };
};