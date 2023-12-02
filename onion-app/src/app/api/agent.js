import axios from 'axios'

const sleep = (delay) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay)
    })
}

axios.defaults.baseURL = 'http://localhost:5000/api'

const requests = {
    get: (url) => axios.get(url).then((res) => res.data),
    post: (url, body) => axios.post(url, body).then((res) => res.data)
}

const Planilhas = {
    list: () => requests.get('/planilhas'),
    details: (id) => requests.get(`/planilhas/${id}`)
    
}