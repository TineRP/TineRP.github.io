/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */

function allowDrop(ev) {
  ev.preventDefault();
}

function drop(ev) {
  ev.preventDefault();
  //var data = ev.dataTransfer.getData("text");
  //ev.target.appendChild(document.getElementById(data));
  
  var reader = new FileReader();
  reader.onload = e => {
      // Fill the image & call predict.
      let img = document.createElement('img');
      img.src = e.target.result;
      img.width = IMAGE_SIZE;
      img.height = IMAGE_SIZE;
      img.onload = () => predict(img);

    };
  
  //reader.onload = function(e){
  //  var dropdata = new Uint8Array(e.target.result);
  //};
  //reader.readAsText(e.dataTransfer.files[0]);  // If text 
  reader.readAsDataURL(ev.dataTransfer.files[0]); // If binary
}

//import * as tf from '@tensorflow/tfjs';

import {IMAGENET_CLASSES} from './my_classes.js';

const MOBILENET_MODEL_PATH = './mobilenet/model.json';
    // tslint:disable-next-line:max-line-length
    //'https://storage.googleapis.com/tfjs-models/tfjs/mobilenet_v1_0.25_224/model.json';

const IMAGE_SIZE = 224;
const TOPK_PREDICTIONS = 3;

let mobilenet;
const mobilenetDemo = async () => {
  //status('Loading model...');

  mobilenet = await tf.loadLayersModel(MOBILENET_MODEL_PATH);

  // Warmup the model. This isn't necessary, but makes the first prediction
  // faster. Call `dispose` to release the WebGL memory allocated for the return
  // value of `predict`.
  mobilenet.predict(tf.zeros([1, IMAGE_SIZE, IMAGE_SIZE, 3])).dispose();

  //status('');

  document.getElementById('file-container').style.display = '';
};



/**
 * Given an image element, makes a prediction through mobilenet returning the
 * probabilities of the top K classes.
 */
async function predict(imgElement) {
  //status('Predicting...');

  // The first start time includes the time it takes to extract the image
  // from the HTML and preprocess it, in additon to the predict() call.
  const startTime1 = performance.now();
  // The second start time excludes the extraction and preprocessing and
  // includes only the predict() call.
  let startTime2;
  const logits = tf.tidy(() => {
    // tf.browser.fromPixels() returns a Tensor from an image element.
    const img = tf.browser.fromPixels(imgElement).toFloat();

    const offset = tf.scalar(127.5);
    // Normalize the image from [0, 255] to [-1, 1].
    const normalized = img.sub(offset).div(offset);

    // Reshape to a single-element batch so we can pass it to predict.
    const batched = normalized.reshape([1, IMAGE_SIZE, IMAGE_SIZE, 3]);

    startTime2 = performance.now();
    // Make a prediction through mobilenet.
    return mobilenet.predict(batched);
  });

  // Convert logits to probabilities and class names.
  const classes = await getTopKClasses(logits, TOPK_PREDICTIONS);
  const totalTime1 = performance.now() - startTime1;
  const totalTime2 = performance.now() - startTime2;
  //status(`Done in ${Math.floor(totalTime1)} ms ` +
    //  `(not including preprocessing: ${Math.floor(totalTime2)} ms)`);

  localStorage.setItem('modelPrediction', JSON.stringify(classes));

  // Show the classes in the DOM.
  showResults(imgElement, classes);
}

/**
 * Computes the probabilities of the topK classes given logits by computing
 * softmax to get probabilities and then sorting the probabilities.
 * @param logits Tensor representing the logits from MobileNet.
 * @param topK The number of top predictions to show.
 */
export async function getTopKClasses(logits, topK) {
  const values = await logits.data();

  const valuesAndIndices = [];
  for (let i = 0; i < values.length; i++) {
    valuesAndIndices.push({value: values[i], index: i});
  }
  valuesAndIndices.sort((a, b) => {
    return b.value - a.value;
  });
  const topkValues = new Float32Array(topK);
  const topkIndices = new Int32Array(topK);
  for (let i = 0; i < topK; i++) {
    topkValues[i] = valuesAndIndices[i].value;
    topkIndices[i] = valuesAndIndices[i].index;
  }

  const topClassesAndProbs = [];
  for (let i = 0; i < topkIndices.length; i++) {
    topClassesAndProbs.push({
      className: IMAGENET_CLASSES[topkIndices[i]],
      probability: topkValues[i],
    })
  }

  

  return topClassesAndProbs;
}

//
// UI
//

// Mapping whether the mushroom is edible, non-edible or poisonous
//const edible = {}
//edible["Boletus_edulis"] = ["Spiselig","skov","tid","Brun"]
//edible["Tylopilus_felleus"] = ["Uspiselig","skov","tid","Gul"]

// spiselighed, sted, tid, farve på hat, underside af hat, stok, lugt, smag, andet
const information = {}
information["Penny bun"] = ["Edible", "deciduous,coniferous","jul,aug,sep,oct","Brown","Pores","Covered with a light-colored netted pattern","Nutty", "Mild","Hat is slimy"]
information["Bitter bolete"] = ["Inedible", "deciduous,coniferous","jun,jul,aug,sep,oct","Brown", "Pores","Covered with a dark green netted pattern","No distinct smell", "Bitter", ""]
information["Summer bolete"] = ["Edible","deciduous","jun,jul,aug,sep,oct,nov","Brown", "Pores","Covered with a light brown netted pattern", "Earthy", "Mild", "Hat is dry"]
information["Devil's bolete"] = ["Poisonous","deciduous","jul,aug,sep","White","Pores","Red", "Unpleasant rotten smell", "No distinct taste", "When pressed, the mushroom turns greenish/bluish"]
information["Chanterelle"] = ["Edible","deciduous,coniferous","jun,jul,aug,sep,oct,nov","Yellow","Ridges","Yellow", "Fruity apricot aroma", "Bitter", "The entire mushroom is the same yellowish color"]
information["False chanterelle"] = ["Inedible","coniferous","sep,oct,nov","Orange","Gills","Orange","No distinct smell", "No distinct taste", "The cap feels like velvet"]
information["Cantharellus pallens"] = ["Edible","deciduous","jun,jul,aug,sep,oct", "Pale yellow","Gills","Light","Fruity apricot aroma", "Bitter", ""]
information["Oyster mushroom"] = ["Edible","deciduous,coniferous","jan,feb,mar,apr,maj,jun,jul,aug,sep,oct,nov,dec","Gray or grayish brown", "Gills", "The gills continue down on the stem","Slight anise smell", "Mild", "Grows on trees"]
information["Sarcomyxa serotina"] = ["Inedible","deciduous","oct,nov,dec,jan,feb,mar","Olive green or yellowish brown","Gills","Yellowish","No distinct smell", "Bitter", "Grows on trees"]
information["Pale oyster"] = ["Edible","deciduous","maj,jun,jul,aug,sep,oct","Brown","Gills","Creme","No distinct smell", "Mild", "Grows on trees"]
information["Angel's wings"] = ["Poisonous","coniferous","aug,sep,oct,nov","Chalk white","Gills","Chalk white","No distinct smell", "No distinct taste", "Grows on trees"]
information["Wood hedgehog"] = ["Edible", "deciduous", "aug,sep,oct,nov","Creme","Teeth","Creme", "No distinct smell", "Bitter", ""]
information["Depressed hedgehog"] = ["Edible", "deciduous", "aug,sep,oct,nov,dec,jan","Orangish yellow to abricot orange", "Teeth","Light", "No distinct smell", "Bitter", "The cap has a belly button-like center"]
information["Sarcodon squamosus"] = ["Inedible", "coniferous", "jun,jul,aug,sep,oct","Dark purple scales with a brownish background", "Teeth","Pale", "No distinct smell", "Bitter", ""]
information["Dryad's saddle"] = ["Edible", "deciduous", "apr,maj,jun,jul,aug,sep","Brownish scales with a whitish background","Pores","Dark", "Slightly of watermelon", "No distinct taste", ""]
information["Field mushroom"] = ["Edible", "grass", "jul,aug,sep,oct","White", "Pores", "White with a thin ring","No distinct smell", "Tastes like a supermarket-mushroom", ""]
information["Horse mushroom"] = ["Edible", "grass", "jun,jul,aug,sep,oct","White","Gills", "White with a thin ring", "Anise","Tastes like a supermarket-mushroom", "When pressed, the mushroom turns yellow"]
information["Yellow stainer"] = ["Poisonous", "deciduous,coniferous", "jul,aug,sep,oct","White","Gills", "White but yellow at the base of the stem","Chemical smell", "Chemical taste", "When pressed, the mushroom turns yellow"]
information["Common puffball"] = ["Edible", "deciduous,coniferous", "aug,sep,oct","White and covered with spikes","The cap is shaped like a ball, which means the underside is the same as the cap","White","No distinct smell","Mild", "Only edible if the meat is white"]

localStorage.setItem("nonFilteredInformation", JSON.stringify(information))
// Function to filter information based on classes
function filterInformationByClasses(information, classes) {
  const filteredInformation = {};
  for (let i = 0; i < classes.length; i++) {
    for (const className in information) {
      if (classes[i].className == className){
        filteredInformation[className] = information[className];
      }
    }
  }
  return filteredInformation;
}


const icon = {}
icon["Edible"] = "😀"
icon["Inedible"] = "😒"
icon["Poisonous"] = "☠️"

function showResults(imgElement, classes) {
  const predictionContainer = document.createElement('div');
  predictionContainer.className = 'pred-container';

  const imgContainer = document.createElement('div');
  imgContainer.appendChild(imgElement);
  predictionContainer.appendChild(imgContainer);

  const probsContainer = document.createElement('div');
  for (let i = 0; i < classes.length; i++) {
    const row = document.createElement('div');
    row.className = 'row';

    const classElement = document.createElement('div');
    classElement.className = 'cell';

    // Create link to information 
    const link = document.createElement('a');
    link.textContent = classes[i].className;
    link.href = '../information/information.html'

    link.addEventListener('click', function(event) {
      localStorage.setItem('clickedMushroom', JSON.stringify(classes[i].className))
    });

    classElement.appendChild(link);
    classElement.id="links"
    row.appendChild(classElement);

    const probsElement = document.createElement('div');
    probsElement.className = 'cell';
    probsElement.innerText = classes[i].probability.toFixed(3);
    row.appendChild(probsElement);

    const edibilityElement = document.createElement('div');
    edibilityElement.className = 'cell';
    edibilityElement.innerText = icon[information[classes[i].className][0]]
    row.appendChild(edibilityElement);

    probsContainer.appendChild(row);
  }

  const iconTranslation = document.createElement('div');
  iconTranslation.innerText = "Edible = 😀 Inedible = 😒 Poisonous = ☠️";
  iconTranslation.style.fontSize = "11px";
  iconTranslation.style.textAlign = "left";

  iconTranslation.id = "iconTranslation"


  probsContainer.appendChild(document.createElement('br'));
  probsContainer.appendChild(iconTranslation)
  

  predictionContainer.appendChild(probsContainer);

  predictionsElement.insertBefore(
      predictionContainer, predictionsElement.firstChild);

  const files = document.getElementById('file-container');
  files.style.display = "none";    

  predictionContainer.style.margin = "auto";

  const eftertjekButton = document.createElement('button');
  eftertjekButton.id = "eftertjekButton";
  eftertjekButton.innerText = "Identify";
  eftertjekButton.style.width = IMAGE_SIZE + "px";
  eftertjekButton.addEventListener('click', function() {
    
  
  
  

    // Open new page
    window.location.href = 'check1-environment/environment.html'
});
  const tekst = document.createElement('p');
  tekst.style.width = IMAGE_SIZE + "px";
  tekst.style.wordBreak = 'break-word'
  tekst.style.fontSize =  '12.5px' ;
  tekst.textContent = "This prediction alone should not be trusted. Press the identify button and go through the questions to get a confident prediction."  
  

  const filteredInformation = filterInformationByClasses(information, classes);
      

  //Save classes and relevant information in local storage
  localStorage.setItem('information', JSON.stringify(filteredInformation))

  predictionsElement.appendChild(document.createElement('br'));
  predictionsElement.appendChild(eftertjekButton);
  predictionsElement.appendChild(tekst);
}

const filesElement = document.getElementById('files');
filesElement.addEventListener('change', evt => {
  let files = evt.target.files;
  // Display thumbnails & issue call to predict each image.
  for (let i = 0, f; f = files[i]; i++) {
    // Only process image files (skip non image files)
    if (!f.type.match('image.*')) {
      continue;
    }
    let reader = new FileReader();
    const idx = i;
    // Closure to capture the file information.
    reader.onload = e => {
      // Fill the image & call predict.
      let img = document.createElement('img');
      img.src = e.target.result;
      img.width = IMAGE_SIZE;
      img.height = IMAGE_SIZE;
      img.onload = () => predict(img);
    };

    // Read in the image file as a data URL.
    reader.readAsDataURL(f);
  }
});

//const demoStatusElement = document.getElementById('status');
//const status = msg => demoStatusElement.innerText = msg;

const predictionsElement = document.getElementById('predictions');

//const dropfieldElement = document.getElementById('div1');
//dropfieldElement.addEventListener("dragenter", allowDrop, false);
//dropfieldElement.addEventListener("dragover", allowDrop, false);
//dropfieldElement.addEventListener("drop", drop, false);

document.addEventListener('DOMContentLoaded', function () {
  const burgerIcon = document.querySelector('.burger-icon');
  const menuItems = document.querySelector('.menu-items');

  burgerIcon.addEventListener('click', function () {
    menuItems.classList.toggle('show');
  });
});

const submenuItems = document.querySelectorAll('.submenu a');


submenuItems.forEach(submenuItem => {
  submenuItem.addEventListener('click', function() {
    localStorage.setItem("clickedMushroom", JSON.stringify(submenuItem.textContent));
  });
});

document.addEventListener('DOMContentLoaded', function () {
  const burgerIcon = document.querySelector('.burger-icon');
  const menuItems = document.querySelector('.menu-items');
  const speciesMenuItem = document.getElementById('species-menu');
  const submenu = document.querySelector('.submenu');
  submenu.style.display = 'none';
  menuItems.style.display = 'none';
 

  burgerIcon.addEventListener('click', function () {  
    menuItems.style.display = menuItems.style.display === 'none' ? 'block' : 'none';
  });

  speciesMenuItem.addEventListener('click', function (event) {
  const submenu = this.nextElementSibling;
  submenu.style.display = submenu.style.display === 'none' ? 'block' : 'none'; 
  });
});


mobilenetDemo();



