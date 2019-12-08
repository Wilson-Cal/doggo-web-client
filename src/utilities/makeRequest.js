const makeRequest = async (uri, requestObj) => {
    try {
        requestObj.headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };
        requestObj.mode = 'cors';
        const response = await fetch(uri, requestObj);
        let data = await response.json();
        if (data.name === 'error') {
            data.error = true;
            data.error_message = `Error: ${data.detail.replace(/\(|\)|=|key/gi, " ")}`;
        } else {
            data.error = false;
        }
        return data;
    } catch (err) {
        console.error(err);
        return { error: true, error_message: err };
    }
};

export default makeRequest;