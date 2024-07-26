import React, { useState, useEffect, useRef, useContext } from 'react';
import { AiFillHome, AiOutlineUser, AiOutlineContacts, AiOutlineShop, AiOutlineShopping, AiOutlineShoppingCart } from 'react-icons/ai';
import { AuthContext } from '../Hooks/AuthContext';

const SideBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const sidebarRef = useRef(null);
    const auth = useContext(AuthContext);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleSignInClick = () => {
        if (auth.isLoggedIn) {
            auth.logout();
            window.location.href = "/login";
        } else {
            window.location.href = "/login";
        }
        setIsHovered(false);
        setIsOpen(false);
    };

    const handleHomeClick = () => {
        window.location.href = "/";
        setIsHovered(false);
        setIsOpen(false);
    };

    const handleContactsClick = () => {
        setIsHovered(false);
        setIsOpen(false);
    };

    const handleProductsClick = () => {
        setIsHovered(false);
        setIsOpen(false);
    };

    const handleStoreClick = () => {
        setIsHovered(false);
        setIsOpen(false);
    };

    const handleCartClick = () => {
        setIsHovered(false);
        setIsOpen(false);
    };

    const handleBuildStoreClick = () => {
        window.location.href = "/buildstore";
        setIsHovered(false);
        setIsOpen(false);
    };

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);

    return (
        <div 
            ref={sidebarRef} 
            className="fixed top-0 left-0 h-full lg:flex lg:flex-row lg:justify-start"
            style={{ zIndex: 1000 }}
        >
            {/* Sidebar button for small screens */}
            <div className="lg:hidden absolute top-4 left-4">
                <button onClick={toggleMenu} className="block text-gray-500 focus:outline-none">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        {isOpen ? (
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        ) : (
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        )}
                    </svg>
                </button>
            </div>

            {/* Sidebar content */}
            <div className={`lg:flex lg:flex-col lg:justify-start ${isOpen ? 'block' : 'hidden lg:block'}`}>
                <SideBarContent
                    isHovered={isHovered}
                    setIsHovered={setIsHovered}
                    onHomeClick={handleHomeClick}
                    onContactsClick={handleContactsClick}
                    onProductsClick={handleProductsClick}
                    onStoreClick={handleStoreClick}
                    onCartClick={handleCartClick}
                    onBuildStoreClick={handleBuildStoreClick}
                    handleSignInClick={handleSignInClick}
                    auth={auth}
                />
            </div>
        </div>
    );
};

const SideBarContent = ({ isHovered, setIsHovered, onHomeClick, onContactsClick, onProductsClick, onStoreClick, onCartClick, handleSignInClick, auth, onBuildStoreClick }) => (
    <div
        className={`fixed pt-5 px-2 z-10 top-0 left-0 h-full lg:h-screen rounded-r-xl md:w-15 flex flex-col lg:bg-transparent dark:bg-gray-900 shadow-lg ${isHovered ? 'w-60' : 'w-15 duration-500'}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
            transitionDelay: `300ms`,
        }}
    >
        <div className="flex flex-col">
            <SideBarIcon text="Home" icon={<AiFillHome size="25" />} color="text-red-300" isHovered={isHovered} onClick={onHomeClick} />
            <Divider />
            <SideBarIcon text="Contacts" icon={<AiOutlineContacts size="25" />} color="text-white" isHovered={isHovered} onClick={onContactsClick} />
            <SideBarIcon text="Products" icon={<AiOutlineShopping size="25" />} color="text-green-500" isHovered={isHovered} onClick={onProductsClick} />
            <SideBarIcon text="Store" icon={<AiOutlineShop size="25" />} color="text-yellow-500" isHovered={isHovered} onClick={onStoreClick} />
            <SideBarIcon text="Cart" icon={<AiOutlineShoppingCart size="25" />} color="text-purple-500" isHovered={isHovered} onClick={onCartClick} />
            <SideBarIcon text={auth.isLoggedIn ? "Sign Out" : "Sign In"} icon={<AiOutlineUser size="25" />} color="text-blue-500" isHovered={isHovered} onClick={handleSignInClick} />
            <SideBarIcon text="Build A Store" icon={<AiOutlineShop size="25" />} color="text-indigo-500" isHovered={isHovered} onClick={onBuildStoreClick} />
        </div>
    </div>
);

const SideBarIcon = ({ icon, text = 'tooltip 💡', color, isHovered, onClick }) => (
    <div className='flex font-serif flex-col items-center'>
        <div className={`sidebar-icon group ${color} hover:text-white flex items-center`} style={{ position: 'relative' }}>
            <div className="flex items-center" onClick={onClick}>
                {icon}
            </div>
        </div>
        <div>
            {isHovered && (
                <span className="relative top-0 left-0 group-hover:scale-100 text-md font-medium text-white" style={{ display: 'inline-block' }}>
                    {text}
                </span>
            )}
        </div>
    </div>
);

const Divider = () => <hr className="sidebar-hr" />;

export default SideBar;