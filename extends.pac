var DIRECT = "DIRECT";
var PROXY = "SOCKS5 127.0.0.1:10808";

function FindProxyForURL(url, host) {
    // 1. 基础检查：本地主机、无后缀域名
    if (isPlainHostName(host) || host === "localhost" || host === "127.0.0.1") {
        return DIRECT;
    }

    // 2. 强制直连域名（下载/更新/国内游戏大站/网盘）
    if (
        shExpMatch(host, "*.cn") ||
        // --- 游戏媒体与社区 ---
        shExpMatch(host, "*.gamersky.com") || // 游民星空
        shExpMatch(host, "*.3dmgame.com") ||  // 3DM
        shExpMatch(host, "*.ali213.net") ||   // 游侠网
        shExpMatch(host, "*.taptap.com") ||   // TapTap
        shExpMatch(host, "*.vgtime.com") ||   // 游戏时光
        // --- 游戏平台分发 ---
        shExpMatch(host, "*.steamcontent.com") ||
        shExpMatch(host, "*.steampowered.com") ||
        shExpMatch(host, "*.epicgames.com") ||
        shExpMatch(host, "*.sonynetworkservices.com") || // PSN加速
        // --- 国内常用大站与下载 ---
        shExpMatch(host, "*.baidu.com") ||
        shExpMatch(host, "*.baidupcs.com") ||
        shExpMatch(host, "*.aliyundrive.com") ||
        shExpMatch(host, "*.qq.com") ||
        shExpMatch(host, "*.bilibili.com") ||
        shExpMatch(host, "*.zhihu.com") ||
        shExpMatch(host, "*.csdn.net") ||
        shExpMatch(host, "*cdn*") || 
        shExpMatch(host, "*download*")
    ) {
        return DIRECT;
    }

    // 3. 必走代理域名（需要“魔法”的站点）
    if (
        shExpMatch(host, "*.google*") ||
        shExpMatch(host, "*.googleapis.com") ||
        shExpMatch(host, "*.gstatic.com") ||
        shExpMatch(host, "*.github*") ||
        shExpMatch(host, "*.openai*") ||
        shExpMatch(host, "*.chatgpt*") ||
        shExpMatch(host, "*.anthropic.com") ||
        shExpMatch(host, "*.youtube*") ||
        shExpMatch(host, "*.ytimg.com") ||
        shExpMatch(host, "*.twitter.com") ||
        shExpMatch(host, "*.x.com") ||
        shExpMatch(host, "*.telegram.org") ||
        shExpMatch(host, "*.t.me")
    ) {
        return PROXY;
    }

    // 4. 高性能优化：匹配不到域名后再解析 IP 判断私有网段
    var resolved_ip = dnsResolve(host);
    if (isInNet(resolved_ip, "10.0.0.0", "255.0.0.0") ||
        isInNet(resolved_ip, "172.16.0.0", "255.240.0.0") ||
        isInNet(resolved_ip, "192.168.0.0", "255.255.0.0") ||
        isInNet(resolved_ip, "127.0.0.0", "255.255.255.0")) {
        return DIRECT;
    }

    // 5. 默认策略：除上述明确规则外，其余站点尝试走代理
    return PROXY;
}
