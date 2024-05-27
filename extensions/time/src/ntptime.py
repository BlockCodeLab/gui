from thread_worker import Thread_worker
from scratch import runtime
from machine import RTC
import socket
import struct
import time


host = "pool.ntp.org"
timezone = 8
timeout = 1


# fork from https://github.com/micropython/micropython-lib/blob/master/micropython/net/ntptime/ntptime.py
def ntptime():
    NTP_QUERY = bytearray(48)
    NTP_QUERY[0] = 0x1B
    addr = socket.getaddrinfo(host, 123)[0][-1]
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    try:
        s.settimeout(timeout)
        s.sendto(NTP_QUERY, addr)
        msg = s.recv(48)
    finally:
        s.close()
    val = struct.unpack("!I", msg[40:44])[0]

    # 2024-01-01 00:00:00 converted to an NTP timestamp
    MIN_NTP_TIMESTAMP = 3913056000

    # Y2036 fix
    #
    # The NTP timestamp has a 32-bit count of seconds, which will wrap back
    # to zero on 7 Feb 2036 at 06:28:16.
    #
    # We know that this software was written during 2024 (or later).
    # So we know that timestamps less than MIN_NTP_TIMESTAMP are impossible.
    # So if the timestamp is less than MIN_NTP_TIMESTAMP, that probably means
    # that the NTP time wrapped at 2^32 seconds.  (Or someone set the wrong
    # time on their NTP server, but we can't really do anything about that).
    #
    # So in that case, we need to add in those extra 2^32 seconds, to get the
    # correct timestamp.
    #
    # This means that this code will work until the year 2160.  More precisely,
    # this code will not work after 7th Feb 2160 at 06:28:15.
    #
    if val < MIN_NTP_TIMESTAMP:
        val += 0x100000000

    # Convert timestamp from NTP format to our internal format

    EPOCH_YEAR = time.gmtime(0)[0]
    if EPOCH_YEAR == 2000:
        # (date(2000, 1, 1) - date(1900, 1, 1)).days * 24*60*60
        NTP_DELTA = 3155673600
    elif EPOCH_YEAR == 1970:
        # (date(1970, 1, 1) - date(1900, 1, 1)).days * 24*60*60
        NTP_DELTA = 2208988800
    else:
        raise Exception("Unsupported epoch: {}".format(EPOCH_YEAR))

    return val - NTP_DELTA


def sync_world_time():
    t = ntptime()
    # timezone
    t += timezone * 60 * 60
    # (year, month, mday, hour, minute, second, weekday, yearday)
    tm = time.gmtime(t)
    # (year, month, day, weekday, hours, minutes, seconds, subseconds)
    RTC().datetime((tm[0], tm[1], tm[2], tm[6] + 1, tm[3], tm[4], tm[5], 0))


async def async_world_time():
    Thread_worker(sync_world_time).start()
    await runtime.wait_for(timeout + 0.1)


def get_time(option="year"):
    if option == "year":
        return RTC().datetime()[0]
    if option == "month":
        return RTC().datetime()[1]
    if option == "date":
        return RTC().datetime()[2]
    if option == "weekday":
        return RTC().datetime()[3] + 1
    if option == "hour":
        return RTC().datetime()[4]
    if option == "minute":
        return RTC().datetime()[5]
    if option == "second":
        return RTC().datetime()[6]


def get_days():
    return time.mktime(time.gmtime()) / (24 * 3600)
