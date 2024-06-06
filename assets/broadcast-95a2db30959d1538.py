from scratch import runtime
import network
import aioespnow
import asyncio
import time

PING = "PING"
RECEIVE_MESSAGE = "RECEIVE_MESSAGE"

running = False
group = bytes(f"{PING}:1", "utf-8")
received = {}


async def heartbeat(e, peer, period=10):
    while True:
        await e.asend(peer, group)
        await asyncio.sleep(period)


async def server(e):
    global group, received
    async for mac, msg in e:
        try:
            e.get_peer(mac)
        except OSError as err:
            if (
                msg == group
                and len(err.args) > 1
                and err.args[1] == "ESP_ERR_ESPNOW_NOT_FOUND"
            ):
                e.add_peer(mac)
        if msg != group:
            if type(msg) == bytearray:
                msg = msg.decode("utf-8")
            value = msg
            kv = msg.split(":")
            if len(kv) == 2:
                name, value = kv
            else:
                name = "default"
            received.setdefault(name, {"serialnumber": 0})
            received[name]["value"] = value
            received[name]["timestamp"] = time.ticks_ms()
            received[name]["serialnumber"] += 1
            runtime.fire(f"{RECEIVE_MESSAGE}:{name}")
        await runtime.next_tick()


def start():
    global running
    if not running:
        network.WLAN(network.STA_IF).active(True)

        e = aioespnow.AIOESPNow()
        e.active(True)
        peer = b"\xff" * 6
        e.add_peer(peer)

        asyncio.create_task(heartbeat(e, peer))
        asyncio.create_task(server(e))
        running = e
    return running


async def send_raw(msg):
    e = start()
    peers = e.get_peers()
    for mac, lmk, channel, ifidx, encrypt in peers:
        try:
            await e.asend(mac, msg)
        except OSError as err:
            if len(err.args) > 1:
                if err.args[1] == "ESP_ERR_ESPNOW_NOT_INIT":
                    e.active(True)
                    await e.asend(mac, msg)
                elif err.args[1] == "ESP_ERR_ESPNOW_IF":
                    network.WLAN(network.STA_IF).active(True)
                    await e.asend(mac, msg)


def send(msg, name="default"):
    asyncio.create_task(send_raw(f"{name}:{msg}"))


def set_group(value):
    global group
    if not running:
        group = bytes(f"{PING}:{value}", "utf-8")


def when_received(name, func, target):
    start()
    runtime.when(f"{RECEIVE_MESSAGE}:{name}", func, target)


def get_message(name="default"):
    global received
    start()
    data = received.get(name, {})
    return data.get("value", "")


def get_message_info(key="serialnumber", name="default"):
    global received
    start()
    data = received.get(name, {})
    return data.get(key, "")
