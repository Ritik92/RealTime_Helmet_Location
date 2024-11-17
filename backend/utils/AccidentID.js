const { v4: uuidv4 } = require('uuid');

const generateUniqueAccidentID = () => {
    return uuidv4();
};