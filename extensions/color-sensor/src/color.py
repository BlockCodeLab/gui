from sensor.color import Color_sensor
from arcade import parts

sensor = None


def set_sensor(port):
    global sensor
    sensor = Color_sensor(parts.Ports[port])


def calibrate(color):
    sensor.calibrate(color == "black")


def is_calibrated():
    return sensor.is_calibrated


def get_color(mode):
    if mode < 0:
        return sensor.color
    else:
        sensor.color[mode]


def on():
    sensor.on()


def off():
    sensor.off()
