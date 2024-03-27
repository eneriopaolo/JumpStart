async function viewMyApplications() {
    const token = String(localStorage.getItem("token")).replace(/['"]+/g, '');
    const reqHeaders = {"Authorization": `Bearer ${token}`};

    let reqOptions = {
        method: 'GET',
        headers: reqHeaders
    };

    const URI = 'http://localhost:3000/api/application';
    const response = await fetch(URI, reqOptions);
    return response
}

export {
    viewMyApplications
}