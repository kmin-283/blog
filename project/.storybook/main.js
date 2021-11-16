const path = require('path');

module.exports = {
  "stories": [
    "../components/**/*.stories.mdx",
    "../components/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials"
  ],
  webpackFinal: async (config, { configType }) => {
    config.module.rules = config.module.rules.filter(
      f => f.test.toString() !== '/\\.css$/'
    );
    config.module.rules.push({
      test: /\.css$/,
      use: ['style-loader', {
        loader: 'css-loader',
        options: {
          modules: true, // Enable modules to help you using className
        }
      }],
      include: path.resolve(__dirname, '../components'),
    });

    config.resolve.alias = {
      ...config.resolve.alias,
      '@/components': path.resolve(__dirname, "../components"),
    };


    return config;
  }
}