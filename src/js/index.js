// Global app controller
import Search from './models/Search';
import { elements, renderLoader, clearLoader } from "./view/base";
import * as searchView from './view/searchView';

/** Global app state
 * - Search object
 * - Current recipe object
 * - Shopping list object
 * - Favorite recipe object
 * */
const state = {};

const controlSearch = async () => {
    // 1. get data from view
    const query = searchView.getSearchInputValue();

    if (query) {
        // 2. create new Search object
        state.search = new Search(query);

        // 3. set UI for results
        searchView.clearForm();
        searchView.clearResults();
        renderLoader(elements.searchRes);

        // 4. provide search
        await state.search.getResult();

        // 5. render result
        searchView.renderResult(state.search.result);
        clearLoader();
    }
};

// Set events
elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});

elements.searchResPages.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline');

    if (btn) {
        const goToPage = parseInt(btn.dataset.goto);
        searchView.clearResults();
        searchView.renderResult(state.search.result, goToPage);
    }
});