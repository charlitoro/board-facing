// import fetch from 'node-fetch'

const getURL = () => {
    return process.env.API_URL || 'http://localhost:8180'
}

export const getBoards = async () => {
    const API_URL = getURL()
    const res = await fetch(`${API_URL}/boards`, {
        method: 'GET'
    }).then(res => res.json())
    return res["data"]
}

export const getResources = async ( id ) => {
    const API_URL = getURL()
    const res = await fetch(`${API_URL}/board/${id}`, {
        method: 'GET'
    }).then(res => res.json())
    return res['data']
}

export const uploadResource = async (data) => {
    const API_URL = getURL()
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
    const API_URL = getURL()
    const res = await fetch(`${API_URL}/resource/delete`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({id})
    }).then(res => res.json())
    console.log(res)
}

export const createBoard = async (data) => {
    const API_URL = getURL()
    const res = await fetch(`${API_URL}/board/create`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then( res => res.json() )
    return res["data"]
}

export const deleteBoard = async (id) => {
    const API_URL = getURL()
    const res = await fetch(`${API_URL}/board/delete`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({id})
    }).then( res => res.json() )
    return res["data"]
}


export const login = async (email, password) => {
    const API_URL = getURL()
    return await fetch(`${API_URL}/login`, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    }).then(res => res.json())
}
