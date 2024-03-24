async function searchJobsByTitle(jobTitle){
    const jobTitle = jobTitle;

    let reqHeaders = new Headers();
    reqHeaders.append("Content-Type", "application/json");

    let reqBody = JSON.stringify({"jobTitle": jobTitle});

    let reqOptions = {
        method: 'POST',
        headers: reqHeaders,
        body: reqBody
    };

    const URI = 'http://localhost:3000/api/job/search/title'
    const response = await fetch(URI, reqOptions)
    console.log(response);
    return response
}

export { 
    searchJobsByTitle 
};