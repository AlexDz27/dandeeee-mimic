import axios from 'axios'

export default class API {

    /**
     * GET / - fetching todos from the server
     */
    static loadTodosDataFromServer(path: string) {
        return axios.get(path)
            .catch(err => console.error(err))
    }

}