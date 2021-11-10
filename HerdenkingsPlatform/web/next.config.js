

const withSass = require("@zeit/next-sass");
const withImages = require('next-images')
module.exports = withSass();

module.exports = {
  env: {
    customKey: 'my-value',
    SPREADSHEET_ID : '1eIwZuMH8jBfusIsY8QDDxe5jNlOtJfnbJaCQbFZ8yBg',
    SHEET_ID: '0',
    GOOGLE_CLIENT_EMAIL : 'aeterna@aeterna-298812.iam.gserviceaccount.com',
    GOOGLE_SERVICE_PRIVATE_KEY : '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCcRL6mEwwSAGW3\ncgsK4TsGVudo3nYqjiWnWVvdK7lthZK4F7W9IJ0+Ly1qKXPLkNFc5ooxe4ZA3KiS\nvzc7bsN23qau8ggEao3XIGloBPjtOtvEEqs5MYraPUEAf/86X463MZZxSDtOr0cQ\nVb2wokApq1RkuuNfrgPXvU+4lKTuy4FQdz7zeOC4LzwAGP7QV1uBNiRmLX+qlYbK\n1kqTSivz6GgnoARTkR2VQggEvfEU8DQd6WYT/MoNZzHQeJPFQsgulezJWY+5bDVq\nvPlIc+dha4CzZZ69R20/yoWN5icnDmMuJXVPCuDZ5MaLTQosEfAA0GAi6p8Brx3F\ngoYjF83FAgMBAAECggEADOYJvIiO8v9wZet2aN/9cMEEmd3e8BVKm10fXYqp5BXl\n7ecbG7DQ+dyICZ7BTZi3B02KM5poEvuDuJUq+G9kl++532/f5IltCshEmw7qAx7c\nG/uUgYSK2we6UVG/XfCcRZfEvLYDGzQRkBIbtbQ2ypm3PhdFBFVHQOwB5BD06jbl\n7jFls0qCvA7eC5Q1YPloVqOIFVGmTCBLp8+c36UY5HtVJSOoEmCRDLKIPGYetqoY\nkI1jfitNLSSdSKwRHPjjsFDX4UNd27Lj4RE0TcKDdlnoQChCka68/Tzmm/e8p8vb\nLtVs1/HkBnJcBTcBj3+4SNxz+ynzfNOMiXIDw5gWcwKBgQDV6YBowwNq+TGjEvuA\n0kZuYAREvrzjvTjC0cF5KmhpYmOzFm1mkV5DxYCnc/2m0bjBA3XhWaM1Bjcl5DAT\nMqpHoiCoIr7YIDaughBqpp10ImU0CBOASJTSBsDKDYbu+/O3Ra2h/3i2BSZyT+Ql\npbniv84HIO4Poyv8GynZTDOTrwKBgQC7A836Ma3kjWPcJxlUYsgyq5m3Syug7jW1\nsx+fcmU5iaDV40dty0ExibxE9H5cuqv5eSYqPc1wYM5NT7fjyS8aiCBcAA8a7cP+\nHtUkyxzt0ngb+DjWUBoAYRpl08m9gKpra4DnPY2UClHjJcH3pLyH/Dxl8gSTBg/J\nDRwE86vuywKBgHhbOv62ytODhiQk6BFhPnOX3o73arwQmUE0V9FexQSWcVYwRjmx\njQJAu9R79LnJwlQHKGo0zxlkd97/9vS2Swym8gzoD8z2ww2I7Me1G15eg+a0rJQ/\nQkyxtAN7fPI2HLh/oeRGI5r2Zt1mig2Mo3wrQzbLlmaB/puIhRFYSKTNAoGASKzF\n0sCTjwnTEK6xDTYGDorZBX3UyolHngCp/VB7PczaD8Ru8Z/XCeU4oKNSp75zLlOC\nHVA/EbjM8wZTs9Vu1KSpzpbHR/O2An8A3XeBGnp76oKfs8kVEaiqlX+kGlxx3aS9\nRx+IcUtBX0BBDHecPEwtPIC8flYQtFS/2rzGx9kCgYEAkvxKfQscXpt+ILGHskBJ\nilFQTLc04ySp68tjxLOMyvd7sB5mYxR0qKntqTxkm9xld/3x3gnLQ4w0GnQSActe\nmk6n4ClFUonu122zTPvJSa73drx5nx81a5luCYvSx+XUlQyDgPAo3CVG925Enrht\nxYu5jDIHI+CIBDoiA8fuvAc=\n-----END PRIVATE KEY-----\n'
  },
}
module.exports = withImages()


module.exports = {
  webpack(config, { dev }) {
    // modify if
    // config.experiments = { topLevelAwait: true };

    config: false;
    return config
  }
}

module.exports = {
  webpack: (config) => {
    config.experiments = { topLevelAwait: true };
    return config;
  },
};
  module.exports = {
    module: {
      rules: [
        {
          test: /\.html$/i,
          loader: 'html-loader',
        },
      ],
    },
  };

  module.exports = {
  //   // entry: './src/index.tsx',
  //   devtool: 'inline-source-map',
  //   module: {
  //     rules: [
  //       {
  //         test: /.tsx?$/,
  //         use: 'ts-loader',
  //         exclude: /node_modules/,
  //       },
  //     ],
  //   },
  //   resolve: {
  //     extensions: [ '.tsx', '.ts', '.js' ],
  //   },
    output: {
      // filename: 'scalextric.js',
      // library: 'Scalextric',
      // libraryTarget: 'umd',
      // path: path.resolve(__dirname, 'dist'),
      // umdNamedDefine: true,
      globalObject: 'this',

    },
  };