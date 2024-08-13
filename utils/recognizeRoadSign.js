const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');

const recognizeRoadSign = async (filePath) => {
    try {
        const formData = new FormData();
        formData.append('image', fs.createReadStream(filePath));

        // Replace 'YOUR_API_ENDPOINT' and 'YOUR_API_KEY' with actual API endpoint and key
        const response = await axios.post('YOUR_API_ENDPOINT', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer YOUR_API_KEY`
            }
        });

        // Extract and return the recognized sign details from the API response
        const signDetails = response.data.signDetails;
        return signDetails;
    } catch (error) {
        console.error('Error recognizing the road sign:', error);
        throw new Error('Error recognizing the road sign');
    }
};

module.exports = { recognizeRoadSign };
