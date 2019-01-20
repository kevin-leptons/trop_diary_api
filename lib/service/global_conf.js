class GlobalConf {
    /*
    Input
        * conf / Object / {}.
        * conf.page_size / integer / 16.
    */
    constructor(conf={}) {
        conf.page_size = conf.page_size || 16
        this._conf = conf
    }

    get page_size() {
        return this._conf.page_size
    }
}

module.exports = GlobalConf
