
module.exports = {
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      config.module.rules.push({
        test: /\.css$/,
        use: [
          {
            loader: 'vue-style-loader',
            options: {
              shadowMode: true
            }
          },
          'css-loader',
        ],
      });
    }
  },
  chainWebpack: config => {
    config.module
      .rule('vue')
      .use('vue-loader')
        .loader('vue-loader')
        .tap(options => {
          options.shadowMode = true;
          return options;
        });

    if (process.env.NODE_ENV === 'production') {
      return;
    }
     
    config.module
      .rule('css')
      .oneOf('vue')
      .use('vue-style-loader')
        .tap(options => {
          options.shadowMode = true;
          return options;
        });
  }
}