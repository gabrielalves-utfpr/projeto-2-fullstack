let loginAPI = {
    login: async function(username, password){
        const data = {
            method: 'POST',
            headers: {
                'Content-type': 'application/json', 
            },
            body: JSON.stringify({username: username, password: password})
        }
        const resposta = await fetch('http://localhost:3000/login/', data)
        return await resposta.json()
    },
}

export default loginAPI