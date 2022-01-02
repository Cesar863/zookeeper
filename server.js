const express = require('express');
const app = express();
const { animals } = require('./data/animals');

// app.get('/api/animals', (req, res) => {
//     res.send(animals);
// });

function filterByQuery(query, animalsArray) {
    let personalityTraitsArray = [];
    // note that we save the animals Array as filtered results here:

    let filteredResults = animalsArray;
    if(query.personalityTraits) {
        //save personality traits as a dedicated array
        // if personality traits is a string, place into a new array and save
        if (typeof query.personalityTraits === 'string') {
            personalityTraitsArray = [query.personalityTraits];
        } else {
            personalityTraitsArray = query.personalityTraits;
        }

        //loop through each trait in the personalitytraits array
        personalityTraitsArray.forEach(trait => {
            // check the trait against each animal in the filtered results array
            // remeber it is initially a copy of the animals array
            // but here were updating it for each trait in the foreach loop
            // for each trait being targeted by the filter, the filtered results
            // array will then contain only the entries that contain that trait
            // so at the end weel have an array of animals that have every one 
            // of the traits when the foreach loop is finished.
            filteredResults = filteredResults.filter(
                animal => animal.personalityTraits.indexOf(trait) !== -1
            );
        });
    }
    if (query.diet) {
        filteredResults = filteredResults.filter(animal => animal.diet === query.diet);
    }
    if (query.species) {
        filteredResults = filteredResults.filter(animal => animal.species === query.species);
    }
    if (query.name) {
        filteredResults = filteredResults.filter(animal => animal.name === query.name);
    }
    return filteredResults;
}

app.get('/api/animals', (req, res) => {
    let results = animals;
    if (req.query) {
        results = filterByQuery(req.query, results);
    }
    res.json(results);
});

app.listen(3001, () => {
    console.log('API server now on port 3001');
});