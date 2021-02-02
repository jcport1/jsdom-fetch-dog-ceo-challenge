console.log('%c HI', 'color: firebrick')
let breeds = [];
//add event listner on document load, add a callback function 
document.addEventListener('DOMContentLoaded', function () {
    loadImages(); 
    loadBreeds();
})



function loadImages() {

    const imgUrl = "https://dog.ceo/api/breeds/image/random/4" 
    fetch(imgUrl)
        .then(resp => resp.json())
        .then(data => {
            //iterate through w/ for each for the element image url info 
            //then call the function to add image 
            data.message.forEach(image => addImage(image))
        }); 
}

    function addImage(dogPicUrl) {
        //select the container
        let container = document.querySelector('#dog-image-container');
        //create an image element
        let newImageEl = document.createElement('img');
        //source for the image *i.e add the pic url to the img element
        newImageEl.src = dogPicUrl;
        //append the new image element to the container 
        container.appendChild(newImageEl); 
    }

    function loadBreeds() {

        const breedUrl = 'https://dog.ceo/api/breeds/list/all'
        fetch(breedUrl)
            .then(resp => resp.json())
            .then(data => {
                breeds = Object.keys(data.message);
                updateBreedList(breeds);
                addBreedSelectListener();
            });
    }

    function updateBreedList(breeds) {
        
        let ul = document.querySelector('#dog-breeds'); 
        removeChildren(ul); 
        breeds.forEach(breed => addBreed(breed));

    }

    function removeChildren(element) {
        let child = element.lastElementChild;
        while (child) {
            element.removeChild(child);
            child = element.lastElementChild;
        }
    }

    function selectBreedsStartingWith(letter) {
        updateBreedList(breeds.filter(breed => breed.startsWith(letter)));
    }

    function addBreedSelectListener() {
        let breedDropdown = document.querySelector('#breed-dropdown'); 
        breedDropdown.addEventListener('change', function (event) {
            selectBreedsStartingWith(event.target.value); 
        }); 
    }

    function addBreed(breed) {
        let ul = document.querySelector('#dog-breeds'); 
        let li = document.createElement('li');
        li.innerText = breed; 
        li.style.cursor = 'pointer';
        ul.appendChild(li); 
        li.addEventListener('click', updateColor);
    }

    function updateColor(event) {
        event.target.style.color = 'palevioletred';
    }