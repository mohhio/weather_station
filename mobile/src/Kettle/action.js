export const CONNECT = "@Kettle/CONNECT";
export const SCAN = "@Kettle/SCAN";
export const PUT_DEVICE = "@Kettle/PUT_DEVICE";

export const actionCreator = {
    connect: (device) => ({
        type: CONNECT,
        payload: device
    }),
    scan: (manager) => ({
        type: SCAN,
        payload: manager
    }),
    putDevice: (device) => ({
        type: PUT_DEVICE,
        payload: device
    }),
  
};
