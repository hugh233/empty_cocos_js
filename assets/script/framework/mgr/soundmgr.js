/*------------------------------------------------------------------------------------------
--
--　　　　　　　┏┓　　　┏┓+ +
--　　　　　　┏┛┻━━━┛┻┓ + +
--　　　　　　┃　　　　　　　┃ 　
--　　　　　　┃　　　━　　　┃ ++ + + +
--　　　　　 ████━████ ┃+
--　　　　　　┃　　　　　　　┃ +
--　　　　　　┃　　　┻　　　┃
--　　　　　　┃　　　　　　　┃ + +
--　　　　　　┗━┓　　　┏━┛
--　　　　　　　　┃　　　┃　　　　　　　　　　　
--　　　　　　　　┃　　　┃ + + + +
--　　　　　　　　┃　　　┃　　　　　　　　　　　
--　　　　　　　　┃　　　┃ + 　　　　　　
--　　　　　　　　┃　　　┃
--　　　　　　　　┃　　　┃　　+　　　　　　　　　
--　　　　　　　　┃　 　　┗━━━┓ + +
--　　　　　　　　┃ 　　　　　　　┣┓
--　　　　　　　　┃ 　　　　　　　┏┛
--　　　　　　　　┗┓┓┏━┳┓┏┛ + + + +
--　　　　　　　　　┃┫┫　┃┫┫
--　　　　　　　　　┗┻┛　┗┻┛+ + + +
--
-- 
-- Code is far away from bug with the animal protecting
-- Author  : (moxun)hongchang.huang
------------------------------------------------------------------------------------------*/
var SoundMgr = cc.Class({
    properties: {
        audio: {
            url: cc.AudioClip,
            default: null
        }
    },

    ctor()
    {
        this._bgmId = null
        this._bgmUrl = null
    },

    playMusic(path)
    {
        var url = cc.url.raw(path)
        if(this._bgmUrl == url)
        {
            return
        }
        var self = this
        cc.loader.load(url, function()
        {
            self.stopMusic()
            self._bgmId = cc.audioEngine.play(url, true, 1)
            self._bgmUrl = url
        })
    },

    stopMusic()
    {
        if(this._bgmId != null)
        {
            cc.audioEngine.stop(this._bgmId)
        }
        if(this._bgmUrl != null)
        {
            this.releaseSound(this._bgmUrl)
        }
    },

    playSound(path, handler)
    {
        var url = cc.url.raw(path)
        var self = this
        cc.loader.load(url, function()
        {
            var id = cc.audioEngine.play(url, false, 1)
            cc.audioEngine.setFinishCallback(id, function()
            {
                self.releaseSound(url)
                if(handler)                
                {
                    handler.call(handler.this)
                }
            })
        })
    },

    releaseSound(url)
    {
        cc.loader.release(url)
    },

    onDestroy() 
    {
        this.stopMusic()
    }
});

module.exports = new SoundMgr()
