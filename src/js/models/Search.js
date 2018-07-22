
export default class Search {
    constructor(query) {
        this.query = query;
        this.result = {};
    }

    async getResult() {
        const key = 'f2921dcb2f08b83f562205ecdf276238';
        try {
            const res = await fetch(`https://cors-anywhere.herokuapp.com/http://food2fork.com/api/search?key=${key}&q=${this.query}`);
            const data = await res.json();

            return this.result = data.recipes;
        } catch (err) {
            console.log(err);
        }
    }
}