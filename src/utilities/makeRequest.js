const makeRequest = async (uri, body) => {
    try {
        const response = await fetch(uri, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(body)
        });
        let data = await response.json();
        if (data.name === "error") {
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