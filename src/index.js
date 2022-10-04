// import './css/styles.css';
// import { Notify } from 'notiflix/build/notiflix-notify-aio';
// import SimpleLightbox from "simplelightbox";
// import "simplelightbox/dist/simple-lightbox.min.css";
// import ApiService from './js/api-service';
// import renderImgMarkup from './js/markupImg'
// import getRefs from './js/get_refs';

// let totalPages = 0;
// // делаем экземпляр класса
// const apiService = new ApiService();

// const refs = getRefs();

// refs.loadMoreBtn.addEventListener('click', loadMore);
// refs.searchForm.addEventListener('submit', onSearch);
// refs.loadMoreBtn.classList.add('is-hidden');

// // ф-я отправки формы==================================== 1
// function onSearch(event) {
//     event.preventDefault();
//     clearMarkupImg();
//     apiService.resetPage();
    
//     apiService.searchQueryInp = event.currentTarget.elements.searchQuery.value;
//     if (apiService.searchQueryInp.trim() === '') {
//     return  Notify.failure("Sorry, there are no images matching your search query. Please try again.")
//     }
    
//     apiService.fetchImages().then(data => {
//       refs.loadMoreBtn.classList.remove('is-hidden');
//        Notify.success(`Hooray! We found totalHits ${data.totalHits} images!`)
//         appendMarkupImg(data);
//     });
//     // refs.loadMoreBtn.classList.add('is-hidden');
// }

// // ф-я, которая подгружает новые картинки================== 2
// function loadMore() {
//     apiService.increasePage();
//     apiService.fetchImages().then(data => {
//         appendMarkupImg(data);
//     });
// }

// // вызов ф-ии appendMarkupImg,
// //  которая добавляет в дом - дерево  разметку============== 3
// function appendMarkupImg(data) {
//     totalPages = Math.ceil(data.totalHits / 40)
    
//     console.log(`${apiService.currentpage} = ${totalPages}`);

//     if (apiService.currentpage === totalPages) {

//         setTimeout(() => {
//         refs.loadMoreBtn.classList.add('is-hidden');
//     }, 500)
 
//           Notify.info("We're sorry, but you've reached the end of search results.");
//     }
//     refs.itemsGallery.insertAdjacentHTML('beforeend', renderImgMarkup(data))
//     new SimpleLightbox('.gallery a');
// }

// // ф-я очистки разметки ==================================== 4
//     function clearMarkupImg() {
//         refs.itemsGallery.innerHTML = '';
//     }






// //===================================================================
// // ЧЕРЕЗ ASIC AWAIT-=-=-=-=-=-=-=-=-=-=-=-=-==-=-=-=-=-=-=-=-=-=--=-=
// import './css/styles.css';
// import { Notify } from 'notiflix/build/notiflix-notify-aio';
// import SimpleLightbox from "simplelightbox";
// import "simplelightbox/dist/simple-lightbox.min.css";
// import ApiService from './js/api-service';
// import renderImgMarkup from './js/markupImg'
// import getRefs from './js/get_refs';

// const refs = getRefs();
// let totalPages = 0;
// // делаем экземпляр класса
// const apiService = new ApiService();

// refs.loadMoreBtn.addEventListener('click', loadMore);
// refs.searchForm.addEventListener('submit', onSearch);
// refs.loadMoreBtn.classList.add('is-hidden');

// // ф-я отправки формы==================================== 1
// async function onSearch(event) {
//     try {
//     event.preventDefault();
//     clearMarkupImg();
//     apiService.resetPage();
    
//     apiService.searchQueryInp = event.currentTarget.elements.searchQuery.value;
//     if (apiService.searchQueryInp.trim() === '') {
//     return  Notify.failure("Sorry, there are no images matching your search query. Please try again.")
//     }
    
//     const onSearchImages = await apiService.fetchImages();
//       refs.loadMoreBtn.classList.remove('is-hidden');
//     Notify.success(`Hooray! We found totalHits ${onSearchImages.totalHits} images!`)
//       appendMarkupImg(onSearchImages);
    
//     } catch (error) {
//     console.log(error);
// }
// }

// // ф-я, которая подгружает новые картинки================== 2
// async function loadMore() {
//     try {
//         apiService.increasePage();
//         const getMoreImages = await apiService.fetchImages();
//         appendMarkupImg(getMoreImages);
//     }
//     catch (error) {
//         console.log(error);
//     }
// }

// // ф-я appendMarkupImg,
// //  которая добавляет в дом - дерево  разметку============== 3
// function appendMarkupImg(data) {
//     totalPages = Math.ceil(data.totalHits / 40)
//     // console.log(`${apiService.currentpage} = ${totalPages}`);
//     if (apiService.currentpage === totalPages) {

//         setTimeout(() => {
//         refs.loadMoreBtn.classList.add('is-hidden');
//     }, 500)
 
//           Notify.info("We're sorry, but you've reached the end of search results.");
//     }
//     refs.itemsGallery.insertAdjacentHTML('beforeend', renderImgMarkup(data))
//     new SimpleLightbox('.gallery a');
// }
// // ф-я очистки разметки ==================================== 4
//     function clearMarkupImg() {
//         refs.itemsGallery.innerHTML = '';
//     }

















// ИНФИНИТ СКРОЛЛ===========================================================
import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import ApiService from './js/api-service';
import renderImgMarkup from './js/markupImg'
import getRefs from './js/get_refs';

let totalPages = 0;
// делаем экземпляр класса
const apiService = new ApiService();

const refs = getRefs();
refs.searchForm.addEventListener('submit', onSearch);

// ф-я отправки формы==================================== 1
function onSearch(event) {
    event.preventDefault();
    clearMarkupImg();
    apiService.resetPage();
    
    apiService.searchQueryInp = event.currentTarget.elements.searchQuery.value;
    if (apiService.searchQueryInp.trim() === '') {
    return  Notify.failure("Sorry, there are no images matching your search query. Please try again.")
    }
    
    apiService.fetchImages().then(data => {
       Notify.success(`Hooray! We found totalHits ${data.totalHits} images!`)
        appendMarkupImg(data);
    });  
}

// вызов ф-ии appendMarkupImg,
//  которая добавляет в дом - дерево  разметку============== 3
function appendMarkupImg(data) {
    totalPages = Math.ceil(data.totalHits / 40)
    // console.log(`${apiService.currentpage} = ${totalPages}`);
    if (apiService.currentpage === totalPages) {
 
          Notify.info("We're sorry, but you've reached the end of search results.");
    }
    refs.itemsGallery.insertAdjacentHTML('beforeend', renderImgMarkup(data))
    new SimpleLightbox('.gallery a');
}

// ф-я очистки разметки ==================================== 4
function clearMarkupImg() {
        refs.itemsGallery.innerHTML = '';
    }



// коллбэк для обсервера
const onEntry = entries => {
    // entry - это наш каждый последующий объект пересечения - наша галлерея,
    // в которою будут подгружаться новые изображения - как тоолько наш целевой элемент пересекает наш root
    entries.forEach(entry => {
       
        // условие: entry.isIntersecting - это если наш блок галлереи пересекается
        // нашим целевым елементом - то есть true, то делается запрос на сервер
        // при уловии, что в инпуте не пустая строка (если пуста, то запрос не делаем)
        if (entry.isIntersecting && apiService.searchQueryInp.trim() !== '') {
    
            apiService.fetchImages().then(data => {
                appendMarkupImg(data);
                apiService.increasePage();
    });    
        }
    })
};
// допнастройки для обсервера 
const options = {
    rootMargin: '1200px',
};

// Регистрация обсервера================================5
const observer = new IntersectionObserver(onEntry, options);
// указываем обсерверу, за каким элементом ему следить
observer.observe(refs.sentinel);