from micropython import const
from scratch import runtime
from machine import RTC
import ntptime
import socket
import struct
import time

HOUR_SECONDS = const(60 * 60)
DAY_SECONDS = const(24 * 60 * 60)

timezone = 8
time_worker = runtime.create_worker(ntptime.settime)


async def async_world_time():
    time_worker.start()
    await runtime.wait_for(ntptime.timeout + 0.1)


def get_time(option="year"):
    t = time.time()
    t += timezone * HOUR_SECONDS
    # (year, month, mday, hour, minute, second, weekday, yearday)
    tm = time.gmtime(t)
    if option == "year":
        return tm[0]
    if option == "month":
        return tm[1]
    if option == "date":
        return tm[2]
    if option == "weekday":
        return tm[6] + 1
    if option == "hour":
        return tm[3]
    if option == "minute":
        return tm[4]
    if option == "second":
        return tm[5]


def get_days():
    t = time.time()
    t += timezone * HOUR_SECONDS
    return t / DAY_SECONDS
