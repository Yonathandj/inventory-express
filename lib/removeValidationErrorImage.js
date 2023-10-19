const path = require('path');
const { rm } = require('fs');

function removeValidationErrorImage(filename) {
    rm(path.join(__dirname, "..", `public/gameImages/${filename}`), { recursive: true }, (err) => {
        console.log(err);
        return
    });
}

module.exports = removeValidationErrorImage;