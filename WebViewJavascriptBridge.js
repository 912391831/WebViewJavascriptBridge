export default {
    Bridge: {
        get(url,callback) {
            console.log(this)
                this._setupWebViewJavascriptBridge((bridge) => {
                    console.log(120000)
                    bridge
                    .registerHandler(url, (data) => {
                        callback(data)
                    })
                })
        },
        post(url,data,callback) {
                this._setupWebViewJavascriptBridge((bridge) => {
                    bridge
                    .callHandler(url,data,(data) => {
                        callback(data)


                        
                    })
                })
        },
        _setupWebViewJavascriptBridge(callback) {
            var u = navigator.userAgent
            var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1 // android
            var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // ios终端
            if (isAndroid) {
                if (window.WebViewJavascriptBridge) {
                    callback(window.WebViewJavascriptBridge)
                } else {
                    document.addEventListener(
                        'WebViewJavascriptBridgeReady'
                        , function () {
                            callback(window.WebViewJavascriptBridge)
                        },
                        false
                    );
                }
            } else if (isIOS) {
                if (window.WebViewJavascriptBridge) { return callback(WebViewJavascriptBridge); }
                if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback); }
                window.WVJBCallbacks = [callback];
                var WVJBIframe = document.createElement('iframe');
                WVJBIframe.style.display = 'none';
                WVJBIframe.src = 'https://moguding_bridge_loaded';
                document.documentElement.appendChild(WVJBIframe);
                setTimeout(function () { document.documentElement.removeChild(WVJBIframe) }, 0)
            }
        }
    }
}