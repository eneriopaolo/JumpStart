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
};

async function sendJobApplication(offerid) {
    const token = String(localStorage.getItem("token")).replace(/['"]+/g, '');
    const reqHeaders = {"Authorization": `Bearer ${token}`};

    let reqOptions = {
        method: 'POST',
        headers: reqHeaders
    };

    const URI = `http://localhost:3000/api/application/${offerid}`;
    const response = await fetch(URI, reqOptions)
    return response
};

async function approveApplication(applicationID) {
    const token = String(localStorage.getItem("token")).replace(/['"]+/g, '');
    const reqHeaders = {"Authorization": `Bearer ${token}`};

    let reqBody = JSON.stringify({
        "status": "accepted"
    });

    let reqOptions = {
        method: 'PATCH',
        headers: reqHeaders,
        body: reqBody
    }

    const URI = `http://localhost:3000/api/application/approve/${applicationID}`;
    const response = await fetch(URI, reqOptions);
    return response
};

async function denyApplication(applicationID) {
    const token = String(localStorage.getItem("token")).replace(/['"]+/g, '');
    const reqHeaders = {"Authorization": `Bearer ${token}`};

    let reqBody = JSON.stringify({
        "status": "denied"
    });

    let reqOptions = {
        method: 'PATCH',
        headers: reqHeaders,
        body: reqBody
    }

    const URI = `http://localhost:3000/api/application/deny/${applicationID}`;
    const response = await fetch(URI, reqOptions);
    return response
};

export {
    viewMyApplications,
    sendJobApplication,
    approveApplication,
    denyApplication
}