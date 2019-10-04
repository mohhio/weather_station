export const CONNECT = "@Thermometer/CONNECT";
export const SCAN = "@Thermometer/CONNECT";
export const PUT_TEMPERATURE = "@Thermometer/PUT_TEMPERATURE";
export const PUT_HUMIDITY = "@Thermometer/PUT_HUMIDITY";

export const actionCreator = {
    connect: (manager) => ({
        type: CONNECT,
        payload: manager
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
  
};