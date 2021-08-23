'use strict';

let imgArray = [
    'wine-glass.jpg', 'water-can.jpg', 'unicorn.jpg',
    'tauntaun.jpg', 'sweep.png', 'shark.jpg', 'scissors.jpg',
    'pet-sweep.jpg', 'pen.jpg', 'dragon.jpg', 'dog-duck.jpg',
    'cthulhu.jpg', 'chair.jpg', 'bubblegum.jpg', 'breakfast.jpg',
    'boots.jpg', 'bathroom.jpg', 'banana.jpg', 'bag.jpg'];

let rounds = 25;
let conterRound = 0;

let imageContainer = document.getElementById('bussMallShow');
imageContainer.addEventListener('click',clickHandler);
let leftImg = document.getElementById('leftImg');
let leftIndex = 0;
let midImg = document.getElementById('middleImg');
let midIndex = 0;
let rightImg = document.getElementById('rightImg');
let rightIndex = 0;


let forbiddenIndecies = [];


function BussMallImages(imageName, imageSrc, shown = 0, clickedVotes = 0) {
    this.imageName = imageName;
    this.imagePath = imageSrc;
    this.shown = shown;
    this.clickedVotes = clickedVotes;
    BussMallImages.all.push(this);

}

BussMallImages.all = [];

function render() {

   do {
        leftIndex = getRandomNum(0, imgArray.length - 1);
        midIndex = getRandomNum(0, imgArray.length - 1);
        rightIndex = getRandomNum(0, imgArray.length - 1);

    } while (
        leftIndex == midIndex ||
        rightIndex == midIndex ||
        leftIndex == rightIndex ||
        forbiddenIndecies.includes(leftIndex) ||
        forbiddenIndecies.includes(midIndex) ||
        forbiddenIndecies.includes(rightIndex))

    forbiddenIndecies.push(leftIndex, midIndex, rightIndex);

    conterRound++;

    leftImg.src = '../img/' + BussMallImages.all[leftIndex].imagePath;
    midImg.src = '../img/' + BussMallImages.all[midIndex].imagePath;
    rightImg.src = '../img/' + BussMallImages.all[rightIndex].imagePath;
    
    BussMallImages.all[leftIndex].shown++;
    BussMallImages.all[midIndex].shown++;
    BussMallImages.all[rightIndex].shown++;

}

for (let i = 0; i < imgArray.length; i++) {
    new BussMallImages(imgArray[i].split('.')[0], imgArray[i]);
    
}
render();

function clickHandler(){


    
}




function getRandomNum(min, max) {
    return Math.random() * ((max - min + 1) + min);
}