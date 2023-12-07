let newsAPI = {
    search: async function(term){
        let auth = localStorage.getItem('auth')
        const dataGET = {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + auth
            },
        }
        try {
            const resposta = await fetch(process.env.REACT_APP_BACKEND_NEWS_URL+'?term='+term, dataGET)
            if (!resposta.ok) {
                throw new Error(`HTTP error! status: ${resposta.status}`);
            }
            return await resposta.json()
        } catch (error) {
            console.error('There was a problem with the fetch operation: ', error);
        }
        /*
        const resposta = await fetch('https://images-api.nasa.gov/search?q='+text+'&page='+page+'&page_size=4', dataGET)
        return await resposta.json()
        */
    },
    insert: async function(title, image){
        let auth = localStorage.getItem('auth')
        const data = {
            method: 'POST',
            headers: {
                'Content-type': 'application/json', 
                'Authorization': 'Bearer ' + auth
            },
            body: JSON.stringify({title: title, image: image})
        }
        const resposta = await fetch(process.env.REACT_APP_BACKEND_NEWS_URL, data)
        return await resposta.json()
    },
}

export default newsAPI