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

refs.loadMoreBtn.addEventListener('click', loadMore);
refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.classList.add('is-hidden');

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
   
    refs.loadMoreBtn.classList.remove('is-hidden'); 
}

// ф-я, которая подгружает новые картинки================== 2
function loadMore() {
    apiService.increasePage();
    apiService.fetchImages().then(data => {
        appendMarkupImg(data); 
    });  
}

// вызов ф-ии appendMarkupImg,
//  которая добавляет в дом - дерево  разметку============== 3
function appendMarkupImg(data) {
    totalPages = Math.ceil(data.totalHits / 40)
    
    console.log(`${apiService.currentpage} = ${totalPages}`);

    if (apiService.currentpage === totalPages) {
        refs.loadMoreBtn.classList.add('is-hidden');
          Notify.info("We're sorry, but you've reached the end of search results.");
    }
    refs.itemsGallery.insertAdjacentHTML('beforeend', renderImgMarkup(data))
    new SimpleLightbox('.gallery a');
}

// ф-я очистки разметки ==================================== 4
    function clearMarkupImg() {
        refs.itemsGallery.innerHTML = '';
    }











































// import './css/styles.css';
// import { Notify } from 'notiflix/build/notiflix-notify-aio';
// import ApiService from './js/api-service';
// import renderImgMarkup from './js/markupImg'
// import getRefs from './js/get_refs';


// // делаем экземпляр класса
// const apiService = new ApiService();

// const refs = getRefs();

// refs.loadMoreBtn.addEventListener('click', loadMore);
// refs.searchForm.addEventListener('submit', onSearch);
// refs.loadMoreBtn.classList.add('is-hidden');

// function onSearch(event) {
//     reapitingHits = 40;
//     console.log(`${reapitingHits} - первый клик на Search`)
//     event.preventDefault();
//     // при сабмите формы очищаем всю старую разметку
//     clearMarkupImg();
//     // в наш наш обэект apiService при сабмите формы  в сеттер query передаем значение
//     // которе каждый раз будем вводить в интпут
//     apiService.searchQueryInp = event.currentTarget.elements.searchQuery.value;
//     if (apiService.searchQueryInp === '') {
//     return  Notify.failure("Sorry, there are no images matching your search query. Please try again.")
//     }

//     // при сабмите нашей формы мы обновляем page до 1
//     // это очень удобно, когда например, искали котов, а потом решили найти
//     // собак, и следовательно собаки должны отрендериться на 1й странице
//     apiService.resetPage();
//     // на экземпляре класса вызываем ф-ю запроса на сервер
//     // и как результат вернем промис ,
//     // и в случае удачного его выполнения получим массив из 40 объектов
//     // -> hits (40) [{…}, {…}, {…} ... {…}], вместо которого запишем ссылку
//     // на ф-ю appendMarkupImg
//     // apiService.fetchImages().then(hits => console.log(hits));
//     apiService.fetchImages().then(appendMarkupImg);
//     refs.loadMoreBtn.classList.remove('is-hidden');
    
// }


// function loadMore() {
//     apiService.fetchImages().then(appendMarkupImg => {
//         // console.log(appendMarkupImg);
//         reapitingHits += appendMarkupImg.hits.length;
//         console.log(`клик по load more ${reapitingHits}`);
    
//         if (reapitingHits > appendMarkupImg.totalHits) {
//             refs.loadMoreBtn.classList.add('is-hidden');
//             Notify.info("We're sorry, but you've reached the end of search results.");
//         }
        
//     });
// }

     
 
// // вызов ф-ии appendMarkupImg, которая добавляет в дом-дерево нашу разметку
// function appendMarkupImg(hits) {
//     // console.log(hits);
//     refs.itemsGallery.insertAdjacentHTML('beforeend', renderImgMarkup(hits))
        
// }

// function clearMarkupImg() {
//     refs.itemsGallery.innerHTML = '';
// }