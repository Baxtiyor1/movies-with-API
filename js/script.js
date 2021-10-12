const elMenu = getElem('.film__menu');
const elForm = getElem('#form');
const elSearch = getElem('#search', elForm);
const elFilter = getElem('#film__filter', elForm);
const elBtn = getElem('#btn', elForm);
const elTemplate = getElem('#template').content;
const header = getElem('.header');

// key
let KEY = '58ed228a'

// API array
let moviesArray = []

// render movies
function renderMovies(array, element){
    element.innerHTML = null
    array.forEach(movie =>{
        const cloneTemplate = elTemplate.cloneNode(true);
        
        let elImg = getElem('.film__pic', cloneTemplate)
        elImg.setAttribute('src', movie.Poster)
        elImg.onerror = (e) => e.target.src = 'https://via.placeholder.com/150?text=Img+not+found';
        getElem('.film__card--title', cloneTemplate).textContent = movie.Title
        getElem('.film__realise--date', cloneTemplate).textContent = movie.Year
        getElem('.film__realise--date', cloneTemplate).datetime = movie.Year
        
        element.appendChild(cloneTemplate);
    })
}
let inputvalue =''

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


//buttons
const elPrevBtn = getElem('.buttom__prev');
const elNextBtn = getElem('.button__next');
const elPageList = getElem('.buttom__number--pages');
let pageCount = 0 //totalResults
elNextBtn.addEventListener('click', ()=>{
    pageCount++
    fetchMovies(KEY, inputvalue, pageCount)

    // prevBtn disabled
    btnPage(pageCount, elPrevBtn)
})
elPrevBtn.addEventListener('click', ()=>{
    pageCount--
    fetchMovies(KEY, inputvalue, pageCount)
    
    // prevBtn disabled
    btnPage(pageCount, elPrevBtn)
})

// prevBtn disabled
btnPage(pageCount, elPrevBtn)

// async function
async function fetchMovies(key, search, page){
    elMenu.innerHTML = '<img src="./img/Spinner.svg" alt="spinner">'
    let response = await fetch(`http://www.omdbapi.com/?apikey=${key}&s=${search}&page=${page}`)
    let data = await response.json()
    renderMovies(data.Search, elMenu)
    console.log(data)
}
fetchMovies(KEY, 'someting', pageCount)

// form 
elForm.addEventListener('submit', (e) => {
    e.preventDefault();
    pageCount = 1
    
    inputvalue = elSearch.value.trim();
    const filtervalue = elFilter.value.trim();
    
    fetchMovies(KEY, inputvalue, pageCount)
})




// moviesArray.forEach(movie =>{
//     // filter movies
//      if(filtervalue === 'a_z'){
//         movie.sort((a, b) =>{
//              if(a.Title > b.Title){
//                  return 1
//              }else if(a.Title < b.Title){
//                  return -1
//              }else{
//                  return 0
//              }
//          })
//          console.log(moviesArray)
//      }else if(filtervalue === 'z-a'){
//         movie.sort((b, a) =>{
//              if(a.Title > b.Title){
//                  return 1
//              }else if(a.Title < b.Title){
//                  return -1
//              }else{
//                  return 0
//              }
//          })
//      }else if(filtervalue === 'new_old'){
//         movie.sort((a, b) =>{
//              if(a.Year > b.Year){
//                  return 1
//              }else if(a.Year < b.Year){
//                  return -1
//              }else{
//                  return 0
//              }
//          })
//      }else if(filtervalue === 'old_new'){
//         movie.sort((b, a) =>{
//              if(a.Year > b.Year){
//                  return 1
//              }else if(a.Year < b.Year){
//                  return -1
//              }else{
//                  return 0
//              }
//          })
//      }