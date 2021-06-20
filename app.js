/**
 * Stores the list of kittens
 * @type {Kitten[]}
 */
let kittens = [];
/**
 * Called when submitting the new Kitten Form
 * This method will pull data from the form
 * use the provided function to give the data an id
 * you can use robohash for images
 * https://robohash.org/<INSERTCATNAMEHERE>?set=set4
 * then add that data to the kittens list.
 * Then reset the form
 */
loadKittens()

function addKitten(event) {
  event.preventDefault()
  let form = event.target
  let index = kittens.findIndex(k => k.name == form.name.value)
  //if can't find index, returns index of -1
  if (index == -1) {
    let newKitten = {
      id: generateId(),
      picture: "https://robohash.org/" + form.name.value + "?set=set4",
      name: form.name.value,
      mood: "Happy",
      affection: 6,
    }
    console.log(newKitten)
    kittens.push(newKitten)
    console.log(kittens)
    saveKittens()
    loadKittens()
    form.reset()
    drawKittens()
  }
  else {
    window.alert("Name already exists. Please try another.")
    form.reset()
  }

}
/**
 * Converts the kittens array to a JSON string then
 * Saves the string to localstorage at the key kittens
 */
function saveKittens() {
  window.localStorage.setItem(
    "kittens", JSON.stringify(kittens))
  drawKittens()
}

/**
 * Attempts to retrieve the kittens string from localstorage
 * then parses the JSON string into an array. Finally sets
 * the kittens array to the retrieved array
 */
function loadKittens() {
  let kittenData = JSON.parse(
    window.localStorage.getItem("kittens"))
  if (kittenData) {
    kittens = kittenData
  }
  console.log(kittens)
}
/**
 * Draw all of the kittens to the kittens element
 */
function drawKittens() {

  let template = ""
  kittens.forEach(kitten => {
    template += `
    <div class="kitten-container card mt-1 mb-1" id="${kitten.id}Card">
    <div class = "kitten" id = "${kitten.id}PicDiv">
      <img src=${kitten.picture} id = "${kitten.id}Pic">
    </div>
    <div>
      <span>Kitten Name: </span>
      <span id="${kitten.id}Name">${kitten.name}</span>
    </div>
    <div>
      <span> Mood: </span>
      <span id="${kitten.id}Mood">${kitten.mood}</span>
    </div>
    <div>
      <span> Affection: </span>
      <span id="${kitten.id}Affection">${kitten.affection}</span>
    </div>
    <div id="mood-controls" class="space-around mt-2">
      <button class="pet-button btn-dark" id="${kitten.id}PetButton" onclick="pet('${kitten.id}')">Pet</button>
      <button class="catnip-button"id="${kitten.id}CatnipButton" onclick="catnip('${kitten.id}')">Catnip</button>
    </div>
  </div>
    `
  })
  document.getElementById("display-kittens").innerHTML = template

  kittens.forEach(kitten => {
    if (kitten.mood == "Gone") {
      document.getElementById(kitten.id + "PicDiv").removeAttribute("class")
      document.getElementById(kitten.id + "PetButton").classList.add("hidden")
      document.getElementById(kitten.id + "CatnipButton").classList.add("hidden")
      document.getElementById(kitten.id + "PicDiv").classList.add("kitten")
      document.getElementById(kitten.id + "PicDiv").classList.add("gone")
    }
    else if (kitten.mood == "Happy") {
      document.getElementById(kitten.id + "PicDiv").removeAttribute("class")
      document.getElementById(kitten.id + "PicDiv").classList.add("kitten")
      document.getElementById(kitten.id + "PicDiv").classList.add("happy")
    }
    else if (kitten.mood == "Tolerant") {
      document.getElementById(kitten.id + "PicDiv").removeAttribute("class")
      document.getElementById(kitten.id + "PicDiv").classList.add("kitten")
      document.getElementById(kitten.id + "PicDiv").classList.add("tolerant")
    }
    else if (kitten.mood == "Angry") {
      document.getElementById(kitten.id + "PicDiv").removeAttribute("class")
      document.getElementById(kitten.id + "PicDiv").classList.add("kitten")
      document.getElementById(kitten.id + "PicDiv").classList.add("angry")
    }
  })

}

function deleteKittens() {
  kittens = [];
  getStarted();

}
/**
 * Find the kitten in the array by its id
 * @param {string} id
 * @return {Kitten}
 */
function findKittenById(id) {
  return kittens.find(k => k.id == id);
}

/**
 * Find the kitten in the array of kittens
 * Generate a random Number
 * if the number is greater than .7
 * increase the kittens affection
 * otherwise decrease the affection
 * save the kittens
 * @param {string} id
 */
function pet(id) {
  let random = Math.random()
  let kitten = findKittenById(id)
  console.log(kitten)
  let aff = kitten.affection
  kitten.affection = random > .7 ? aff + 1 : aff - 1
  setKittenMood(kitten)
  saveKittens()
}

/**
 * Find the kitten in the array of kittens
 * Set the kitten's mood to tolerant
 * Set the kitten's affection to 5
 * save the kittens
 * @param {string} id
 */
function catnip(id) {
  let kitten = findKittenById(id)
  console.log(kitten)
  kitten.affection = 5
  kitten.mood = "Tolerant"
  saveKittens()
}

/**
 * Sets the kittens mood based on its affection
 * Happy > 6, Tolerant <= 5, Angry <= 3, Gone <= 0
 * @param {Kitten} kitten
 */
function setKittenMood(kitten) {
  let kMood = kitten.mood
  let kAff = kitten.affection
  let contactsElem = document.getElementById("pet-button")
  let idName = kitten.name + "PetButton"


  if (kAff >= 6) {
    kitten.mood = "Happy"
  }
  else if (kAff >= 4) {
    kitten.mood = "Tolerant"
  }
  else if (kAff > 0) {
    kitten.mood = "Angry"
  }
  else {
    kitten.mood = "Gone"

  }
  saveKittens()
}


function getStarted() {
  document.getElementById("welcome").remove();
  drawKittens();
}

/**
 * Defines the Properties of a Kitten
 * @typedef {{id: string, picture: string ,name: string, mood: string, affection: number}} Kitten
 */

/**
 * Used to generate a random string id for mocked
 * database generated Id
 * @returns {string}
 */
function generateId() {
  return (
    Math.floor(Math.random() * 10000000) +
    "-" +
    Math.floor(Math.random() * 10000000)
  );

}
