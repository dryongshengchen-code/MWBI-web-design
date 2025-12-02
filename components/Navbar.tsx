import React, { useState } from 'react';
import { Section, User } from '../types';

interface NavbarProps {
  currentSection: Section;
  onNavigate: (section: Section) => void;
  user: User;
  onAuthClick: () => void;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentSection, onNavigate, user, onAuthClick, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: '大觉首页', value: Section.HOME },
    { label: '寺院简介', value: Section.ABOUT },
    { label: '佛学课程', value: Section.ACADEMY },
    { label: '法务行事', value: Section.EVENTS },
    { label: '善行分享', value: Section.SHARING },
    { label: '功德护持', value: Section.DONATE },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-monk-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          {/* Logo Area */}
          <div className="flex items-center cursor-pointer" onClick={() => onNavigate(Section.HOME)}>
            <div className="flex flex-col">
              <span className="text-2xl font-serif font-bold text-monk-800 tracking-wide">多伦多大觉寺</span>
              <span className="text-[10px] text-monk-500 uppercase tracking-wider">Manju Wisdom Buddhist Institute</span>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-6 items-center">
            {navItems.map((item) => (
              <button
                key={item.value}
                onClick={() => onNavigate(item.value)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  currentSection === item.value
                    ? 'text-monk-800 bg-monk-50'
                    : 'text-gray-600 hover:text-monk-700 hover:bg-gray-50'
                }`}
              >
                {item.label}
              </button>
            ))}
            
            {user.isLoggedIn ? (
              <div className="flex items-center space-x-4 pl-4 border-l border-monk-200">
                 <button
                  onClick={() => onNavigate(Section.USER_DASHBOARD)}
                  className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                    currentSection === Section.USER_DASHBOARD ? 'text-monk-800' : 'text-gray-600 hover:text-monk-700'
                  }`}
                 >
                   <span className="w-8 h-8 rounded-full bg-monk-100 flex items-center justify-center text-monk-700">
                     {user.name.charAt(0)}
                   </span>
                   <span>{user.name} 居士</span>
                </button>
                <button
                  onClick={onLogout}
                  className="text-sm text-gray-400 hover:text-red-500"
                >
                  退出
                </button>
              </div>
            ) : (
              <button
                onClick={onAuthClick}
                className="ml-4 px-6 py-2 rounded-full bg-monk-700 text-white text-sm font-medium hover:bg-monk-800 transition-all shadow-md hover:shadow-lg"
              >
                登录 / 注册
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-monk-800 hover:text-monk-600 focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-monk-100">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <button
                key={item.value}
                onClick={() => {
                  onNavigate(item.value);
                  setIsMenuOpen(false);
                }}
                className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${
                  currentSection === item.value
                    ? 'text-monk-800 bg-monk-50'
                    : 'text-gray-600 hover:text-monk-700 hover:bg-gray-50'
                }`}
              >
                {item.label}
              </button>
            ))}
             <div className="pt-4 border-t border-monk-100 mt-4">
                {user.isLoggedIn ? (
                   <div className="px-3 space-y-3">
                      <button 
                        onClick={() => {
                          onNavigate(Section.USER_DASHBOARD);
                          setIsMenuOpen(false);
                        }}
                        className="flex items-center gap-3 text-monk-800 font-medium w-full text-left"
                      >
                         <span className="w-8 h-8 rounded-full bg-monk-100 flex items-center justify-center text-monk-700">
                           {user.name.charAt(0)}
                         </span>
                         {user.name} 居士 (个人中心)
                      </button>
                      <button onClick={onLogout} className="text-gray-500 block w-full text-left pl-11">退出登录</button>
                   </div>
                ) : (
                  <button
                    onClick={() => {
                      onAuthClick();
                      setIsMenuOpen(false);
                    }}
                    className="w-full text-center px-4 py-3 bg-monk-700 text-white rounded-lg"
                  >
                    登录 / 注册
                  </button>
                )}
             </div>
          </div>
        </div>
      )}
    </nav>
  );
};