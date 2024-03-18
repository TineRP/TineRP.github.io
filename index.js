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
  console.log(ev);
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
  console.log(ev);
}

//import * as tf from '@tensorflow/tfjs';

import {IMAGENET_CLASSES} from './my_classes.js';

const MOBILENET_MODEL_PATH = './mobilenet/model.json';
    // tslint:disable-next-line:max-line-length
    //'https://storage.googleapis.com/tfjs-models/tfjs/mobilenet_v1_0.25_224/model.json';

const IMAGE_SIZE = 224;
const TOPK_PREDICTIONS = 2;

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
const edible = {}
edible["Boletus_edulis"] = ["Spiselig","skov","tid","Brun"]
edible["Tylopilus_felleus"] = ["Uspiselig","skov","tid","Gul"]

// spiselighed, sted, tid, farve på hætte
const information = {}
information["Karl Johan"] = ["Spiselig", "løvskov,nåleskov","jul,aug,sep,okt","Brun"]
information["Galderørhat"] = ["Uspiselig", "løvskov,nåleskov","jun,jul,aug,sep,okt","Brun"]
information["Sommer Rørhat"] = ["Spiselig","løvskov","jun,jul,aug,sep,okt,nov","Brun"]
information["Satans Rørhat"] = ["Giftig","løvskov","jul,aug,sep","Hvid"]
information["Almindelig Kantarel"] = ["Spiselig","løvskov,nåleskov","jun,jul,aug,sep,okt,nov","Gul"]
information["Almindelig Orangekantarel"] = ["Uspiselig","nåleskov","sep,okt,nov","Orange"]
information["Bleg Kantarel"] = ["Spiselig","løvskov","jun,jul,aug,sep,okt", "Gul"]
information["Almindelig Østershat"] = ["Spiselig","løvskov,nåleskov","jan,feb,mar,apr,maj,jun,jul,aug,sep,okt,nov,dec","gråbrun"]
information["Gummihat"] = ["Upiselig","løvskov","okt,nov,dec,jan,feb,mar","Olivengrøn/gulbrun"]
information["Sommer Østershat"] = ["Spiselig","løvskov","maj,jun,jul,aug,sep,okt","Brun"]
information["Kridthat"] = ["Giftig","nåleskov","aug,sep,okt,nov","Kridhvid"]
information["Almindelig Pigsvamp"] = ["Spiselig", "løvskov", "aug,sep,okt,nov","Cremefarvet"]
information["Navle-Pigsvamp"] = ["Spiselig", "løvskov", "aug,sep,okt,nov,dec,jan","Gul"]
information["Småskællet Kødpigsvamp"] = ["Uspiselig", "nåleskov", "jun,jul,aug,sep,okt","Mørkelilla skæl på brunlig baggrund"]
information["Skællet Stilkporesvamp"] = ["Spiselig", "løvskov", "apr,maj,jun,jul,aug,sep","Brunlige skæl på hvidlig baggrund"]
information["Mark-Champignon"] = ["Spiselig", "græs", "jul,aug,sep,okt","Hvid"]
information["Ager-Champignon"] = ["Spiselig", "græs", "jun,jul,aug,sep,okt","Hvid"]
information["Karbol-Champignon"] = ["Giftig", "løvskov,nåleskov", "jul,aug,sep,okt","Hvid"]
information["Krystal-Støvbold"] = ["Spiselig", "løvskov,nåleskov", "aug,sep,okt","Hvid"]

// Function to filter information based on classes
function filterInformationByClasses(information, classes) {
  const filteredInformation = {};
  for (const className in information) {
      if (classes[className] != "undefined") {
          filteredInformation[className] = information[className];
      }
  }
  return filteredInformation;
}


const icon = {}
icon["Spiselig"] = "😀"
icon["Uspiselig"] = "😒"
icon["Giftig"] = "☠️"

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
    classElement.innerText = classes[i].className;
    row.appendChild(classElement);

    const probsElement = document.createElement('div');
    probsElement.className = 'cell';
    probsElement.innerText = classes[i].probability.toFixed(3);
    row.appendChild(probsElement);

    const edibilityElement = document.createElement('div');
    edibilityElement.className = 'cell';
    edibilityElement.innerText = icon[edible[classes[i].className]]
    row.appendChild(edibilityElement);

    probsContainer.appendChild(row);
  }

  const iconTranslation = document.createElement('div');
  iconTranslation.innerText = "Spiselig = 😀 Uspiselig = 😒 Giftig = ☠️";
  iconTranslation.style.fontSize = "11px";
  iconTranslation.style.textAlign = "left";

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
  eftertjekButton.innerText = "Eftertjek model";
  eftertjekButton.style.width = IMAGE_SIZE + "px";
  eftertjekButton.addEventListener('click', function() {
    
    // Filter information based on classes
    const filteredInformation = filterInformationByClasses(edible, classes);
    

    

    //Save classes and relevant information in local storage
    localStorage.setItem('information', JSON.stringify(filteredInformation))
    

    // Open new page
    window.location.href = 'skov/tjek.html'
});

  predictionsElement.appendChild(document.createElement('br'));
  predictionsElement.appendChild(eftertjekButton);
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

mobilenetDemo();
