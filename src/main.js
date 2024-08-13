import { fetchImages } from "./js/pixabay-api.js";
import { clearGallery, renderImages } from "./js/render-functions.js";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

// Получаем элементы из DOM
const searchForm = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('.load-more-btn');

let currentQuery = '';
let currentPage = 1;
let totalHits = 0;

// Инициализация SimpleLightbox для отображения изображений
let lightbox = new SimpleLightbox('.gallery a', {});

// Обработчик события отправки формы
searchForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    currentQuery = event.currentTarget.elements.query.value.trim();

    // Проверка или поле ввода не пустое
    if (currentQuery === '') {
        iziToast.error({ message: 'Please enter a search term.' });
        return;
    }

    // Сброс номера страницы и очистка галереи для нового поиска
    currentPage = 1;
    clearGallery(gallery);
    loadMoreBtn.style.display = 'none';

    // Загрузка изображений (передаем false, чтобы не выполнять прокрутку)
    await loadImages(false);
});

// Обработчик клика по кнопке "Load more"
loadMoreBtn.addEventListener('click', async () => {
    // Загрузка дополнительных изображений
    await loadImages(true);
});

// Функция для загрузки изображений
async function loadImages(scrollPage = true) {
    // Показать индикатор загрузки и скрыть кнопку "Load more"
    loader.style.display = 'block';
    loadMoreBtn.style.display = 'none';

    try {
        // Выполнение запроса к API Pixabay
        const data = await fetchImages(currentQuery, currentPage);

        // Проверка или есть результаты
        if (data.hits.length === 0 && currentPage === 1) {
            iziToast.info({ message: 'Sorry, there are no images matching your search query. Please try again!' });
        } else {
            // Отображение изображений и обновление галереи
            renderImages(data.hits, gallery);
            lightbox.refresh();
            currentPage++;
            totalHits = data.totalHits;

            // Проверка или достигнут конец коллекции
            if (gallery.children.length >= totalHits) {
                loadMoreBtn.style.display = 'none';
                iziToast.info({ message: "We're sorry, but you've reached the end of search results." });
            } else {
                loadMoreBtn.style.display = 'block';
            }

            // Плавная прокрутка страницы
            if (scrollPage) {
                const cardHeight = gallery.firstElementChild.getBoundingClientRect().height;
                window.scrollBy({
                    top: cardHeight * 2,
                    behavior: 'smooth',
                });
            }
        }
    } catch (error) {
        iziToast.error({ message: error.message });
    } finally {
        // Скрыть индикатор загрузки
        loader.style.display = 'none';
    }
}