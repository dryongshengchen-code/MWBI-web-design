import React, { useState } from 'react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (name: string, email: string) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLogin }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, perform API validation here.
    const displayName = name || email.split('@')[0];
    onLogin(displayName, email);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden relative animate-fade-in-up">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>

        <div className="bg-monk-700 px-8 py-6">
          <h2 className="text-2xl font-serif font-bold text-white mb-2">
            {isSignUp ? '加入大觉大家庭' : '欢迎回家'}
          </h2>
          <p className="text-monk-100 text-sm">
            {isSignUp ? '注册账号，记录您的每一次功德。' : '登录查看您的功德记录与课程进度。'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {isSignUp && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">法名 / 姓名</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-monk-500 focus:border-transparent outline-none transition-all"
                placeholder="请输入您的称呼"
                required={isSignUp}
              />
            </div>
          )}
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">电子邮箱</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-monk-500 focus:border-transparent outline-none transition-all"
              placeholder="example@email.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">密码</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-monk-500 focus:border-transparent outline-none transition-all"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-monk-700 text-white rounded-lg font-medium hover:bg-monk-800 transition-colors shadow-lg shadow-monk-700/30"
          >
            {isSignUp ? '立即注册' : '登录'}
          </button>
        </form>

        <div className="bg-gray-50 px-8 py-4 text-center">
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-sm text-monk-700 hover:text-monk-800 font-medium"
          >
            {isSignUp ? '已有账号？点击登录' : '还没有账号？点击注册'}
          </button>
        </div>
      </div>
    </div>
  );
};