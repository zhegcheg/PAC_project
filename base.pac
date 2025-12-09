function FindProxyForURL(url, host) {
    // 局域网直连
    if (isPlainHostName(host) ||
        shExpMatch(host, "10.*") ||
        shExpMatch(host, "172.16.*") ||
        shExpMatch(host, "192.168.*") ||
        shExpMatch(host, "*.local"))
        return "DIRECT";

    // 国内域名直连
    var CN_Domain = [
        "cn", "baidu.com", "qq.com", "163.com", "126.com", "taobao.com",
        "jd.com", "bilibili.com", "youku.com", "tencent.com", "sina.com",
        "alibaba.com", "alipay.com", "mi.com", "tmall.com", "haokan.baidu.com",
        "zhihu.com", "360.cn", "icbc.com.cn", "cmbchina.com", "ali213.net"
    ];
    var shost = host.toLowerCase();
    for (var i = 0; i < CN_Domain.length; i++) {
        if (dnsDomainIs(shost, CN_Domain[i]) || shost.endsWith("." + CN_Domain[i]))
            return "DIRECT";
    }

    // 默认：走代理
    return "SOCKS5 127.0.0.1:10808; DIRECT";
}
