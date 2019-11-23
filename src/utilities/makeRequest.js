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
        let data = await response.text();
        data.error = false;
        return data;
    } catch (err) {
        console.error(err);
        return { error: true, error_message: err };
    }
};

export default makeRequest;