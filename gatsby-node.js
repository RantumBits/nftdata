const webpack = require('webpack');

exports.createSchemaCustomization = ({ actions }) => {
    const { createTypes } = actions
    createTypes(`
      type ExportTokenholdersForContract0X373Acda15Ce392362E4B46Ed97A7Feecd7Ef9Eb8Csv implements Node {
        Balance: Float
      }
    `)
  }

exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
    actions.setWebpackConfig({
        plugins: [new webpack.IgnorePlugin(/^electron$/)]
    });

    if (stage === "build-html") {
        actions.setWebpackConfig({
            module: {
                rules: [
                    {
                        test: /portis\.js|authereum\.js|torus-embed|contentful-management/,
                        use: loaders.null(),
                    },
                ],
            },
        });
    }
};
