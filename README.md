# Smart POS Software Version 20
Designed with Vue2, VanilaJS, PHP and firebase. Smart POS is a system for small amd medium size businesses of all kinds. Create orders, print bills with EPOS receipt thermal printers, EOD emails and so much more.

## Project setup
- Clone the REPO
- Run npm install to install all module dependencies
- You will need to create a file fbConfig.js under `src/fbConfig.js` that exports you firebase config file

### Compiles and hot-reloads for development
- The project is set to recompile and hotreload

### Compiles and minifies for production
- Run npm run build to create a minified project
- Run `npm run electron:build` to create desktop versions for Mac, windows and linux

### Lints and fixes files
- Run `npm run lint`

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
- If you create a minified version using `npm run build` you will need to add a `.htaccess` inside the root folder of the build project to handle routes
-

## The .htaccess would look like this
``` .htaccess
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteBase /smartPOS
    RewriteRule ^smartPOS/index\.html$ - [L]
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule . /smartPOS/index.html [L]
</IfModule>
```

- Note: If you are hosting the app on your server and the dist tolder contents are not at the root folder on your server, You will need to update the `vue.config.js` file and replace the public path file name.
- Forexample, if your domain name is `https://www.mpwanyisamuel.com` and the url to the pos app on your server is `https://www.mpwanyisamuel.com/smartPOS`, Your public path inside the `vue.config.js` file would be `publicPath: '/smartPOS'`
- And you will also need to do the same with the `ht.access` at RewriteBase, RewriteRule values.
- If the app sits at the root of your server url, Your bublic path in the `vue.config.js` file would be `publicPath: '/'`and the at RewriteBase, RewriteRule values values inside the ht.access file.
