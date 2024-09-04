import { FaArrowUp, FaTrashCan } from "react-icons/fa6";
import { useState} from 'react';


const ChatInput = ({chatHistory, setChatHistory, language}) => {
    const [inputValue, setInputValue] = useState('');
    const [loading, setLoading] = useState(false);
    const API_KEY = import.meta.env.VITE_API_KEY;
    const API_URL = import.meta.env.VITE_API_URL;

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
          e.preventDefault() // Prevent the default behavior (e.g., form submission)
          sendPrompt()
        }
      }
      const sendPrompt = async () => {
        console.log('Send button clicked')
        if (inputValue === '') {
            console.log("No message to send")
            return
        }
        console.log('Message:', inputValue)
        
        setInputValue('')
        setLoading(true)
        
        // Add the human message
        setChatHistory(prevHistory => [...prevHistory, { sender: 'Human', message: inputValue }]);
        
        // Add a placeholder for the AI response
        const aiMessageId = Date.now(); // Unique ID for the placeholder
        setChatHistory(prevHistory => [
            ...prevHistory, 
            { 
                id: aiMessageId, 
                sender: 'AI', 
                message: language === 'EN' ? 'Thinking...🤔' : 'Hmm...🤔', 
                isPlaceholder: true 
            }
        ])
        
        try {
            console.log(chatHistory)
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': API_KEY
                },
                body: JSON.stringify({ "query": inputValue, "college_name": "hacettepe", "lang": language, "context": chatHistory  })
            });
            
            if (!response.ok) {
                alert("We're sorry, but something went wrong. Please try again later.");
                throw new Error('Network response was not ok');
            }
    
            const data = await response.json()
    
            // Update the placeholder with the actual response
            setChatHistory(prevHistory => prevHistory.map(message =>
                message.id === aiMessageId
                    ? { ...message, message: data.response.output.text, isPlaceholder: false }
                    : message
            ));
            
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    }
    const clearChat = () => {
        console.log('Clear button clicked')
        if (confirm("Are you sure you want to clear the chat history?") == true) {
            setChatHistory([]) // Clear the chat history
        } else {
            console.log("User cancelled the clear chat operation.")
            return
          }
      }
    



    return (
        <div className="flex justify-center items-center p-2 pt-0">
          <div className="flex items-center w-full max-w-3xl">
            <div className="flex-grow h-14">
              <input
                type="text"
                placeholder={language === 'EN' ? 'What would you like to know about Hacettepe?' : 'Hacettepe hakkında ne öğrenmek istersiniz?'}
                autoComplete='off'
                value={inputValue}
                onKeyDown={handleKeyDown}
                onChange={(e) => setInputValue(e.target.value)}
                className="w-full h-14 px-4 text-tertiary bg-black rounded-lg border-2 border-primary transition-colors duration-300 focus:border-secondary focus:outline-none"
              />
            </div>
            <div className="flex-shrink-0 ml-2 text-2xl">
              <button                             
              onClick={sendPrompt}
              className={`transition-all duration-300 p-2 rounded-md focus:outline-none focus:ring-2 ${loading ? 'bg-black text-secondary' : 'bg-secondary text-tertiary hover:bg-secondary-red '} `}>
                <FaArrowUp />
              </button>
            </div>
            <div className="flex-shrink-0 ml-2 text-2xl">
              <button 
              onClick={clearChat}
              className="bg-black text-tertiary p-2 rounded-md transition-all hover:bg-opacity-20 duration-300 focus:outline-none focus:ring-2">
                <FaTrashCan />
              </button>
            </div>
          </div>
        </div>
      )
}

export default ChatInput