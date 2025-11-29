
import React, { useState } from 'react';
import { User } from '../types';

interface UserDashboardProps {
  user: User;
}

type Tab = 'SUBMIT' | 'STUDY_SHARE' | 'PROFILE' | 'RECEIPTS' | 'DOWNLOADS';

export const UserDashboard: React.FC<UserDashboardProps> = ({ user }) => {
  const [activeTab, setActiveTab] = useState<Tab>('SUBMIT');

  // Submit Deeds Form State
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Submit Study Insights Form State
  const [studyTitle, setStudyTitle] = useState('');
  const [studyContent, setStudyContent] = useState('');
  const [studyImage, setStudyImage] = useState(''); // Optional image URL
  const [studyFile, setStudyFile] = useState<File | null>(null); // Attachment
  const [studySubmitted, setStudySubmitted] = useState(false);

  // Mock Data
  const receipts = [
    { id: 'R001', date: '2024-02-15', item: '全年光明灯', amount: 100 },
    { id: 'R002', date: '2024-01-08', item: '建寺安僧基金', amount: 50 },
    { id: 'R003', date: '2023-12-20', item: '随喜法会', amount: 20 },
  ];

  const downloads = [
    { id: 'D001', title: '菩提道次第广论 (PDF)', size: '15MB', type: 'book' },
    { id: 'D002', title: '心经修学入门 (Audio)', size: '45MB', type: 'audio' },
    { id: 'D003', title: '日常诵经课本 (PDF)', size: '5MB', type: 'book' },
    { id: 'D004', title: '大觉寺2024行事历', size: '2MB', type: 'doc' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleStudySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStudySubmitted(true);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'SUBMIT':
        return (
          <div className="animate-fade-in">
             <h3 className="text-xl font-serif font-bold text-gray-800 mb-6">提交善行分享</h3>
             {submitted ? (
               <div className="bg-green-50 border border-green-200 text-green-700 p-6 rounded-xl text-center">
                 <p className="font-bold text-lg mb-2">随喜赞叹！</p>
                 <p>您的善行分享已提交审核，审核通过后将发布。</p>
                 <button onClick={() => { setSubmitted(false); setTitle(''); setContent(''); }} className="mt-4 text-sm underline hover:text-green-800">提交另一篇</button>
               </div>
             ) : (
               <form onSubmit={handleSubmit} className="space-y-6">
                 <div>
                   <label className="block text-sm font-medium text-gray-700 mb-2">标题</label>
                   <input 
                      type="text" 
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-monk-200 outline-none"
                      placeholder="例如：参加周末义工的感悟"
                      required
                   />
                 </div>
                 <div>
                   <label className="block text-sm font-medium text-gray-700 mb-2">心得内容 (1000字以内)</label>
                   <textarea 
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      rows={8}
                      className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-monk-200 outline-none resize-y"
                      placeholder="请分享您的善行点滴..."
                      maxLength={1000}
                      required
                   />
                   <div className="text-right text-xs text-gray-400 mt-1">{content.length} / 1000</div>
                 </div>
                 <div>
                   <label className="block text-sm font-medium text-gray-700 mb-2">图片链接 (选填)</label>
                   <input 
                      type="url" 
                      value={image}
                      onChange={(e) => setImage(e.target.value)}
                      className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-monk-200 outline-none"
                      placeholder="https://..."
                   />
                 </div>
                 <button type="submit" className="px-6 py-3 bg-monk-700 text-white rounded-lg hover:bg-monk-800 transition-colors">
                   提交分享
                 </button>
               </form>
             )}
          </div>
        );
      case 'STUDY_SHARE':
        return (
          <div className="animate-fade-in">
             <h3 className="text-xl font-serif font-bold text-gray-800 mb-6">提交学修心得</h3>
             <p className="text-gray-500 mb-6 text-sm">分享您在研读经典、听闻佛法或日常修行中的感悟与体会。</p>
             {studySubmitted ? (
               <div className="bg-blue-50 border border-blue-200 text-blue-700 p-6 rounded-xl text-center">
                 <p className="font-bold text-lg mb-2">功德无量！</p>
                 <p>您的学修心得已成功提交。</p>
                 <button onClick={() => { setStudySubmitted(false); setStudyTitle(''); setStudyContent(''); setStudyFile(null); }} className="mt-4 text-sm underline hover:text-blue-800">提交另一篇</button>
               </div>
             ) : (
               <form onSubmit={handleStudySubmit} className="space-y-6">
                 <div>
                   <label className="block text-sm font-medium text-gray-700 mb-2">心得题目</label>
                   <input 
                      type="text" 
                      value={studyTitle}
                      onChange={(e) => setStudyTitle(e.target.value)}
                      className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-monk-200 outline-none"
                      placeholder="例如：《心经》研读心得"
                      required
                   />
                 </div>
                 <div>
                   <label className="block text-sm font-medium text-gray-700 mb-2">详细内容 (1000字以内)</label>
                   <textarea 
                      value={studyContent}
                      onChange={(e) => setStudyContent(e.target.value)}
                      rows={10}
                      className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-monk-200 outline-none resize-y"
                      placeholder="请输入您的详细心得体会..."
                      maxLength={1000}
                      required
                   />
                   <div className="text-right text-xs text-gray-400 mt-1">{studyContent.length} / 1000</div>
                 </div>
                 
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                       <label className="block text-sm font-medium text-gray-700 mb-2">配图链接 (可选)</label>
                       <input 
                          type="url" 
                          value={studyImage}
                          onChange={(e) => setStudyImage(e.target.value)}
                          className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-monk-200 outline-none"
                          placeholder="https://..."
                       />
                    </div>
                    <div>
                       <label className="block text-sm font-medium text-gray-700 mb-2">附件上传 (可选)</label>
                       <div className="relative">
                         <input 
                            type="file" 
                            onChange={(e) => setStudyFile(e.target.files ? e.target.files[0] : null)}
                            className="w-full text-sm text-gray-500 file:mr-4 file:py-3 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-monk-50 file:text-monk-700 hover:file:bg-monk-100 border border-gray-200 rounded-lg cursor-pointer"
                         />
                       </div>
                       <p className="text-xs text-gray-400 mt-1">支持 PDF, Word, 图片等格式。</p>
                    </div>
                 </div>

                 <button type="submit" className="px-6 py-3 bg-monk-700 text-white rounded-lg hover:bg-monk-800 transition-colors shadow-md">
                   提交心得
                 </button>
               </form>
             )}
          </div>
        );
      case 'PROFILE':
        return (
          <div className="animate-fade-in">
             <h3 className="text-xl font-serif font-bold text-gray-800 mb-6">个人信息</h3>
             <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 flex items-center gap-6">
               <div className="w-20 h-20 bg-monk-200 rounded-full flex items-center justify-center text-monk-700 text-3xl font-bold">
                 {user.name.charAt(0)}
               </div>
               <div>
                 <p className="text-sm text-gray-500 mb-1">法名 / 昵称</p>
                 <p className="text-xl font-bold text-gray-800 mb-2">{user.name}</p>
                 <p className="text-sm text-gray-500 mb-1">电子邮箱</p>
                 <p className="text-gray-800">{user.email}</p>
               </div>
             </div>
          </div>
        );
      case 'RECEIPTS':
        return (
          <div className="animate-fade-in">
             <h3 className="text-xl font-serif font-bold text-gray-800 mb-6">功德收据</h3>
             <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-gray-50 text-gray-500 text-sm">
                    <tr>
                      <th className="p-4 rounded-l-lg">日期</th>
                      <th className="p-4">项目</th>
                      <th className="p-4">金额</th>
                      <th className="p-4 rounded-r-lg text-right">操作</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {receipts.map(r => (
                      <tr key={r.id} className="hover:bg-gray-50 transition-colors">
                        <td className="p-4 text-gray-600">{r.date}</td>
                        <td className="p-4 font-medium text-gray-800">{r.item}</td>
                        <td className="p-4 text-monk-700">${r.amount}</td>
                        <td className="p-4 text-right">
                          <button className="text-sm text-blue-600 hover:underline">下载/打印</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
             </div>
          </div>
        );
      case 'DOWNLOADS':
        return (
          <div className="animate-fade-in">
             <h3 className="text-xl font-serif font-bold text-gray-800 mb-6">学习资料下载</h3>
             <div className="grid gap-4">
               {downloads.map(d => (
                 <div key={d.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:shadow-sm transition-shadow bg-white">
                   <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${d.type === 'audio' ? 'bg-purple-100 text-purple-600' : 'bg-orange-100 text-orange-600'}`}>
                        {d.type === 'audio' ? (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /></svg>
                        ) : (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                        )}
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800">{d.title}</h4>
                        <span className="text-xs text-gray-400">{d.size}</span>
                      </div>
                   </div>
                   <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 text-sm transition-colors">
                     下载
                   </button>
                 </div>
               ))}
             </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-monk-50/30">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Sidebar */}
          <div className="md:w-64 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden sticky top-24">
               <div className="p-6 bg-monk-700 text-white">
                 <p className="text-xs opacity-80 mb-1">欢迎回来</p>
                 <p className="font-bold text-lg truncate">{user.name}</p>
               </div>
               <nav className="p-2 space-y-1">
                 {[
                   { id: 'SUBMIT', label: '善行分享', icon: '✍️' },
                   { id: 'STUDY_SHARE', label: '学修心得', icon: '💡' },
                   { id: 'PROFILE', label: '个人信息', icon: '👤' },
                   { id: 'RECEIPTS', label: '功德记录', icon: '📜' },
                   { id: 'DOWNLOADS', label: '资料下载', icon: '📥' },
                 ].map((item) => (
                   <button
                     key={item.id}
                     onClick={() => setActiveTab(item.id as Tab)}
                     className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                       activeTab === item.id 
                       ? 'bg-monk-50 text-monk-800' 
                       : 'text-gray-600 hover:bg-gray-50'
                     }`}
                   >
                     <span className="text-lg">{item.icon}</span>
                     {item.label}
                   </button>
                 ))}
               </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
             <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 min-h-[500px]">
                {renderTabContent()}
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};
