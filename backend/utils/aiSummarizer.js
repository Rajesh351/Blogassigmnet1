 // Ensure `node-fetch` is installed

// Function to generate summary using Gemini API
const generateSummary=async(userMessage) =>{
    const instruction = `Please summarize the following text in 30 words:`;
    const requestBody = {
        contents: [
            {
                role: 'user',
                parts: [{ text: instruction + " " + userMessage }],
            },
        ],
    };

    try {
        // Making API request to Gemini API
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { "Content-Type": 'application/json' },
            body: JSON.stringify(requestBody),
        });

        // Check if the response is okay (status code 200)
        if (!response.ok) {
            throw new Error(`API Error: ${response.status} - ${response.statusText}`);
        }

        // Parse response data
        const data = await response.json();

        // If the response contains candidates, return the summary text
        if (data.candidates && data.candidates.length > 0) {
            // Extract the text and remove any bold formatting
            const summary = data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g, '$1');
            return summary; // Return the summary text
        } else {
            throw new Error('No response received from the API.');
        }
    } catch (error) {
        // Handle error and provide a default message
        console.error('Error communicating with Gemini API:', error);
        return 'Sorry, something went wrong. Please try again later.'; // Return generic error message
    }
}

module.exports = generateSummary ;
