from scratch import runtime
import aiohttp
import asyncio

REQUEST_FAILS = "REQUEST_FAILS"
REQUEST_SUCCESS = "REQUEST_SUCCESS"

option = {}
status = 0
data = None


async def fetch_raw(method, url):
    global option, data, status
    async with aiohttp.ClientSession() as client:
        try:
            async with client.request(method, url, **option) as resp:
                status = resp.status
                content_type = resp.headers.get("Content-Type", "text/plain")
                if content_type.startswith("application/json"):
                    data = await resp.json()
                else:
                    data = await resp.text()
                runtime.fire(REQUEST_SUCCESS)
        except Exception:
            runtime.fire(REQUEST_FAILS)


def fetch(method, url):
    if runtime.wifi_connected:
        asyncio.create_task(fetch_raw(method, url))
    else:
        runtime.fire(REQUEST_FAILS)


def get_content(index_path=None):
    global data
    if not index_path:
        return ""
    if not data:
        return ""

    result = data
    index_path = index_path.split(".")
    for index in index_path:
        if type(result) == list:
            result = result[int(index) - 1]
        elif type(result) == dict:
            result = result.get(index)
        else:
            break
    if result != 0 and not result:
        return ""
    return result


def clear_cache():
    global option, data, status
    option = {}
    status = 0
    data = None


def set_header(header, value):
    global option
    option.setdefault("headers", {})
    option["headers"][header] = value


def set_body(key, value):
    global option
    option.setdefault("json", {})
    option["json"][key] = value
