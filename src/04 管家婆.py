import requests

import execjs

cookies = {
    '_ati': '3405960380295',
    'acw_tc': '3ccdc14117450544599561497e7d1e2d719b9a01ffe0a3fe4bd2ea6a61edea',
    '3AB9D23F7A4B3C9B': '33BML6P35UWHKP6XWK2HQFYRBQ5I27G6GE2QZKMLKR4IFED52MZPAOJQEQLA3ZLKGYV5HLGQS3JMNSEYFPGBWFQHCM',
}

headers = {
    'Accept': 'application/json, text/javascript, */*; q=0.01',
    'Accept-Language': 'zh-CN,zh;q=0.9',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
    'Content-Type': 'application/json',
    'Origin': 'https://passport.mygjp.com.cn',
    'Pragma': 'no-cache',
    'Referer': 'https://passport.mygjp.com.cn/',
    'Sec-Fetch-Dest': 'empty',
    'Sec-Fetch-Mode': 'cors',
    'Sec-Fetch-Site': 'same-origin',
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36',
    'X-Requested-With': 'XMLHttpRequest',
    'sec-ch-ua': '"Google Chrome";v="135", "Not-A.Brand";v="8", "Chromium";v="135"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"macOS"',
    # 'Cookie': '_ati=3405960380295; acw_tc=3ccdc14117450544599561497e7d1e2d719b9a01ffe0a3fe4bd2ea6a61edea; 3AB9D23F7A4B3C9B=33BML6P35UWHKP6XWK2HQFYRBQ5I27G6GE2QZKMLKR4IFED52MZPAOJQEQLA3ZLKGYV5HLGQS3JMNSEYFPGBWFQHCM',
}

json_data = {
    'companyName': '路飞',
    'validateCode': '',
    'validateId': '',
    'deviceId': '33BML6P35UWHKP6XWK2HQFYRBQ5I27G6GE2QZKMLKR4IFED52MZPAOJQEQLA3ZLKGYV5HLGQS3JMNSEYFPGBWFQHCM',
    'ati': '3405960380295',
    'https': True,
    'loginType': None,
}

ret = execjs.compile(open("05 管家婆.js").read()).call("get_enc_data","yuan0316","123456")
json_data.update(ret)
response = requests.post('https://passport.mygjp.com.cn/api/ngpLogin', cookies=cookies, headers=headers, json=json_data)

print(response.text)
