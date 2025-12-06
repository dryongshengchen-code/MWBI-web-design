import React, { useState } from 'react';
import { User, ForumPost } from '../types';

interface VolunteerForumProps {
  user: User;
  onLoginClick: () => void;
  posts: ForumPost[];
  onPostCreate: (post: Omit<ForumPost, 'id' | 'date' | 'replies'>) => void;
}

export const VolunteerForum: React.FC<VolunteerForumProps> = ({ user, onLoginClick, posts, onPostCreate }) => {
  const [isPosting, setIsPosting] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newCategory, setNewCategory] = useState<ForumPost['category']>('SHARING');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;
    
    onPostCreate({
      title: newTitle,
      content: newContent,
      author: user.name || 'Anonymous',
      category: newCategory
    });
    
    setNewTitle('');
    setNewContent('');
    setIsPosting(false);
  };

  const getCategoryLabel = (cat: string) => {
    switch(cat) {
      case 'NOTICE': return { text: '公告', color: 'bg-red-100 text-red-700' };
      case 'RECRUIT': return { text: '招募', color: 'bg-green-100 text-green-700' };
      case 'QNA': return { text: '问答', color: 'bg-blue-100 text-blue-700' };
      default: return { text: '交流', color: 'bg-gray-100 text-gray-700' };
    }
  };

  // Not Logged In View
  if (!user.isLoggedIn) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center bg-monk-50/30 px-4 animate-fade-in">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-10 text-center border border-monk-100">
          <div className="w-20 h-20 bg-monk-100 rounded-full flex items-center justify-center mx-auto mb-6 text-monk-700">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-serif font-bold text-gray-800 mb-2">义工天地</h2>
          <p className="text-gray-500 mb-8">
            此处为大觉寺义工内部交流平台。<br/>
            请登录后查看法务公告、义工招募及修学心得。
          </p>
          <button 
            onClick={onLoginClick}
            className="w-full py-3 bg-monk-700 text-white rounded-lg font-medium hover:bg-monk-800 transition-colors shadow-lg shadow-monk-700/20"
          >
            立即登录
          </button>
        </div>
      </div>
    );
  }

  // Logged In View
  return (
    <div className="min-h-screen bg-monk-50/30 py-12 animate-fade-in">
      <div className="max-w-5xl mx-auto px-4">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
          <div>
            <h2 className="text-3xl font-serif font-bold text-monk-900">义工天地</h2>
            <p className="text-gray-600 mt-2">护持三宝，积集资粮，广结善缘。</p>
          </div>
          <button 
            onClick={() => setIsPosting(!isPosting)}
            className="px-6 py-2 bg-monk-700 text-white rounded-full hover:bg-monk-800 transition-colors shadow-md flex items-center gap-2"
          >
            {isPosting ? '取消发布' : '发布新帖'}
            {!isPosting && (
               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
            )}
          </button>
        </div>

        {/* Posting Form */}
        {isPosting && (
          <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 mb-8 animate-fade-in-up">
            <h3 className="text-lg font-bold text-gray-800 mb-4">发布新话题</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-4 gap-4">
                <div className="md:col-span-3">
                   <input
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="标题"
                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-monk-200 outline-none"
                    required
                  />
                </div>
                <div>
                   <select 
                     value={newCategory}
                     onChange={(e) => setNewCategory(e.target.value as any)}
                     className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-monk-200 outline-none bg-white"
                   >
                     <option value="SHARING">心得交流</option>
                     <option value="QNA">提问互助</option>
                     <option value="RECRUIT">义工招募</option>
                   </select>
                </div>
              </div>
              <textarea
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                placeholder="内容..."
                rows={5}
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-monk-200 outline-none resize-none"
                required
              />
              <div className="flex justify-end">
                <button 
                  type="submit"
                  className="px-8 py-2 bg-monk-700 text-white rounded-lg hover:bg-monk-800 transition-colors"
                >
                  发布
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Post List */}
        <div className="space-y-4">
          {posts.map(post => {
            const catStyle = getCategoryLabel(post.category);
            return (
              <div key={post.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow group cursor-pointer">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-3">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${catStyle.color}`}>
                      {catStyle.text}
                    </span>
                    <h3 className="text-xl font-bold text-gray-800 group-hover:text-monk-700 transition-colors">
                      {post.title}
                    </h3>
                  </div>
                  <span className="text-sm text-gray-400">{post.date}</span>
                </div>
                
                <p className="text-gray-600 leading-relaxed mb-4 line-clamp-3">
                  {post.content}
                </p>

                <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-gray-50">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-monk-100 flex items-center justify-center text-monk-700 text-xs font-bold">
                      {post.author.charAt(0)}
                    </div>
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1 hover:text-gray-700">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                      {post.replies || 0} 回复
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};