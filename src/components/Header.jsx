const Header = ({language, handleLanguageChange}) => {
    return (

        <div className="flex justify-between items-center py-3 border-b-2 border-secondary">
        <div className="w-1/3"></div>
        
        <h1 className="text-center text-2xl sm:text-3xl md:text-4xl w-1/3 whitespace-nowrap font-mono">
          hacettepe ai
        </h1>
        
        <div className="w-1/3 flex justify-end items-center mr-3 text-base">
        <div className="relative flex items-center cursor-pointer w-20 h-10 bg-black rounded-full" onClick={handleLanguageChange}>
          <div className={`absolute w-10 h-10 bg-secondary rounded-full transition-transform duration-300 ${language === 'TR' ? 'translate-x-10' : 'translate-x-0'}`}></div>
          <span className={`absolute left-2 text-tertiary ${language === 'EN' ? 'font-bold' : 'text-opacity-50'}`}>EN</span>
          <span className={`absolute right-2 text-tertiary ${language === 'TR' ? 'font-bold' : 'text-opacity-50'}`}>TR</span>
        </div>
      </div>
      </div>
    )
  }

export default Header