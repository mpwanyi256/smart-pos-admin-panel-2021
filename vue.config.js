module.exports = {
  transpileDependencies: [
    'vuetify',
  ],
  // publicPath: '/smartAdmin',
};

/*
.htaccess
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteBase /smartAdmin
    RewriteRule ^smartAdmin/index\.html$ - [L]
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule . /smartAdmin/index.html [L]
</IfModule>
*/
