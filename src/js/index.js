// Global app controller
import Search from './models/Search';

/** Global app state
 * - Search object
 * - Current recipe object
 * - Shopping list object
 * - Favorite recipe object
 * */
const state = {};

const controlSearch = async () => {
    // 1. get data from view
    const query = 'pasta';

    if (query) {
        // 2. create new Search object
        state.search = new Search(query);

        // 3. set UI for results

        // 4. provide search
        await state.search.getResult();

        console.log(state.search.result);
    }
};

// Set events
document.querySelector('.search').addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});