async function loginUser(email, password){
    const myHeaders = {
        "Content-Type": "application/json"
    };

    let reqHeaders = new Headers(myHeaders);
    let reqBody = JSON.stringify({
        "email": email,
        "password": password
    });

    let reqOptions = {
        method: 'POST',
        headers: reqHeaders,
        body: reqBody
    };

    const URI = 'http://localhost:3000/api/auth/login';
    const response = await fetch(URI, reqOptions);
    return response
};

async function registerUser(email, name, password, userType){
    const myHeaders = {
        "Content-Type": "application/json"
    };

    let reqHeaders = new Headers(myHeaders);
    let reqBody = JSON.stringify({
        "email": email,
        "name": name,
        "password": password,
        "typeofuser": userType
    });

    let reqOptions = {
        method: 'POST',
        headers: reqHeaders,
        body: reqBody
    };

    const URI = 'http://localhost:3000/api/auth/register';
    const response = await fetch(URI, reqOptions);
    return response
};

export {
    loginUser,
    registerUser
};