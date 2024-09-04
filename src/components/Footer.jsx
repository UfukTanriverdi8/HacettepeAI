import { FaLinkedin, FaGithub, FaInfoCircle} from "react-icons/fa"
const Footer = ({ onInfoClick }) => {

  return (
  <div className="flex justify-center items-center text-tertiary bg-primary w-full py-2">
    <button className="transition-all duration-300 hover:text-secondary cursor-pointer text-2xl mr-5" onClick={onInfoClick}>
      <FaInfoCircle/>
    </button>
    
    <div className="mr-5 text-base">
      Developed by Ufuk Tanrıverdi
    </div>
    <div className="mr-5 text-2xl transition-all duration-300 hover:text-[#9ca3af]">
      <a
        href="https://www.linkedin.com/in/ufuk-tanr%C4%B1verdi-91a503264/"
        target="_blank"
        rel="noreferrer"
      >
        <FaLinkedin />
      </a>
    </div>
    <div className="text-2xl transition-all duration-300 hover:text-[#9ca3af]">
      <a
        href="https://github.com/UfukTanriverdi8"
        target="_blank"
        rel="noreferrer"
      >
        <FaGithub />
      </a>
    </div>
  </div>

  )
}

export default Footer