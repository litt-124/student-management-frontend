import { reactive, toRefs } from 'vue';

const dataEmitterService = reactive({});

const $emit = (event, payload) => {
    if (dataEmitterService[event]) {
        dataEmitterService[event].callbacks.forEach(callback => {
            callback(payload);
        });
    }
};

const $on = (event, callback) => {
    if (!dataEmitterService[event]) {
        dataEmitterService[event] = { callbacks: [] };
    }
    dataEmitterService[event].callbacks.push(callback);
};

const $off = (event, callback) => {
    if (dataEmitterService[event]) {
        const index = dataEmitterService[event].callbacks.indexOf(callback);
        if (index !== -1) {
            dataEmitterService[event].callbacks.splice(index, 1);
        }
    }
};

export const DataEmitterService = {
    ...toRefs(dataEmitterService),
    $emit,
    $on,
    $off
};
