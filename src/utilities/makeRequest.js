const makeRequest = async (uri, requestObj, authToken = "") => {
    try {
        requestObj.headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'authorization': authToken
        };
        requestObj.mode = 'cors';
        const response = await fetch(uri, requestObj);
        let data = await response.json();
        if (data.name === 'error') {
            console.log(data);
            data.error = true;
            if (data.detail !== undefined) {
                data.error_message = `Error: ${data.detail.replace(/\(|\)|=|key/gi, " ")}`;
            } else {
                data.error_message = 'Error adding Doggo. Please try again.';
            }
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