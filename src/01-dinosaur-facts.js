/*
  Do not change the line below. If you'd like to run code from this file, you may use the `exampleDinosaurData` variable below to gain access to tickets data. This data is pulled from the `data/dinosaurs.js` file.

  You may use this data to test your functions. You may assume the shape of the data remains the same but that the values may change.

  Keep in mind that your functions must still have and use a parameter for accepting all dinosaurs.
*/
const exampleDinosaurData = require("../data/dinosaurs");
// Do not change the line above.

/**
 * getLongestDinosaur()
 * ---------------------
 * Returns an object with the longest dinosaur from the list. Converts from meters to feet.
 *
 * NOTE: To convert from meters to feet, multiply the meters by `3.281`.
 *
 * @param {Object[]} dinosaurs - An array of dinosaur objects. See the `data/dinosaurs.js` file for an example of the input.
 * @returns {Object} An object where the key is the name of the dinosaur and the value is the height of the dinosaur in feet.
 *
 * EXAMPLE:
 *  getLongestDinosaur(dinosaurs);
 *  //> { Brachiosaurus: 98.43 }
 */
function getLongestDinosaur(dinosaurs) {
  //declaring variable to first dinosaur with the largest length
  const longestDinosaur = dinosaurs.find(dinosaur => {
    //declaring a variable to an array of dinosaur lengths
    const dinoLengths = dinosaurs.map(dinosaur => dinosaur.lengthInMeters)
    //checks and returns current dino equal to max dino length
    return dinosaur.lengthInMeters === Math.max(...dinoLengths)
  })
  //checks truthy value of longestDinosaur and returns object with dino name as key and length converted to feet as the value or empty object
  return longestDinosaur ? { [longestDinosaur.name]: longestDinosaur.lengthInMeters * 3.281 } : {};
}

/**
 * getDinosaurDescription()
 * ---------------------
 * Returns a formatted description of a dinosaur. If the dinosaur cannot be found, returns an error message.
 *
 * NOTE: Carefully view the test output and example below to see how the returned string should be formatted.
 *
 * NOTE: The `\n` represents a new line in text.
 *
 * @param {Object[]} dinosaurs - An array of dinosaur objects. See the `data/dinosaurs.js` file for an example of the input.
 * @param {string} id - The unique identifier for the dinosaur.
 * @returns {string} A detailed description of the dinosaur.
 *
 * EXAMPLE:
 *  getDinosaurDescription(dinosaurs, "U9vuZmgKwUr");
 *  //> "Xenoceratops (ZEE-no-SEH-ruh-tops)\nXenoceratops had horns and a bony frill with elaborate ornamentation of projections, knobs, and spikes. It lived in the Early Cretaceous period, over 77.5 million years ago."
 *
 *  getDinosaurDescription(dinosaurs, "incorrect-id");
 *  //> "A dinosaur with an ID of 'incorrect-id' cannot be found."
 */
function getDinosaurDescription(dinosaurs, id) {
  //interate through array of dinosaur objects
  for (const dino of dinosaurs) {
    //check if each dinosaur Id matches id parameter
    if (dino.dinosaurId === id) {
      // returns string using string interpolation for needed info, using Math.min to find smallest number in mya array
      return `${dino.name} (${dino.pronunciation})\n${dino.info} It lived in the ${dino.period} period, over ${Math.min(...dino.mya)} million years ago.`
    }
  }
  // return error message if no dinosaur can be found
  return "A dinosaur with an ID of 'incorrect-id' cannot be found."
}

/**
 * getDinosaursAliveMya()
 * ---------------------
 * Returns an array of dinosaurs who were alive at the given `mya` (i.e. "millions of years ago") value. If a `key` is provided, returns the value of that key for each dinosaur alive at that time. Otherwise, returns the ID.
 *
 * If the dinosaur only has a single value for `mya`, allows for the `mya` value to be equal to the given value or one less. For example, if a dinosaur has a `mya` value of `[29]`, the dinosaur's information will be returned if `29` is entered or `28` is entered.
 *
 * @param {Object[]} dinosaurs - An array of dinosaur objects. See the `data/dinosaurs.js` file for an example of the input.
 * @param {number} mya - "Millions of years ago."
 * @param {string} key - An optional parameter. If included, for dinosaurs that lived during the `mya` value given, will return the value of the supplied key. Otherwise, returns the ID.
 * @returns {*[]} An array of values, which depend on the key given. The array should only include data of dinosaurs who lived during the given time period.
 *
 * EXAMPLE:
 *  getDinosaursAliveMya(dinosaurs, 150);
 *  //> ["YLtkN9R37", "GGvO1X9Zeh", "BFjjLjea-O", "V53DvdhV2A"]
 *
 *  getDinosaursAliveMya(dinosaurs, 65);
 *  //> ["WHQcpcOj0G"]
 *
 *  getDinosaursAliveMya(dinosaurs, 65, "name");
 *  //> ["Dracorex"]
 *
 *  getDinosaursAliveMya(dinosaurs, 65, "unknown-key");
 *  //> ["WHQcpcOj0G"]
 */
function getDinosaursAliveMya(dinosaurs, mya, key) {
  // create empty array
  const dinosAliveAtMya = []
  // create array of filtered dinosaurs with given conditions
  const filteredDinos = dinosaurs.filter(dino => {
    // if one element in mya array length
    if (dino.mya.length === 1) {
      // return dino mya equal to mya or mya less 1
      return dino.mya[0] === mya || dino.mya[0] - 1 === mya
      // if 2 elements in mya array length
    } else if (dino.mya.length === 2) {
      //return 1st dino mya element greater and equal to mya or mya - 1 AND 2nd dino element less than and equal to mya or mya - 1
      return (dino.mya[0] >= mya || dino.mya[0] >= mya - 1) && (dino.mya[1] <= mya || dino.mya[1] <= mya - 1)
    }
  })
  for (const dino of filteredDinos) {
    //iterate thru array of dinos and if key or key as object key in each dino object is not undefined
    if (key && dino[key] !== undefined) {
      //push the key object as the dino object to the array created
      dinosAliveAtMya.push(dino[key])
    } else
      // else push the dino's ID to the array created
      dinosAliveAtMya.push(dino.dinosaurId)
  }
  //return created array with dino info
  return dinosAliveAtMya
}

module.exports = {
  getLongestDinosaur,
  getDinosaurDescription,
  getDinosaursAliveMya,
};
