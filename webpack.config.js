const webpack = require('webpack');

module.exports = {
    entry : './src/index/js',
    module: {
        rules: [
          // 추가할 부분 start
          {
            test: /\.(png|jp(e*)g|svg|gif)$/,
            use: [
              {
                loader: 'file-loader',
                options: {
                  name: 'images/[hash]-[name].[ext]',
                },
              },
            ],
          },
          // end.
        ],
      },
     
    
}