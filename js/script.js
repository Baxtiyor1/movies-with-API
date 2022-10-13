const elMenu = getElem('.film__menu');
const elForm = getElem('#form');
const elSearch = getElem('#search', elForm);
const elFilter = getElem('#film__filter', elForm);
const elBtn = getElem('#btn', elForm);
const elTemplate = getElem('#template').content;
const header = getElem('.header');

// key
let KEY = '58ed228a'

// render movies
function renderMovies(array, element){
    element.innerHTML = null
    array.forEach(movie =>{
        const cloneTemplate = elTemplate.cloneNode(true);
        
        let elImg = getElem('.film__pic', cloneTemplate)
        elImg.setAttribute('src', movie.Poster)
        elImg.onerror = (e) => e.target.src = 'http://via.placeholder.com/150?text=Img+not+found';
        getElem('.film__card--title', cloneTemplate).textContent = movie.Title
        getElem('.film__realise--date', cloneTemplate).textContent = movie.Year
        getElem('.film__realise--date', cloneTemplate).datetime = movie.Year
        
        element.appendChild(cloneTemplate);
    })
}
let inputvalue = elSearch.value.trim()

// function prevBtn disabled
function btnPage(pageCount, element){
    if(pageCount <= 1){
        element.disabled = true
        element.style.opacity = 0.5
    }else{
        element.disabled = false
        element.style.opacity = 1
    }
}
// function nextBtn disabled
function nextBtn(pageCount, number, element){
    if(pageCount >= number/10){
        element.disabled = true
        element.style.opacity = 0.5
    }else{
        element.disabled = false
        element.style.opacity = 1
    }
}


//buttons
const elPrevBtn = getElem('.buttom__prev');
const elNextBtn = getElem('.button__next');
const elPageList = getElem('.buttom__number--pages');
let pageCount = 1 //totalResults
elNextBtn.addEventListener('click', ()=>{
    pageCount++
    fetchMovies(KEY, inputvalue, pageCount)
    
    // prevBtn disabled
    btnPage(pageCount, elPrevBtn)
    nextBtn(pageCount, pageAmount, elNextBtn)
    console.log(pageAmount);
})
elPrevBtn.addEventListener('click', ()=>{
    pageCount--
    fetchMovies(KEY, inputvalue, pageCount)
    
    // prevBtn disabled
    btnPage(pageCount, elPrevBtn)
    nextBtn(pageCount, pageAmount, elNextBtn)
})


// new elements
let dataSearch;

let pageAmount;
let filtervalue;

// prevBtn disabled
btnPage(pageCount, elPrevBtn)

// async function
async function fetchMovies(key, search, page){
    elMenu.innerHTML = '<img src="./img/Spinner.svg" alt="spinner">'
    let response = await fetch(`https://www.omdbapi.com/?apikey=${key}&s=${search}&page=${page}`)
    let data = await response.json()
    dataSearch = data.Search

    if(filtervalue === 'a_z'){
        dataSearch.sort((a, b) =>{
            if(a.Title > b.Title){
                return 1
            }else if(a.Title < b.Title){
                return -1
            }else{
                return 0
            }
            console.log('ok ')
        })
    }else if(filtervalue === 'z-a'){
        dataSearch.sort((b, a) =>{
            if(a.Title > b.Title){
                return 1
            }else if(a.Title < b.Title){
                return -1
            }else{
                return 0
            }
        })
    }else if(filtervalue === 'new_old'){
        dataSearch.sort((a, b) =>{
            if(a.Year > b.Year){
                return 1
            }else if(a.Year < b.Year){
                return -1
            }else{
                return 0
            }
        })
    }else if(filtervalue === 'old_new'){
        dataSearch.sort((b, a) =>{
            if(a.Year > b.Year){
                return 1
            }else if(a.Year < b.Year){
                return -1
            }else{
                return 0
            }
        })
    }

    pageAmount = data.totalResults;
    renderMovies(data.Search, elMenu)
    nextBtn(pageCount, data.totalResults, elNextBtn)
}
fetchMovies(KEY, inputvalue, pageCount)

// form 
elForm.addEventListener('submit', (e) => {
    e.preventDefault();
    pageCount = 1

    // if(filtervalue === 'a_z'){
    //     dataSearch.sort((a, b) =>{
    //         if(a.Title > b.Title){
    //             return 1
    //         }else if(a.Title < b.Title){
    //             return -1
    //         }else{
    //             return 0
    //         }
    //         console.log('ok ')
    //     })
    // }else if(filtervalue === 'z-a'){
    //     dataSearch.sort((b, a) =>{
    //         if(a.Title > b.Title){
    //             return 1
    //         }else if(a.Title < b.Title){
    //             return -1
    //         }else{
    //             return 0
    //         }
    //     })
    // }else if(filtervalue === 'new_old'){
    //     dataSearch.sort((a, b) =>{
    //         if(a.Year > b.Year){
    //             return 1
    //         }else if(a.Year < b.Year){
    //             return -1
    //         }else{
    //             return 0
    //         }
    //     })
    // }else if(filtervalue === 'old_new'){
    //     dataSearch.sort((b, a) =>{
    //         if(a.Year > b.Year){
    //             return 1
    //         }else if(a.Year < b.Year){
    //             return -1
    //         }else{
    //             return 0
    //         }
    //     })
    // }
    
    inputvalue = elSearch.value.trim();
    filtervalue = elFilter.value.trim();
    
    fetchMovies(KEY, inputvalue, pageCount)
})
