import { Parcel } from '@parcel/core';
import fs from 'fs'
function formatDate(date) {
    var date = new Date(Number(date));
    var YY = date.getFullYear() + '-';
    var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    var DD = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    var hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
    var mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
    var ss = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
    return YY + MM + DD + ' ' + hh + mm + ss;
}

async function build(name, targetName) {
    const projectPackageJson = 'package.json';
    const { version } = JSON.parse(fs.readFileSync(projectPackageJson, 'utf-8'));


    // const targets = {
    //     main: {
    //         context: 'browser',
    //         distDir: 'dist',
    //         sourceMap: false,
    //         outputFormat: 'global',
    //         engines: {
    //             browsers: 'last 1 Chrome version',
    //         },
    //     },
    //     legacy: {
    //         context: 'browser',
    //         distDir: 'dist',
    //         sourceMap: false,
    //         outputFormat: 'global',
    //         engines: {
    //             browsers: 'IE 11',
    //         },
    //     },
    // };

    // console.log({
    //     [targetName]: targets[targetName],
    // },'asdasd')
    const bundler = new Parcel({
        entries: 'src/index.js',
        defaultConfig: '@parcel/config-default',
        mode: 'production',
        targets: {
            main: {
                context: 'browser',
                distDir: 'dist',
                distEntry: 'artplayer-plugin-danmuku.js',
                sourceMap: false,
                outputFormat: 'global',
                engines: {
                    browsers: 'last 1 Chrome version',
                },
            },
            legacy: {
                context: 'browser',
                distDir: 'dist',
                distEntry: 'artplayer-plugin-danmuku.legacy.js',
                sourceMap: false,
                outputFormat: 'global',
                engines: {
                    browsers: 'IE 11',
                },
            },
        },
        env: {
            NODE_ENV: 'production',
            // APP_VER: version,
            // BUILD_DATE: formatDate(Date.now()),
        },
    });
    try {
        let {bundleGraph, buildTime} = await bundler.run();
        let bundles = bundleGraph.getBundles();
        console.log(`✨ Built ${bundles.length} bundles in ${buildTime}ms!`);
    } catch (err) {
        console.log(err.diagnostics);
    }
}

async function runBuild() {
        await build('', 'main');
        // await build('', 'legacy');

}

runBuild().catch((error) => {
    console.error('Build script encountered an error:', error);
});
