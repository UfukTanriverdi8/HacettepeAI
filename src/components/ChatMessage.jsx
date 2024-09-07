import {useEffect, useState} from 'react'
import { FaRobot, FaUser } from "react-icons/fa6"
import { GiDeerHead } from "react-icons/gi"


const ChatMessage = ({ sender, message, isPlaceholder }) => {
    const [displayedMsg, setDisplayedMsg] = useState("")
    useEffect(() => {
        //message = message.replace(/\n/g, '<br />')
        if(sender==="AI"){
            setDisplayedMsg("")
            let currentIndex = -1
            const interval = setInterval(() => {
                currentIndex++
              setDisplayedMsg((prev) => prev + message[currentIndex])
              
              if (currentIndex >= message.length-1) {
                clearInterval(interval)// Clear the interval when the full text has been displayed
              }
            }, isPlaceholder ? 20 : 6); // Adjust the interval time to control the speed of the typing effect
        
            return () => clearInterval(interval)
        }else{
            setDisplayedMsg(message)
        }
      }, [message])
      
  return (
    <div className={`w-full max-w-5xl p-2 mb-2 flex items-center text-tertiary bg-black rounded-lg`}>
        {sender === 'AI' && <FaRobot className={`flex-shrink-0 w-8 mr-2 mb-2 text-2xl ${isPlaceholder ? 'text-[#9ca3af]' : 'text-secondary'}`} />}
        {sender === 'Human' && <FaUser className="flex-shrink-0 w-8 mr-2 text-2xl " />}
        {/* <p dangerouslySetInnerHTML={{__html: displayedMsg}}></p> */}
        <p>{displayedMsg}</p>
    </div>
  )
}

export default ChatMessage
