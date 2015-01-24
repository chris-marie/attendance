function makeBrowserSignature (plugins,userAgent,oscpu,platform) {
    // todo: get font list from browser
    this.plugins = plugins;
    this.userAgent = userAgent;
    this.oscpu = oscpu;
    this.platform = platform;
}

document.addEventListener('DOMContentLoaded', function () {
    var url = '/browserinfo';

    var navPlugins = navigator.plugins;
    var plugins = Array.prototype.slice.call(navPlugins);
    console.log('plugins: ',plugins); //    console.log(JSON.stringify(plugins));
    var mimeTypes = navigator.mimeTypes;
    var mT = Array.prototype.slice.call(mimeTypes);
//    var pluginDescriptions = mT.map(function (m){ return m['description'];});

    var userAgent = navigator.userAgent;
    var oscpu = navigator.oscpu;
    var platform = navigator.platform;
    console.log('USER AGENT: \n',userAgent,'\n osCPU: \n', oscpu,'\n platform: \n',platform);

    var xhr = new XMLHttpRequest();
    xhr.open('POST', url);
    xhr.setRequestHeader('accept', 'application/json');
    xhr.setRequestHeader('content-type', 'application/json');
    xhr.addEventListener('readystatechange', function () {
        if( xhr.readyState === 4 && xhr.status === 200 ) {
            var obj = JSON.parse(xhr.responseText);
            console.log(obj);
        }
    });

    var browserSignatureObj = new BrowserSignature(plugins,userAgent,oscpu,platform);
    //var hmac = crypto.createHmac('md5');

    xhr.send(JSON.stringify(browserSignatureObj));
  // four functions: one for each, ignore fonts for now
});