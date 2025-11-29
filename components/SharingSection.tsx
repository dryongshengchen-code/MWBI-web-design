
import React from 'react';
import { SharingItem } from '../types';

interface SharingSectionProps {
  items: SharingItem[];
  onReact: (id: string, type: 'sadhu' | 'rejoice' | 'zen') => void;
}

export const SharingSection: React.FC<SharingSectionProps> = ({ items, onReact }) => {
  return (
    <div className="min-h-screen bg-monk-50/30 animate-fade-in">
      {/* Header */}
      <div className="bg-white pt-16 pb-12 border-b border-monk-100">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <span className="text-monk-600 font-bold tracking-widest text-sm uppercase mb-2 block">Student Testimonials</span>
          <h2 className="text-4xl font-serif font-bold text-monk-900 mb-6">善行分享</h2>
          <p className="text-gray-600 text-lg leading-relaxed max-w-2xl mx-auto">
            "独学而无友，则孤陋而寡闻。" <br/>
            在这里，我们分享学员们在修学佛法、护持道场中的心得体会。愿这些真实的生命故事，成为您修行路上的助伴。
          </p>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item) => (
            <div 
              key={item.id} 
              className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col group border border-gray-100"
            >
              {item.image && (
                <div className="h-48 overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              )}
              
              <div className="p-8 flex-1 flex flex-col">
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-3 py-1 bg-monk-50 text-monk-700 text-xs rounded-full font-medium tracking-wide">
                    {item.tag}
                  </span>
                  <span className="text-gray-400 text-xs">{item.date}</span>
                </div>
                
                <h3 className="text-xl font-bold font-serif text-gray-900 mb-3 group-hover:text-monk-700 transition-colors">
                  {item.title}
                </h3>
                
                <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-1 line-clamp-4">
                  {item.content}
                </p>
                
                {/* Reaction Bar */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-50 mt-auto">
                   <div className="flex gap-4">
                      <button 
                        onClick={() => onReact(item.id, 'sadhu')}
                        className="flex items-center gap-1 text-xs text-gray-500 hover:text-monk-700 transition-colors group/reaction"
                        title="随喜 (Sadhu)"
                      >
                         <span className="text-lg group-hover/reaction:scale-125 transition-transform">🙏</span>
                         <span>{item.reactions?.sadhu || 0}</span>
                      </button>
                      <button 
                        onClick={() => onReact(item.id, 'rejoice')}
                        className="flex items-center gap-1 text-xs text-gray-500 hover:text-red-600 transition-colors group/reaction"
                        title="赞叹 (Rejoice)"
                      >
                         <span className="text-lg group-hover/reaction:scale-125 transition-transform">❤️</span>
                         <span>{item.reactions?.rejoice || 0}</span>
                      </button>
                      <button 
                        onClick={() => onReact(item.id, 'zen')}
                        className="flex items-center gap-1 text-xs text-gray-500 hover:text-green-600 transition-colors group/reaction"
                        title="清凉 (Zen)"
                      >
                         <span className="text-lg group-hover/reaction:scale-125 transition-transform">🌸</span>
                         <span>{item.reactions?.zen || 0}</span>
                      </button>
                   </div>
                </div>

                <div className="flex items-center justify-between pt-4 mt-2">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-monk-200 flex items-center justify-center text-monk-700 font-bold text-[10px]">
                      {item.author.charAt(0)}
                    </div>
                    <span className="text-xs text-gray-500 font-medium">{item.author}</span>
                  </div>
                  <button className="text-monk-600 text-sm hover:text-monk-800 font-medium flex items-center gap-1 group/btn">
                    阅读全文 
                    <svg className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Call to Action */}
        <div className="mt-16 text-center">
           <div className="inline-block p-8 bg-white rounded-2xl shadow-sm border border-monk-100 max-w-2xl">
              <h4 className="text-xl font-serif font-bold text-monk-800 mb-3">您也有心得想分享吗？</h4>
              <p className="text-gray-600 mb-6">注册登录后，在个人中心提交您的修学感悟，与大众结缘。</p>
              <button className="px-8 py-3 bg-monk-700 text-white rounded-lg hover:bg-monk-800 transition-colors">
                 我要投稿
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};
