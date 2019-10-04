export const CONNECT = "@Thermometer/CONNECT";
export const SCAN = "@Thermometer/SCAN";
export const PUT_TEMPERATURE = "@Thermometer/PUT_TEMPERATURE";
export const PUT_HUMIDITY = "@Thermometer/PUT_HUMIDITY";
export const PUT_DEVICE = "@Thermometer/PUT_DEVICE";

export const actionCreator = {
    connect: (device) => ({
        type: CONNECT,
        payload: device
    }),
    scan: (manager) => ({
        type: SCAN,
        payload: manager
    }),
    putTemperature: (temperature) => ({
        type: PUT_TEMPERATURE,
        payload: temperature
    }),
    putHumidity: (humidity) => ({
        type: PUT_HUMIDITY,
        payload: humidity
    }),
    putDevice: (device) => ({
        type: PUT_DEVICE,
        payload: device
    }),
  
};