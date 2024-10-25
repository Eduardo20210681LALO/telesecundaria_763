import { useState } from "react";
import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "framer-motion";

export const CustomSelect2 = ({ options, placeholder, onChange, value, w = 'w-full', opt = false, text, click, icon = false, styles, desc = false}) => {
    const [isOpen, setIsOpen] = useState(false);
    
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };
    
    return (
        <div className="relative">
            <div onClick={toggleDropdown} className={`appearance-none rounded px-3 py-4 ${w} text-white leading-tight focus:outline-none pr-10 bg-zinc-800`} >
                <div className="flex justify-between items-center">
                    <span>{value ? value.label : placeholder}</span>
                    <Icon icon="material-symbols:expand-more" className={`text-3xl text-white absolute right-1 flex items-center ${isOpen ? "rotate-180" : ""}`} />
                </div>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute w-full bg-zinc-800 shadow-md mt-1 rounded  text-white z-10"
                    >

                    <ul>
                        {options.map((option, index) => (
                        <li key={index} className="px-3 py-2 rounded hover:bg-gray-600">
                            {desc ? (
                            <div className={`w-full text-left ${styles}`}>
                                {option.label}
                                <p>{option.cantidad}</p>
                                {icon && <Icon icon={option.icono} />}
                            </div>
                            ) : (
                            <button
                                className={`w-full text-left focus:outline-none ${styles}`}
                                onClick={(e) => {
                                e.preventDefault()
                                onChange(option);
                                toggleDropdown();
                                }}
                            >
                                {option.label}
                                {icon && <Icon icon={option.icono} />}
                            </button>
                            )}
                        </li>
                        ))}

                        {opt && (
                        <button className="w-full flex items-center justify-between p-3 hover:bg-gray-600 relative" onClick={click}>
                            {text}
                            <Icon icon='arcticons:mapsgeobookmarks' />
                        </button>
                        )}
                        
                    </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};