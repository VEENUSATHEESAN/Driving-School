import React, { useState } from 'react';
import axios from 'axios';

const RoadSignRecognition = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [result, setResult] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!selectedFile) return;

        const formData = new FormData();
        formData.append('image', selectedFile);

        setLoading(true);
        setError('');
        setResult('');

        try {
            const response = await axios.post('http://localhost:5000/api/recognize-road-sign', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setResult(response.data.sign);
        } catch (error) {
            console.error('Error uploading the image', error);
            setError('Error recognizing the sign. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center p-8 bg-white rounded-lg shadow-md max-w-md mx-auto mt-10">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Road Sign Recognition</h1>
            <form onSubmit={handleSubmit} className="w-full">
                <input 
                    type="file" 
                    onChange={handleFileChange} 
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                <button 
                    type="submit" 
                    disabled={!selectedFile || loading} 
                    className={`mt-4 w-full py-2 px-4 text-white font-semibold rounded-lg shadow-md focus:outline-none ${loading ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
                >
                    {loading ? 'Recognizing...' : 'Recognize Road Sign'}
                </button>
            </form>
            {result && (
                <p className="mt-6 text-lg font-medium text-blue-600">
                    {result}
                </p>
            )}
            {error && (
                <p className="mt-6 text-lg font-medium text-red-600">
                    {error}
                </p>
            )}
        </div>
    );
};

export default RoadSignRecognition;
