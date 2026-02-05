import {useEffect, useState} from 'react'
import { FaRobot, FaUser } from "react-icons/fa6"
import { GiDeerHead } from "react-icons/gi"
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'


const ChatMessage = ({ sender, message, isPlaceholder, skipTypewriter }) => {
    const [displayedMsg, setDisplayedMsg] = useState("")
    const [isTypingComplete, setIsTypingComplete] = useState(false)
    
    useEffect(() => {
        if(sender==="AI" && !skipTypewriter){
            setDisplayedMsg("")
            setIsTypingComplete(false)
            let currentIndex = -1
            const interval = setInterval(() => {
                currentIndex++
              setDisplayedMsg((prev) => prev + message[currentIndex])
              
              if (currentIndex >= message.length-1) {
                clearInterval(interval)
                setIsTypingComplete(true) // Mark typing as complete
              }
            }, isPlaceholder ? 20 : 3); // Adjust the interval time to control the speed of the typing effect
        
            return () => clearInterval(interval)
        }else{
            setDisplayedMsg(message)
            setIsTypingComplete(true)
        }
      }, [message])
      
  return (
    <div className={`w-full max-w-5xl p-2 mb-2 flex items-start text-tertiary bg-black rounded-lg`}>
        {sender === 'AI' && <GiDeerHead className={`flex-shrink-0 w-8 mr-2 mt-1 text-2xl ${isPlaceholder ? 'text-[#9ca3af]' : 'text-secondary'}`} />}
        {sender === 'Human' && <FaUser className="flex-shrink-0 w-8 mr-2 mt-1 text-2xl " />}
        {sender === 'AI' ? (
          <div className="prose prose-invert max-w-none">
            {isTypingComplete ? (
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {displayedMsg}
              </ReactMarkdown>
            ) : (
              <p className="whitespace-pre-wrap">{displayedMsg}</p>
            )}
          </div>
        ) : (
          <p>{displayedMsg}</p>
        )}
    </div>
  )
}

export default ChatMessage
