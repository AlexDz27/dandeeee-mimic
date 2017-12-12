const HOST = "http://localhost:9000";

import axios from 'axios'

export default class API {

    /**
     * GET / - fetching todos from the server
     */
    static loadTodosDataFromServer() {
        axios.get(HOST)
            .catch(err => console.error(err))
    }

}