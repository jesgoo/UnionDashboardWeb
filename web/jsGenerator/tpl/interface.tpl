;(function () {
    var jesgooData = this.jesgoo_data || {};
    this.jesgoo_interface = {
        resizeContainer: function (height, isFixed) {
            window.sendMessage && sendMessage({ action: 'resize', height: height, force: true, fixed: isFixed});
        },
        autoResizeImage: function (force) {
            if (jesgooData.d && jesgooData.d.ImageUrl) {
                var img = document.createElement('img');
                img.setAttribute('onload', 'var h=this.height;var w=this.width;window.sendMessage&&sendMessage({action: "resize", height: Math.round(320 / w * h), force: ' + !!force + '});');
                img.src = jesgooData.d.ImageUrl;
            }
        }
    };
}.call(this));
