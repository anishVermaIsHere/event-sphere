
export function parsePersistedData(data) {
    const parsedData = {};
    for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
            try {
                parsedData[key] = JSON.parse(data[key]);
            } catch (err) {
                parsedData[key] = data[key];
            }
        }
    }

    return parsedData;
}

