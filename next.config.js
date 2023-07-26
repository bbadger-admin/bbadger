/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = nextConfig

/*

If you want to localize the pathnames of your app, you can accomplish this by using appropriate rewrites.

const withNextIntl = require('next-intl/plugin')();
 
module.exports = withNextIntl({
  rewrites() {
    return [
      {
        source: '/de/über',
        destination: '/de/about'
      }
    ];
  }
});
*/