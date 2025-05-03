export const httpGet = (endpoint: string): Promise<Response | undefined> => {
    return fetch(endpoint)
        .then(res => {
            if(res.ok)
                return res
            return undefined
        })
        .catch(err => {
            console.log(err)
            return undefined
        })
}