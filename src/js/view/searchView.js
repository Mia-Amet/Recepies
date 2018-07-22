import { elements } from "./base";

export const getSearchInputValue = () => elements.searchInput.value;

export const clearForm = () => elements.searchForm.reset();

export const clearResults = () => {
    elements.searchResList.innerHTML = '';
    elements.searchResPages.innerHTML = '';
};

const renderRecipe = (recipe) => {
    const markup = `
    <li>
        <a class="results__link results__link--active" href="#${recipe.recipe_id}">
            <figure class="results__fig">
                <img src="${recipe.image_url}" alt="${recipe.title}">
            </figure>
            <div class="results__data">
                <h4 class="results__name">${recipe.title}</h4>
                <p class="results__author">${recipe.publisher}</p>
            </div>
        </a>
    </li>
    `;

    elements.searchResList.insertAdjacentHTML("afterbegin", markup);
};

const createBtn = (page, type) => {
    return `
    <button class="btn-inline results__btn--${type}" data-goto="${type === 'prev' ? page - 1 : page + 1}">
        <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
        </svg>
    </button>
    `;
};

const renderBtns = (page, numResult, resPerPage) => {
    // count pages
    const pages = Math.ceil(numResult / resPerPage);
    let btn;

    if (page === 1 && pages > 1) {
        // Next page btn
        btn = createBtn(page, 'next');
    } else if (page < pages) {
        // Next page & Prev page btns
        btn = `
        ${createBtn(page, 'prev')}
        ${createBtn(page, 'next')}
        `;
    } else if (page === pages) {
        // Prev page btn
        btn = createBtn(page, 'prev');
    }

    elements.searchResPages.insertAdjacentHTML("afterbegin", btn);
};

export const renderResult = (recipes, page = 1, resPerPage = 10) => {
    console.log(recipes);
    const start = (page - 1) * resPerPage;
    const end = page * resPerPage;

    // map recipe from array to renderRecipe
    recipes.slice(start, end).forEach(renderRecipe);

    renderBtns(page, recipes.length, resPerPage);
};