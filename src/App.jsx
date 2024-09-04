import Header from './components/Header'
import ChatConversations from './components/ChatConversations'
import ChatInput from './components/ChatInput'
import Footer from './components/Footer'
import InfoModal from './components/InfoModal'
import { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

const App =  () => {
    const [openModal, setOpenModal] = useState(false)
    const toggleModal = () => {
        setOpenModal(!openModal)  // Toggle the modal's open state
    };

    const [chatHistory, setChatHistory] = useState([])

    const [language, setLanguage] = useState(() => {
        // Retrieve language from localStorage or default to 'EN'
        const savedLanguage = localStorage.getItem('language')
        return savedLanguage ? savedLanguage : 'EN'
      })
    
      useEffect(() => {
        // Store language preference in localStorage when it changes
        localStorage.setItem('language', language)
      }, [language])

    const enLangChange = "Language changed to English! Chat will be in English too!"
    const trLangChange = "Dil Türkçeye değiştirildi! Sohbet de Türkçe olacak!"
    const langChangeInfoMsgEN = "Are you sure you want to change the language? This action will clear your chat history."
    const langChangeInfoMsgTR = "Dili değiştirmek istediğinizden emin misiniz? Bu eylem sohbet geçmişinizi silecek."
    const handleLanguageChange = () => {
        const langChangeInfoMsg = language === 'EN' ? langChangeInfoMsgEN : langChangeInfoMsgTR
        if(chatHistory.length > 0){
            if(confirm(langChangeInfoMsg) == true){
                changeLanguage()
            } else {
                return
            }
        }else{
            changeLanguage()
        }

      }

      const changeLanguage = () => {
        setChatHistory([]) // Clear the chat history
        const newLang = language === 'EN' ? 'TR' : 'EN'
            setLanguage(newLang)
    
            toast.dismiss()
            // Show a toast notification
            toast.success(`${newLang === 'EN' ? enLangChange : trLangChange}`, {
              position: "top-left",
              autoClose: 3000,  // auto-close the toast after 3 seconds
              hideProgressBar: false,
              closeOnClick: true,
              draggable: true,
              pauseOnHover: false,
              progress: undefined,
              className: 'custom-toast'
            })
        }
      
    return (
    <div className="flex flex-col h-screen bg-primary text-tertiary">
        <Header className="fixed top-0 left-0 right-0" language={language} handleLanguageChange={handleLanguageChange}/>
        <div className="flex-grow overflow-auto scrollable max-h-full">
        <ChatConversations chatHistory={chatHistory} language={language} />
        </div>
        <ChatInput className="fixed" language={language} chatHistory={chatHistory} setChatHistory={setChatHistory} />
        {openModal && <InfoModal language={language} onClose={toggleModal} />}
        <Footer className="fixed bottom-0 left-0 right-0" onInfoClick={toggleModal} />
        <ToastContainer />
    </div>
    )
}

export default App
