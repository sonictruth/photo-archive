const FtpDeploy = require('ftp-deploy');
const ftpDeploy = new FtpDeploy();

const prompt = require('prompt');

const localRoot = __dirname + '/dist/photo-archive';
const remoteRoot = '/photoarchive/';
console.log(localRoot, ' => ', remoteRoot);

prompt.start();
prompt.get(['password'], (err, result) => {

    const config = {
        user: 'dex@sonicpix.ro',
        password: result.password,
        host: 'www.sonicpix.ro',
        port: 21,
        localRoot: localRoot,
        remoteRoot: remoteRoot,
        exclude: ['**/*.map'], 
        include: ['*', '**/*'],      // this would upload everything except dot files
        deleteRemote: false,              // delete ALL existing files at destination before uploading, if true
        forcePasv: true                 // Passive mode is forced (EPSV command is not sent)
    }

    // use with promises
    ftpDeploy.deploy(config)
        .then(res => console.log('finished:', res))
        .catch(err => console.log(err))

    ftpDeploy.on('uploading', function (data) {
        console.log(data);
    });
});
