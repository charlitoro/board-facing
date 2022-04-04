// import fetch from 'node-fetch'

const API_URL = 'http://localhost:8180'

export const getBoards = async () => {
    const res = await fetch(`${API_URL}/boards`, {
        method: 'GET'
    }).then(res => res.json())
    return res["data"]
}

export const getResources = async ( id ) => {
    const res = await fetch(`${API_URL}/board/${id}`, {
        method: 'GET'
    }).then(res => res.json())
    return res['data']
}

export const uploadResource = async (data) => {
    const formData  = new FormData();
    for (const name in data) {
        formData.append(name, data[name]);
    }
    const response = await fetch(`${API_URL}/upload`, {
        method: 'POST',
        body: formData
    }).then(res => res.json());

    return response["data"]
}

export const deleteResource = async (id) => {
    const res = await fetch(`${API_URL}/resource/delete`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({id})
    }).then(res => res.json())
    console.log(res)
}