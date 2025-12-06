import React, { useState } from 'react';
import { EventItem, DonationItem, SharingItem, CourseItem, DonationCategoryType } from '../types';

interface AdminDashboardProps {
  events: EventItem[];
  setEvents: React.Dispatch<React.SetStateAction<EventItem[]>>;
  donations: DonationItem[];
  setDonations: React.Dispatch<React.SetStateAction<DonationItem[]>>;
  sharing: SharingItem[];
  setSharing: React.Dispatch<React.SetStateAction<SharingItem[]>>;
  courses: CourseItem[];
  setCourses: React.Dispatch<React.SetStateAction<CourseItem[]>>;
}

type Tab = 'EVENTS' | 'DONATIONS' | 'SHARING' | 'COURSES';

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  events, setEvents,
  donations, setDonations,
  sharing, setSharing,
  courses, setCourses
}) => {
  const [activeTab, setActiveTab] = useState<Tab>('EVENTS');
  const [editingItem, setEditingItem] = useState<any>(null);
  const [isEditMode, setIsEditMode] = useState(false);

  // Generic Handlers
  const handleDelete = (id: string, type: Tab) => {
    if (!window.confirm('确定要删除吗？')) return;
    switch(type) {
      case 'EVENTS': setEvents(prev => prev.filter(i => i.id !== id)); break;
      case 'DONATIONS': setDonations(prev => prev.filter(i => i.id !== id)); break;
      case 'SHARING': setSharing(prev => prev.filter(i => i.id !== id)); break;
      case 'COURSES': setCourses(prev => prev.filter(i => i.id !== id)); break;
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    const saveAction = (setter: any, list: any[]) => {
      if (isEditMode) {
        setter(list.map(i => i.id === editingItem.id ? editingItem : i));
      } else {
        setter([{ ...editingItem, id: Date.now().toString() }, ...list]);
      }
    };

    switch(activeTab) {
      case 'EVENTS': saveAction(setEvents, events); break;
      case 'DONATIONS': saveAction(setDonations, donations); break;
      case 'SHARING': saveAction(setSharing, sharing); break;
      case 'COURSES': saveAction(setCourses, courses); break;
    }

    setEditingItem(null);
    setIsEditMode(false);
  };

  const startEdit = (item: any) => {
    setEditingItem(item);
    setIsEditMode(true);
  };

  const startCreate = () => {
    setEditingItem({});
    setIsEditMode(false);
  };

  const renderForm = () => {
    if (!editingItem) return null;

    const commonClasses = "w-full p-2 border border-gray-300 rounded mb-4";
    const labelClasses = "block text-sm font-bold mb-1";

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <h3 className="text-xl font-bold mb-4">{isEditMode ? '编辑' : '新建'} {activeTab}</h3>
          <form onSubmit={handleSave}>
            
            {/* Dynamic Fields based on Type */}
            {activeTab === 'EVENTS' && (
              <>
                <label className={labelClasses}>标题</label>
                <input className={commonClasses} value={editingItem.title || ''} onChange={e => setEditingItem({...editingItem, title: e.target.value})} required />
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={labelClasses}>日期 (YYYY-MM-DD)</label>
                    <input type="date" className={commonClasses} value={editingItem.date || ''} onChange={e => setEditingItem({...editingItem, date: e.target.value})} required />
                  </div>
                  <div>
                    <label className={labelClasses}>时间</label>
                    <input className={commonClasses} value={editingItem.time || ''} onChange={e => setEditingItem({...editingItem, time: e.target.value})} required />
                  </div>
                </div>
                <label className={labelClasses}>地点</label>
                <input className={commonClasses} value={editingItem.location || ''} onChange={e => setEditingItem({...editingItem, location: e.target.value})} required />
                <label className={labelClasses}>类别</label>
                <select className={commonClasses} value={editingItem.category || 'ceremony'} onChange={e => setEditingItem({...editingItem, category: e.target.value})}>
                  <option value="ceremony">法会</option>
                  <option value="meditation">禅修</option>
                  <option value="class">课程</option>
                  <option value="festival">节日</option>
                </select>
                <label className={labelClasses}>描述</label>
                <textarea className={commonClasses} rows={3} value={editingItem.description || ''} onChange={e => setEditingItem({...editingItem, description: e.target.value})} />
              </>
            )}

            {activeTab === 'DONATIONS' && (
              <>
                <label className={labelClasses}>项目名称</label>
                <input className={commonClasses} value={editingItem.title || ''} onChange={e => setEditingItem({...editingItem, title: e.target.value})} required />
                <label className={labelClasses}>图片链接</label>
                <input className={commonClasses} value={editingItem.image || ''} onChange={e => setEditingItem({...editingItem, image: e.target.value})} required />
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={labelClasses}>最低金额 ($)</label>
                    <input type="number" className={commonClasses} value={editingItem.minAmount || 0} onChange={e => setEditingItem({...editingItem, minAmount: Number(e.target.value)})} required />
                  </div>
                  <div>
                    <label className={labelClasses}>类别</label>
                    <select className={commonClasses} value={editingItem.category || 'charity'} onChange={e => setEditingItem({...editingItem, category: e.target.value as DonationCategoryType})}>
                      <option value="charity">常规/慈善</option>
                      <option value="dharma">法会</option>
                      <option value="construction">建寺</option>
                      <option value="academy">助学</option>
                    </select>
                  </div>
                </div>
                 <div className="mb-4">
                    <label className="flex items-center gap-2">
                      <input type="checkbox" checked={editingItem.allowInstallment || false} onChange={e => setEditingItem({...editingItem, allowInstallment: e.target.checked})} />
                      允许分期付款
                    </label>
                 </div>
                <label className={labelClasses}>描述</label>
                <textarea className={commonClasses} rows={3} value={editingItem.description || ''} onChange={e => setEditingItem({...editingItem, description: e.target.value})} />
              </>
            )}

            {activeTab === 'SHARING' && (
              <>
                <label className={labelClasses}>标题</label>
                <input className={commonClasses} value={editingItem.title || ''} onChange={e => setEditingItem({...editingItem, title: e.target.value})} required />
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={labelClasses}>作者</label>
                    <input className={commonClasses} value={editingItem.author || ''} onChange={e => setEditingItem({...editingItem, author: e.target.value})} required />
                  </div>
                  <div>
                    <label className={labelClasses}>日期</label>
                    <input type="date" className={commonClasses} value={editingItem.date || ''} onChange={e => setEditingItem({...editingItem, date: e.target.value})} required />
                  </div>
                </div>
                <label className={labelClasses}>标签</label>
                <input className={commonClasses} value={editingItem.tag || ''} onChange={e => setEditingItem({...editingItem, tag: e.target.value})} required />
                <label className={labelClasses}>图片链接</label>
                <input className={commonClasses} value={editingItem.image || ''} onChange={e => setEditingItem({...editingItem, image: e.target.value})} />
                <label className={labelClasses}>内容</label>
                <textarea className={commonClasses} rows={6} value={editingItem.content || ''} onChange={e => setEditingItem({...editingItem, content: e.target.value})} required />
              </>
            )}

            {activeTab === 'COURSES' && (
              <>
                <label className={labelClasses}>课程名称</label>
                <input className={commonClasses} value={editingItem.title || ''} onChange={e => setEditingItem({...editingItem, title: e.target.value})} required />
                <label className={labelClasses}>标签 (逗号分隔)</label>
                <input className={commonClasses} value={editingItem.tags?.join(',') || ''} onChange={e => setEditingItem({...editingItem, tags: e.target.value.split(',')})} placeholder="招生中, 每周六" />
                <label className={labelClasses}>颜色主题</label>
                <select className={commonClasses} value={editingItem.color || 'blue'} onChange={e => setEditingItem({...editingItem, color: e.target.value})}>
                  <option value="green">绿色 (招生中)</option>
                  <option value="blue">蓝色 (常规)</option>
                  <option value="orange">橙色 (实修)</option>
                  <option value="purple">紫色 (特别)</option>
                </select>
                <label className={labelClasses}>简介</label>
                <textarea className={commonClasses} rows={3} value={editingItem.description || ''} onChange={e => setEditingItem({...editingItem, description: e.target.value})} required />
              </>
            )}

            <div className="flex justify-end gap-3 mt-6">
              <button type="button" onClick={() => setEditingItem(null)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">取消</button>
              <button type="submit" className="px-6 py-2 bg-monk-700 text-white rounded hover:bg-monk-800">保存</button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const renderTable = () => {
    let data: any[] = [];
    switch(activeTab) {
      case 'EVENTS': data = events; break;
      case 'DONATIONS': data = donations; break;
      case 'SHARING': data = sharing; break;
      case 'COURSES': data = courses; break;
    }

    return (
      <div className="overflow-x-auto bg-white rounded-lg shadow border border-gray-200">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 text-gray-500 font-medium border-b border-gray-200">
            <tr>
              <th className="p-4">名称 / 标题</th>
              <th className="p-4">描述 / 日期</th>
              <th className="p-4 text-right">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {data.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="p-4 font-medium text-gray-800">{item.title}</td>
                <td className="p-4 text-gray-500 truncate max-w-xs">{item.description || item.date}</td>
                <td className="p-4 text-right space-x-2">
                  <button onClick={() => startEdit(item)} className="text-blue-600 hover:text-blue-800">编辑</button>
                  <button onClick={() => handleDelete(item.id, activeTab)} className="text-red-500 hover:text-red-700">删除</button>
                </td>
              </tr>
            ))}
            {data.length === 0 && (
              <tr>
                <td colSpan={3} className="p-8 text-center text-gray-400">暂无数据</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20 animate-fade-in">
      {/* Header */}
      <div className="bg-monk-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-serif font-bold">网站管理后台</h1>
          <p className="text-monk-200 mt-2">弘法利生，严谨细致。</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-8">
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-2 flex gap-2 overflow-x-auto">
          {[
            { id: 'EVENTS', label: '法务行事历' },
            { id: 'DONATIONS', label: '功德护持' },
            { id: 'SHARING', label: '善行分享' },
            { id: 'COURSES', label: '佛学课程' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as Tab)}
              className={`px-6 py-3 rounded-lg font-medium transition-all whitespace-nowrap ${
                activeTab === tab.id
                ? 'bg-monk-700 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="mt-8">
           <div className="flex justify-between items-center mb-6">
             <h2 className="text-xl font-bold text-gray-800">{
                activeTab === 'EVENTS' ? '行事历管理' :
                activeTab === 'DONATIONS' ? '功德项目管理' :
                activeTab === 'SHARING' ? '分享文章管理' : '课程管理'
             }</h2>
             <button 
               onClick={startCreate}
               className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2 shadow-sm"
             >
               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
               新建项目
             </button>
           </div>
           {renderTable()}
        </div>
      </div>
      
      {renderForm()}
    </div>
  );
};
