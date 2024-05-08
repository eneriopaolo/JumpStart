async function viewJobSeekerProfile(id){
    const token = String(localStorage.getItem("token")).replace(/['"]+/g, '');
    const reqHeaders = {"Authorization": `Bearer ${token}`};

    let reqOptions = {
        method: 'GET',
        headers: reqHeaders
    };

    const URI = `https://jumpstart-07yi.onrender.com/api/profile/jobseeker/${id}`;
    const response = await fetch(URI, reqOptions);
    return response
};

async function viewEmployerProfile(id){
    const token = String(localStorage.getItem("token")).replace(/['"]+/g, '');
    const reqHeaders = {"Authorization": `Bearer ${token}`};

    let reqOptions = {
        method: 'GET',
        headers: reqHeaders
    }

    const URI = `https://jumpstart-07yi.onrender.com/api/profile/employer/${id}`;
    const response = await fetch(URI, reqOptions);
    return response
};

export {
    viewJobSeekerProfile,
    viewEmployerProfile
}