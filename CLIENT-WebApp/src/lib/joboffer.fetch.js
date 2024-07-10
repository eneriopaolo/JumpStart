async function viewJobOffers(){
    const token = String(localStorage.getItem("token")).replace(/['"]+/g, '');
    const reqHeaders = {"Authorization": `Bearer ${token}`};

    let reqOptions = {
        method: 'GET',
        headers: reqHeaders
    };

    const URI = 'https://jumpstart-07yi.onrender.com/api/job';
    const response = await fetch(URI, reqOptions);
    return response
};

async function viewOwnJobOffers(){
    const token = String(localStorage.getItem("token")).replace(/['"]+/g, '');
    const reqHeaders = {"Authorization": `Bearer ${token}`};

    let reqOptions = {
        method: 'GET',
        headers: reqHeaders
    };

    const URI = 'https://jumpstart-07yi.onrender.com/api/job/myoffer';
    const response = await fetch(URI, reqOptions);
    return response
};

async function postJobOffer(title, desc, category, salary, skills){   
    const token = String(localStorage.getItem("token")).replace(/['"]+/g, '');
    const myHeaders = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    };

    let reqHeaders = new Headers(myHeaders);
    let reqBody = JSON.stringify({
        "jobTitle": title,
        "jobDescription": desc,
        "jobCategory": category, 
        "salaryPerMonth": salary,
        "skillsRequired": skills
    });

    let reqOptions = {
        method: 'POST',
        headers: reqHeaders,
        body: reqBody
    };

    const URI = 'https://jumpstart-07yi.onrender.com/api/job';
    const response = await fetch(URI, reqOptions);
    return response
};

async function searchJobsByTitle(title){
    const token = String(localStorage.getItem("token")).replace(/['"]+/g, '');
    const myHeaders = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    };

    let reqHeaders = new Headers(myHeaders);
    let reqBody = JSON.stringify({"jobTitle": title});

    let reqOptions = {
        method: 'POST',
        headers: reqHeaders,
        body: reqBody
    };

    const URI = 'https://jumpstart-07yi.onrender.com/api/job/search/title';
    const response = await fetch(URI, reqOptions);
    return response
};

async function searchJobsByCategory(category){
    const token = String(localStorage.getItem("token")).replace(/['"]+/g, '');
    const myHeaders = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    };

    let reqHeaders = new Headers(myHeaders);
    let reqBody = JSON.stringify({"jobCategory": category});

    let reqOptions = {
        method: 'POST',
        headers: reqHeaders,
        body: reqBody
    }

    const URI = 'https://jumpstart-07yi.onrender.com/api/job/search/category';
    const response = await fetch(URI, reqOptions);
    return response
};

async function searchJobsBySalary(minSalary, maxSalary){
    const token = String(localStorage.getItem("token")).replace(/['"]+/g, '');
    const myHeaders = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    };

    let reqHeaders = new Headers(myHeaders);
    let reqBody = JSON.stringify({
        "min": minSalary,
        "max": maxSalary
    });

    let reqOptions = {
        method: 'POST',
        headers: reqHeaders,
        body: reqBody
    }

    const URI = 'https://jumpstart-07yi.onrender.com/api/job/search/salary';
    const response = await fetch(URI, reqOptions);
    return response
};

export { 
    viewJobOffers,
    viewOwnJobOffers,
    postJobOffer,
    searchJobsByTitle,
    searchJobsByCategory,
    searchJobsBySalary
};