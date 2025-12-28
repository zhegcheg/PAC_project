// ===== 基础代理定义 =====
var DIRECT = "DIRECT";
var PROXY = "SOCKS5 127.0.0.1:10808";

// ===== 私有地址直连 =====
function isPrivateIP(ip) {
  return isInNet(ip, "10.0.0.0", "255.0.0.0") ||
         isInNet(ip, "172.16.0.0", "255.240.0.0") ||
         isInNet(ip, "192.168.0.0", "255.255.0.0") ||
         isInNet(ip, "127.0.0.0", "255.255.255.0");
}

function FindProxyForURL(url, host) {

  // ===== 本地主机 & 局域网 =====
  if (
    isPlainHostName(host) ||
    host === "localhost" ||
    isPrivateIP(dnsResolve(host))
  ) {
    return DIRECT;
  }

  // ===== 下载 / 更新 / BT / 网盘（强制直连）=====
  if (
    shExpMatch(host, "*.steamcontent.com") ||
    shExpMatch(host, "*.steamserver.net") ||
    shExpMatch(host, "*.steampowered.com") ||
    shExpMatch(host, "*.epicgames.com") ||
    shExpMatch(host, "*.epicgamescdn.com") ||
    shExpMatch(host, "*.origin.com") ||
    shExpMatch(host, "*.ea.com") ||
    shExpMatch(host, "*.battle.net") ||
    shExpMatch(host, "*.blizzard.com") ||
    shExpMatch(host, "*.qbittorrent.org") ||
    shExpMatch(host, "*.bittorrent.com") ||
    shExpMatch(host, "*.aliyundrive.com") ||
    shExpMatch(host, "*.aliyuncs.com") ||
    shExpMatch(host, "*.baidupcs.com") ||
    shExpMatch(host, "*.baidu.com") ||
    shExpMatch(host, "*.xunlei.com") ||
    shExpMatch(host, "*.feemoo.com") ||
    shExpMatch(host, "*.115.com")
  ) {
    return DIRECT;
  }

  // ===== 国内常用网站直连 =====
  if (
    shExpMatch(host, "*.cn") ||
    shExpMatch(host, "*.qq.com") ||
    shExpMatch(host, "*.weixin.qq.com") ||
    shExpMatch(host, "*.taobao.com") ||
    shExpMatch(host, "*.tmall.com") ||
    shExpMatch(host, "*.jd.com") ||
    shExpMatch(host, "*.bilibili.com") ||
    shExpMatch(host, "*.zhihu.com") ||
    shExpMatch(host, "*.douyin.com") ||
    shExpMatch(host, "*.alipay.com") ||
    shExpMatch(host, "*.aliyun.com") ||
    shExpMatch(host, "*.csdn.net")
  ) {
    return DIRECT;
  }

  // ===== 必走代理（重点）=====
  if (
    shExpMatch(host, "*.google.com") ||
    shExpMatch(host, "*.googleapis.com") ||
    shExpMatch(host, "*.gstatic.com") ||
    shExpMatch(host, "*.github.com") ||
    shExpMatch(host, "*.githubusercontent.com") ||
    shExpMatch(host, "*.openai.com") ||
    shExpMatch(host, "*.chatgpt.com") ||
    shExpMatch(host, "*.anthropic.com") ||
    shExpMatch(host, "*.cloudflare.com") ||
    shExpMatch(host, "*.youtube.com") ||
    shExpMatch(host, "*.ytimg.com") ||
    shExpMatch(host, "*.twitter.com") ||
    shExpMatch(host, "*.x.com") ||
    shExpMatch(host, "*.facebook.com") ||
    shExpMatch(host, "*.instagram.com") ||
    shExpMatch(host, "*.telegram.org") ||
    shExpMatch(host, "*.t.me")
  ) {
    return PROXY;
  }

  // ===== 默认策略 =====
  // 非国内站点 → 代理
  return PROXY;
}
