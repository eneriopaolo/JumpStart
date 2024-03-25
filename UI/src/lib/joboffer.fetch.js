async function searchJobsByTitle(title){
    const jobTitle = title;
    const token = String(localStorage.getItem("token")).replace(/['"]+/g, '');
    const myHeaders = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    };

    let reqHeaders = new Headers(myHeaders);
    let reqBody = JSON.stringify({"jobTitle": jobTitle});

    let reqOptions = {
        method: 'POST',
        headers: reqHeaders,
        body: reqBody
    };

    const URI = 'http://localhost:3000/api/job/search/title';
    const response = await fetch(URI, reqOptions);
    return response.json();
}

export { 
    searchJobsByTitle 
};