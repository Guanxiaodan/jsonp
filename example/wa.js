window.baidu = window.baidu || {}, window.baidu.lbstag = window.baidu.lbstag || {};
;window.baidu.lbstag.tagsVersion = {
  "lbs-map":"1",
  "lbs-weather":"1",
  "lbs-subway":"2",
  "lbs-nearby":"1",
  "lbs-transit":"1",
  "lbs-walk":"1",
  "lbs-nav":"1",
  "lbs-geo":"1",
  "lbs-location":"1"
}, window.baidu.lbstag.host = "http://map.baidu.com";
;!function () {
  function t (t, n, e) {
    if (t.length === +t.length) {
      for (var i = 0, a = t.length; a > i; i++)if (n.call(e, i, t[i], t) === !1)return
    } else for (var o in t)if (t.hasOwnProperty(o) && n.call(e, o, t[o], t) === !1)return
  }

  var n = [], e = {
    push:function (t) {
      if (n.push(t), window.localStorage && window.JSON)try {
        localStorage.setItem("WPO_NR", JSON.stringify(n))
      } catch (e) {
      }
    }, get:function (t) {
      var e = [];
      if (window.localStorage && window.JSON)try {
        e = JSON.parse(localStorage.getItem("WPO_NR")) || [], t && localStorage.removeItem("WPO_NR")
      } catch (i) {
      } else e = n;
      return t && (n = []), e
    }
  }, i = {}, a = {}, o = {
    PDC:{
      _apps:{}, start_time:"", init:function (t) {
        var n = navigator.connection || navigator.mozConnection || navigator.webkitConnection || {type:0};
        i = {
          p:t.product_id,
          is_sample:Math.random() <= (t.sample || .01),
          max:t.max || 5,
          mnt:t.mnt || n.type
        }, a = {p:t.product_id, mnt:i.mnt, b:50}
      }, createApp:function (t) {
        var n = this._apps["app_" + t];
        return n ? n : this.createInstance(t)
      }, createInstance:function (t) {
        return new s(t)
      }, getAppID:function (t) {
        return SDC.DICT[t] ? SDC.DICT[t] : void 0
      }
    }
  };
  window.localStorage && window.JSON || !document.attachEvent || window.attachEvent("onbeforeunload", function () {
    r.send()
  });
  var r = {
    send:function (n) {
      var i, o = [], r = [], s = n || e.get(!0);
      if (0 !== s.length && s.length > 0) {
        t(s, function (e, a) {
          var r = [];
          t(a.timing, function (t, n) {
            r.push('"' + t + '":' + n)
          }), o.push('{"t":{' + r.join(",") + '},"a":' + a.appId + "}"), !i && n && a.start && (i = a.start)
        }), t(a, function (t, n) {
          r.push(t + "=" + n)
        }), r.push("d=[" + o.join(",") + "]"), i ? r.push("_st=" + i) : r.push("_t=" + +new Date);
        var c = new Image;
        c.src = "http://static.tieba.baidu.com/tb/pms/img/st.gif?" + r.join("&"), window["___pms_img_" + 1 * new Date] = c
      }
    }
  }, s = function (t) {
    this.appId = t, this.timing = {}, this.start = +new Date
  };
  s.prototype = {
    mark:function (t, n) {
      this.timing[t] = n || new Date - SDC.start_time
    }, start_event:function (t) {
      SDC.start_time = t
    }, start_send:function () {
      this.mark("sts")
    }, transfer_time:function () {
      this.mark("tt")
    }, view_time:function () {
      this.mark("vt")
    }, ready:function () {
      i.is_sample && (e.push(this), e.get().length >= i.max && r.send())
    }, error:function () {
    }
  }, window.SDC = o.PDC, window.SDC.send = r.send
}();
;"use strict";
!function () {
  SDC.DICT = {
    LOAD_CORE:1,
    REGISTY_COMPONENT:2,
    "LBS-MAP":3,
    "LBS-GEO":4,
    "LBS-SUBWAY":5,
    "LBS-NEARBY":6,
    "LBS-TRANSIT":7,
    "LBS-WALK":8,
    "LBS-NAV":9,
    "LBS-WEATHER":10,
    FETCH_MAP:11,
    FETCH_GEO:12,
    FETCH_SUBWAY:13,
    FETCH_NEARBY:14,
    FETCH_TRANSIT:15,
    FETCH_WALK:16,
    FETCH_NAV:17,
    FETCH_WEATHER:18,
    CREATE_MAP:19
  }, SDC && SDC.init({sample:1, product_id:200, max:5})
}();
;!function () {
  function t (t, e) {
    var n = new window.XMLHttpRequest;
    n.onreadystatechange = function () {
      4 == this.readyState && e(this.responseText)
    }, n.open("GET", t, !0), n.send()
  }

  function e (t) {
    p.mark("cl"), p.ready(), o(t), f && n(t, u)
  }

  function n (t, e) {
    var n = "", o = {version:e, content:t};
    n = s.stringify(o), i.setItem(l, n)
  }

  function o (t) {
    var e = document.createElement("script");
    e.innerHTML = t, document.querySelector("head").appendChild(e)
  }

  function r () {
    t(d, e)
  }

  function a () {
    p = SDC.createApp(SDC.DICT.LOAD_CORE), p.start_event(Date.now());
    var t = i.getItem(l) || {};
    p.mark("cl");
    var e = s.parse(t) || {};
    e.version === u && e.content && f ? (p.ready(), o(e.content)) : r()
  }

  var c = "http://s1.map.bdimg.com/components/static/api/1/0/core_48efd4f.js", i = {}, s = {}, p = {},
    u = /_(.*)\.js/.exec(c)[1], m = window.baidu.lbstag.host, d = m + "/components?v=1.0&file=core&hash=" + u, f = !0,
    l = "__bmap_webcomponents";
    // http://map.baidu.com/components?v=1.0&file=core&hash=48efd4f
  ["getItem", "setItem", "removeItem"].forEach(function (t) {
    i[t] = function () {
      var e = Array.prototype.slice.apply(arguments);
      try {
        return window.localStorage[t].apply(window.localStorage, e)
      } catch (n) {
        return null
      }
    }
  }), ["parse", "stringify"].forEach(function (t) {
    s[t] = function () {
      var e = Array.prototype.slice.apply(arguments);
      try {
        return window.JSON[t].apply(window.JSON, e)
      } catch (n) {
      }
    }
  }), a()
}(this);






