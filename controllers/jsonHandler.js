//Retrieving catalog  "MP1"


const { readFile } = require('fs');

// Function to read JSON data from file
const readJsonData = (filePath) => {
    return new Promise((resolve, reject) => {
        readFile(filePath, 'utf8', (error, data) => {
            if (error) {
                reject(error);
            } else {
                const jsonData = JSON.parse(data);
                resolve(jsonData);
            }
        });
    });
};

// Function to process JSON data
const processJsonData = (jsonData) => {
    return new Promise((resolve, reject) => {
        if (!jsonData) {
            reject(new Error('JSON data not available'));
        } else {
            const result = {
                id: jsonData.id,
                name: jsonData.name,
                bundledProductOffering: jsonData.bundledProductOffering.map(product => ({
                    id: product.id,
                    name: product.name
                }))
            };
            resolve(result);
        }
    });
};

// Route handler for processing JSON data
const processJsonRouteHandler = async (req, res) => {
    try {
        const jsonData = await readJsonData('./MP1.json');
        console.log('JSON data read successfully');
        const result = await processJsonData(jsonData);
        res.json(result);
    } catch (error) {
        console.error('Error processing JSON data:', error);
        res.status(500).json({ error: 'Server Error' });
    }
};

module.exports = { readJsonData, processJsonData, processJsonRouteHandler };
