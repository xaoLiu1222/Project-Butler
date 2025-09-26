import requests
import execjs

js_compile = execjs.compile(open("02 xiniu数据.js").read())
p = {
    "sort": 1,
    "start": 40,
    "limit": 20
}
ret = js_compile.call("get_params", p)

print(ret)
headers = {
    'sec-ch-ua-platform': '"macOS"',
    'Referer': 'https://www.xiniudata.com/industry/newest?from=data',
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36',
    'Accept': 'application/json',
    'sec-ch-ua': '"Google Chrome";v="135", "Not-A.Brand";v="8", "Chromium";v="135"',
    'Content-Type': 'application/json',
    'sec-ch-ua-mobile': '?0',
}

json_data = {
    'v': 1,
}
json_data.update(ret)

response = requests.post(
    'https://www.xiniudata.com/api2/service/x_service/person_industry_list/list_industries_by_sort',
    headers=headers,
    json=json_data,
)
data = response.json().get("d")

data = js_compile.call("decrypt_data", data)
print(data)
