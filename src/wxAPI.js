export var onAndSyncApis = {
    onSocketOpen: true,
    onSocketError: true,
    onSocketMessage: true,
    onSocketClose: true,
    onBackgroundAudioPlay: true,
    onBackgroundAudioPause: true,
    onBackgroundAudioStop: true,
    onNetworkStatusChange: true,
    onAccelerometerChange: true,
    onCompassChange: true,
    onBluetoothAdapterStateChange: true,
    onBluetoothDeviceFound: true,
    onBLEConnectionStateChange: true,
    onBLECharacteristicValueChange: true,
    onBeaconUpdate: true,
    onBeaconServiceChange: true,
    onUserCaptureScreen: true,
    onHCEMessage: true,
    onGetWifiList: true,
    onWifiConnected: true,
    setStorageSync: true,
    getStorageSync: true,
    getStorageInfoSync: true,
    removeStorageSync: true,
    clearStorageSync: true,
    getSystemInfoSync: true,
    getExtConfigSync: true,
    getLogManager: true
};
export var noPromiseApis = {
    // 媒体
    stopRecord: true,
    getRecorderManager: true,
    pauseVoice: true,
    stopVoice: true,
    pauseBackgroundAudio: true,
    stopBackgroundAudio: true,
    getBackgroundAudioManager: true,
    createAudioContext: true,
    createInnerAudioContext: true,
    createVideoContext: true,
    createCameraContext: true,
    wxpayGetType:true,
    navigateBack: true,
  
    // 位置
    createMapContext: true,
  
    // 设备
    canIUse: true,
    startAccelerometer: true,
    stopAccelerometer: true,
    startCompass: true,
    stopCompass: true,
  
    // 界面
    hideToast: true,
    hideLoading: true,
    showNavigationBarLoading: true,
    hideNavigationBarLoading: true,
    createAnimation: true,
    pageScrollTo: true,
    createSelectorQuery: true,
    createCanvasContext: true,
    createContext: true,
    drawCanvas: true,
    hideKeyboard: true,
    stopPullDownRefresh: true,
  
    // 拓展接口
    arrayBufferToBase64: true,
    base64ToArrayBuffer: true,
  
    getUpdateManager: true,
    createWorker: true,

    // 快应用部分接口
    getPushProvider: true,
    getProvider: true,

    // 特殊功能API
    canvasToTempFilePath: true
};
export var otherApis = {
    // 网络
    uploadFile: true,
    downloadFile: true,
    connectSocket: true,
    sendSocketMessage: true,
    closeSocket: true,
  
    // 媒体
    chooseImage: true,
    previewImage: true,
    getImageInfo: true,
    saveImageToPhotosAlbum: true,
    startRecord: true,
    playVoice: true,
    getBackgroundAudioPlayerState: true,
    playBackgroundAudio: true,
    seekBackgroundAudio: true,
    chooseVideo: true,
    saveVideoToPhotosAlbum: true,
    loadFontFace: true,
  
    // 文件
    saveFile: true,
    getFileInfo: true,
    getSavedFileList: true,
    getSavedFileInfo: true,
    removeSavedFile: true,
    openDocument: true,
  
    // 数据缓存
    setStorage: true,
    getStorage: true,
    getStorageInfo: true,
    removeStorage: true,
    clearStorage: true,
  
    // 导航
    navigateTo: true,
    redirectTo: true,
    switchTab: true,
    reLaunch: true,
  
    // 位置
    getLocation: true,
    chooseLocation: true,
    openLocation: true,
  
    // 设备
    getSystemInfo: true,
    getNetworkType: true,
    makePhoneCall: true,
    scanCode: true,
    setClipboardData: true,
    getClipboardData: true,
    openBluetoothAdapter: true,
    closeBluetoothAdapter: true,
    getBluetoothAdapterState: true,
    startBluetoothDevicesDiscovery: true,
    stopBluetoothDevicesDiscovery: true,
    getBluetoothDevices: true,
    getConnectedBluetoothDevices: true,
    createBLEConnection: true,
    closeBLEConnection: true,
    getBLEDeviceServices: true,
    getBLEDeviceCharacteristics: true,
    readBLECharacteristicValue: true,
    writeBLECharacteristicValue: true,
    notifyBLECharacteristicValueChange: true,
    startBeaconDiscovery: true,
    stopBeaconDiscovery: true,
    getBeacons: true,
    setScreenBrightness: true,
    getScreenBrightness: true,
    setKeepScreenOn: true,
    vibrateLong: true,
    vibrateShort: true,
    addPhoneContact: true,
    getHCEState: true,
    startHCE: true,
    stopHCE: true,
    sendHCEMessage: true,
    startWifi: true,
    stopWifi: true,
    connectWifi: true,
    getWifiList: true,
    setWifiList: true,
    getConnectedWifi: true,
  
    // 界面
    showToast: true,
    showLoading: true,
    showModal: true,
    showActionSheet: true,
    setNavigationBarTitle: true,
    setNavigationBarColor: true,
    setTabBarBadge: true,
    removeTabBarBadge: true,
    showTabBarRedDot: true,
    hideTabBarRedDot: true,
    setTabBarStyle: true,
    setTabBarItem: true,
    showTabBar: true,
    hideTabBar: true,
    setTopBarText: true,
    startPullDownRefresh: true,
    
    canvasGetImageData: true,
    canvasPutImageData: true,
  
    // 第三方平台
    getExtConfig: true,
    //远程请求
    request: true,
    // 开放接口
    login: true,
    checkSession: true,
    authorize: true,
    getUserInfo: true,
    requestPayment: true,
    showShareMenu: true,
    hideShareMenu: true,
    updateShareMenu: true,
    getShareInfo: true,
    chooseAddress: true,
    addCard: true,
    openCard: true,
    openSetting: true,
    getSetting: true,
    getWeRunData: true,
    navigateToMiniProgram: true,
    navigateBackMiniProgram: true,
    chooseInvoiceTitle: true,
    checkIsSupportSoterAuthentication: true,
    startSoterAuthentication: true,
    checkIsSoterEnrolledInDevice: true
};

const RequestQueue = {
    MAX_REQUEST: 10,
    queue: [],
    request(options) {
        this.push(options);
        this.run();
    },

    push(options) {
        this.queue.push(options);
    },

    run() {
        if (!this.queue.length) {
            return;
        }
        if (this.queue.length <= this.MAX_REQUEST) {
            let options = this.queue.shift();
            let completeFn = options.complete;
            var self = this;
            options.complete = function() {
                completeFn && completeFn.apply(null, arguments);
                self.run();
            };
            this.facade.request(options);
        }
    }
};

export var more = function(api) {
    return {
        // 界面交互
        request: function(_a) {
            RequestQueue.facade = api;
            return RequestQueue.request(_a);
        },
        getStorage: function({ key, success, complete }) {
            return api.getStorage({
                key,
                complete,
                success,
                fail: function(e) { //QQ小程序如果找不到数据会报错，而不是返回一个空对象
                    //QQ的错误描述：getStorage:fail data not found
                    //微信的错误描述：getStorage:fail:data not found
                    //真机调试的错误可能是 timeout
                    success && success({});
                    //if (/fail(:|\s)data\snot\sfound/.test(e.errMsg)){
                }
            });
        }
    };
};
