"use client";

import React, { Dispatch, SetStateAction, ReactNode, useState } from 'react';
import { 
  Menu,
  User,
  LogOut
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { LogoutModal } from './logoutModal';

interface SidebarProps {
  onShow: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
}

interface MenuBtnProps {
  icon: ReactNode;
  positioning?: string;
  onClick: () => void;
  toggleLeftPadding?: string;
}

const MenuBtn: React.FC<MenuBtnProps> = ({ icon, positioning = '', onClick, toggleLeftPadding = '' }) => (
  <button
    type="button"
    className={`${positioning} inline-flex cursor-pointer items-center justify-center rounded-md p-2 pl-0 text-gray-400 ${toggleLeftPadding}`}
    onClick={onClick}
  >
    <span className="sr-only">Toggle menu</span>
    {icon}
  </button>
);

export const AdminSidebar: React.FC<SidebarProps> = ({ onShow, setShow }) => {
  const pathname = usePathname();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  
  const toggleSidebar = (): string => onShow ? "block" : "hidden";
  const toggleLeftPadding = (): string => onShow ? "pl-4 md:pl-12" : "";

  // Helper function to check if a route is active
  const isActive = (route: string): boolean => {
    if (route === '/admin' && pathname === '/admin') return true;
    if (route !== '/admin' && pathname.startsWith(route)) return true;
    return false;
  };

  // Helper function to get active styles
  const getActiveStyles = (route: string) => {
    return isActive(route) ? {
      background: '#5D2A8B',
      borderRadius: '20px',
      width: '275px',
      height: '71px'
    } : {};
  };

  // Helper function to get text color
  const getTextColor = (route: string) => {
    return isActive(route) ? '#FFFFFF' : '#6E6E6EB2';
  };

  // Logout handler functions
  const handleLogoutClick = () => {
    setShowLogoutModal(true);
    setShow(false);
  };

  const handleConfirmLogout = () => {
    console.log('Logging out...');
    setShowLogoutModal(false);
    alert('Logged out successfully!');
  };

  const handleCancelLogout = () => {
    setShowLogoutModal(false);
  };

  // Admin menu items with their positions
  const adminMenuItems = [
    { 
      id: 'dashboard', 
      name: 'Dashboard', 
      route: '/admin', 
      icon: <Image src="/Dashboard Circle Streamline Core Remix - Free.png" alt="Dashboard" width={24} height={24} className="object-contain" />,
      top: '169px'
    },
    { 
      id: 'body-measurement', 
      name: 'Body Measurement', 
      route: '/admin/body-measurement', 
      icon: <Image src="/Body Streamline Ionic Filled.png" alt="Body Measurement" width={24} height={24} className="object-contain" />,
      top: '250px'
    },
    { 
      id: 'object-dimension', 
      name: 'Object Dimension', 
      route: '/admin/object-dimension', 
      icon: <Image src="/Object Scan Streamline Tabler Line.png" alt="Object Dimension" width={24} height={24} className="object-contain" />,
      top: '331px'
    },
    { 
      id: 'questionaire', 
      name: 'Questionnaire', 
      route: '/admin/questionaire', 
      icon: <Image src="/List Dropdown Streamline Carbon.png" alt="Questionnaire" width={24} height={24} className="object-contain" />,
      top: '412px'
    },
    { 
      id: 'users', 
      name: 'User Management', 
      route: '/admin/users', 
      icon: <User className="w-6 h-6  text-[#dcdcdc]" />, // Using Lucide User icon
      top: '493px'
    },
  ];

  return (
    <aside>
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700&display=swap');
        .manrope { font-family: 'Manrope', sans-serif; }
        
        @media (max-width: 768px) {
          .sidebar-container {
            width: 280px !important;
            height: 100vh !important;
            top: 0 !important;
            left: 0 !important;
            border-radius: 0 !important;
          }
          
          .sidebar-logo-container {
            position: relative !important;
            top: auto !important;
            left: auto !important;
            padding: 20px;
          }
          
          .sidebar-nav-container {
            position: relative !important;
            padding: 0 20px;
          }
          
          .sidebar-logout {
            position: fixed !important;
            bottom: 30px !important;
            left: 38px !important;
          }
        }
        
        .sidebar-overlay {
          display: none;
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.5);
          z-index: 998;
        }
        
        @media (max-width: 768px) {
          .sidebar-overlay.active {
            display: block;
          }
        }
      `}</style>
      
      <LogoutModal 
        isOpen={showLogoutModal}
        onConfirm={handleConfirmLogout}
        onCancel={handleCancelLogout}
      />
      
      {onShow && (
        <div 
          className="sidebar-overlay active"
          onClick={() => setShow(false)}
        />
      )}
      
      <div 
        className={`${toggleSidebar()} sidebar-container bg-[#FFFFFF] fixed overflow-y-auto shadow-sm`}
        style={{
          width: '328px',
          height: '100vh',
          top: '0', // Changed from '80px' to '0' to prevent overlap
          left: '0', // Changed from '37px' to '0'
          borderRadius: '0 20px 20px 0', // Only round right corners
          boxShadow: '0px 2px 8px 0px rgba(0, 0, 0, 0.1)',
          zIndex: 999
        }}
      >
        {/* Header with Logo and Close Button */}
        <div 
          className="sidebar-logo-container flex items-center"
          style={{
            width: '252px',
            height: '48px',
            justifyContent: 'space-between',
            top: '43px',
            left: '38px',
            position: 'absolute'
          }}
        >
          <div className="flex items-center">
            <Image 
              src="/Group 1.png" 
              alt="Brand Logo" 
              width={55} 
              height={48}
              className="object-contain"
            />
           
          </div>
          
          <button
            type="button"
            onClick={() => setShow(!onShow)}
            className="cursor-pointer"
          >
            <Image 
              src="/Panel Left Close Streamline Lucide Line.png" 
              alt="Close Panel" 
              width={24} 
              height={24}
              className="object-contain"
            />
          </button>
        </div>

        <nav className="sidebar-nav-container flex flex-col text-white" style={{ gap: '40px' }}>
          <div className="cursor-pointer">
            {/* Admin Menu Items */}
            {adminMenuItems.map((item) => (
              <Link href={item.route} key={item.id}>
                <div 
                  className="manrope flex items-center rounded-lg cursor-pointer absolute"
                  style={{
                    ...getActiveStyles(item.route),
                    top: item.top,
                    left: '15px',
                    ...(isActive(item.route) ? {} : {
                      width: '275px',
                      height: '71px'
                    })
                  }}
                >
                  <div 
                    className="flex items-center"
                    style={{
                      width: '200px',
                      height: '27px',
                      position: 'absolute',
                      top: '22px',
                      left: '23px',
                      gap: '12px'
                    }}
                  >
                    <div className="w-6 h-6 flex items-center justify-center">
                      {item.icon}
                    </div>
                    <span 
                      className="manrope"
                      style={{
                        fontWeight: 500,
                        fontSize: '20px',
                        lineHeight: '100%',
                        color: getTextColor(item.route),
                        width: 'auto',
                        height: '27px'
                      }}
                    >
                      {item.name}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Logout Module */}
          <div 
            className="sidebar-logout absolute"
            style={{
              width: '105.39px',
              height: '27px',
              top: '574px', // Adjusted position
              left: '38px',
              gap: '12px',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <button 
              className="manrope flex items-center hover:opacity-80 cursor-pointer"
              style={{
                gap: '12px',
                background: 'none',
                border: 'none',
                padding: 0
              }}
              onClick={handleLogoutClick}
            >
              <LogOut className="w-6 h-6 text-[#FF6161]" /> {/* Using Lucide LogOut icon */}
              <span 
                className="manrope"
                style={{
                  width: '67px',
                  height: '27px',
                  fontWeight: 500,
                  fontSize: '20px',
                  lineHeight: '100%',
                  color: '#FF6161'
                }}
              >
                Logout
              </span>
            </button>
          </div>
        </nav>
      </div>

      {!onShow && (
        <MenuBtn
          positioning="fixed left-4 z-[1000]"
          icon={<Menu className="h-6 w-6" />}
          onClick={() => setShow(!onShow)}
          toggleLeftPadding={toggleLeftPadding()}
        />
      )}
    </aside>
  );
};