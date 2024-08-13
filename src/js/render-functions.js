// Функция для очистки галереи
export function clearGallery(galleryElement) {
    galleryElement.innerHTML = '';
}

// Функция для отображения изображений в галерее
export function renderImages(images, galleryElement) {

    // Создание разметки для каждого изображения
    const markup = images.map(({ 
        webformatURL, 
        largeImageURL, 
        tags, 
        likes, 
        views, 
        comments, 
        downloads 
    }) => {
        return `
            <li class="gallery-list-item">
                <a class="gallery-link" href="${largeImageURL}">
                    <img class="gallery-img" src="${webformatURL}" 
                        alt="${tags}" 
                        title="${tags}" />
                    <ul class="sub-list">
                        <li class="sub-list-item">
                            <b>Likes</b>
                            <p>${likes}</p>
                        </li>
                        <li class="sub-list-item">
                            <b>Views</b>
                            <p>${views}</p>
                        </li>
                        <li class="sub-list-item">
                            <b>Comments</b>
                            <p>${comments}</p>
                        </li>
                        <li class="sub-list-item">
                            <b>Downloads</b>
                            <p>${downloads}</p>
                        </li>
                    </ul>
                </a>
            </li>`;
    }).join('');

    // Добавление разметки в галерею
    galleryElement.insertAdjacentHTML('beforeend', markup);
}