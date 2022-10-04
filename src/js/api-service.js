
const BASE_URL = 'https://pixabay.com/api/'
const API_KEY = '30104911-8e1ad95cd3a35152ba7eccb47'

// логика запроса на сервер в отдельном файле
export default class ApiService {
    constructor() {
        // можно записать и this.query = '' - без разницы (это не привязка к нашему инпуту
        // в HTML разметке)
        this.searchQueryInp = '';
        this.page = 1;
    }
    
    // Через THEN===============================================
    // fetchImages() {
    //     return fetch(`${BASE_URL}?key=${API_KEY}&q=${this.searchQueryInp}& image_type=photo
    //                  &orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`)
    //         .then(response => {
                
    //             if (!response.ok) {
    //         throw new Error(response.status);
    //             }
    //            return response.json() 
    //         })
    //         .then((data) => {
    //          return data;
    //      })
    // }
    

    // // Через async await===================================
        async fetchImages() {
           const serverRequest = await fetch(`${BASE_URL}?key=${API_KEY}&q=${this.searchQueryInp}& image_type=photo
        &orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`);
           if (!serverRequest.ok) {
               throw new Error(serverRequest.status);           
           }
        const data = await serverRequest.json();
        return data;
    }
    


    // ф-я, при которой любая текущая страница будет сбрасываться на 1
    resetPage() {
        this.page = 1;
    }

    get currentpage() {
        return this.page;
    }
    
    increasePage() {
        this.page += 1;
    }
}

