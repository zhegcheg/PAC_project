function FindProxyForURL(url, host) {

    // Normalize host
    host = host.toLowerCase();

    // ---------- DIRECT LIST ----------
    // Localhost & LAN
    if (dnsDomainIs(host, "localhost") ||
        isPlainHostName(host) ||
        shExpMatch(host, "10.*") ||
        shExpMatch(host, "172.16.*") ||
        shExpMatch(host, "192.168.*") ||
        shExpMatch(host, "*.local")) {
        return "DIRECT";
    }

    // ---------- DOWNLOAD / BT / GAME DOWNLOAD ----------
    if (
        // BT trackers
        shExpMatch(host, "*.torrent") ||
        shExpMatch(host, "*.tracker*") ||
        shExpMatch(host, "*.announce*") ||

        // BT / 下载软件
        shExpMatch(host, "*.xunlei.com") ||
        shExpMatch(host, "*.sandai.net") ||
        shExpMatch(host, "*.thunderurl.com") ||
        shExpMatch(host, "tracker.*") ||
        shExpMatch(host, "announce.*") ||

        // 百度网盘
        shExpMatch(host, "*.baidupcs.com") ||
        shExpMatch(host, "*.bdstatic.com") ||
        shExpMatch(host, "*.bdimg.com") ||

        // Steam / Epic 下载 CDN
        shExpMatch(host, "*.steamcontent.com") ||
        shExpMatch(host, "*.steampowered.com") ||
        shExpMatch(host, "*.steamserver.net") ||
        shExpMatch(host, "content*.steampowered.com") ||
        shExpMatch(host, "*.cs.steampowered.com") ||
        shExpMatch(host, "*.client-download.steampowered.com") ||
        shExpMatch(host, "*.steamchina.com") ||
        shExpMatch(host, "*.steamusercontent.com") ||

        // Epic download CDN
        shExpMatch(host, "*.epicgames-download1.com") ||
        shExpMatch(host, "*.download.epicgames.com") ||

        // Microsoft / Windows Update 大文件下载
        shExpMatch(host, "*.windowsupdate.com") ||
        shExpMatch(host, "*.update.microsoft.com") ||
        shExpMatch(host, "*.msdownload.microsoft.com") ||

        // 常见下载网站
        shExpMatch(host, "*.mediafire.com") ||
        shExpMatch(host, "*.mega.nz") ||
        shExpMatch(host, "*.wetransfer.com")
    ) {
        return "DIRECT";
    }

    // ---------- GITHUB 强制代理 ----------
    if (
        shExpMatch(host, "github.com") ||
        shExpMatch(host, "*.github.com") ||
        shExpMatch(host, "githubusercontent.com") ||
        shExpMatch(host, "*.githubusercontent.com")
    ) {
        return "PROXY 127.0.0.1:10809";
    }

    // ---------- CHINA MAINLAND DIRECT ----------
    var direct_domains = [
        "cn", "com.cn", "net.cn", "org.cn",

        // Major Chinese websites
        "baidu.com", "qq.com", "weixin.qq.com", "bilibili.com", "jd.com",
        "taobao.com", "tmall.com", "alipay.com", "douyin.com", "kuaishou.com",
        "zhihu.com", "sogou.com", "163.com", "126.com", "sohu.com", "youku.com",
        "iqiyi.com", "tudou.com", "xiaomi.com", "mi.com",

        // Chinese CDN
        "alicdn.com", "aliyun.com", "myqcloud.com", "qiniudn.com", "bdstatic.com",
        "gtimg.com",

        // 国内 API / 常用网站
        "csdn.net", "gitee.com", "juejin.cn", "36kr.com", "hupu.com", "douban.com"
    ];

    for (var i = 0; i < direct_domains.length; i++) {
        if (dnsDomainIs(host, direct_domains[i]) || shExpMatch(host, "*." + direct_domains[i])) {
            return "DIRECT";
        }
    }

    // ---------- DEFAULT RULE ----------
    // 非中国大陆域名全部走代理
    return "PROXY 127.0.0.1:10809";
}
