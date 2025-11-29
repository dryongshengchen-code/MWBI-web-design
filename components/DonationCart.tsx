
import React from 'react';
import { CartItem } from '../types';

interface DonationCartProps {
  items: CartItem[];
  onRemove: (id: string) => void;
  onUpdateQuantity: (id: string, newQuantity: number) => void;
  onCheckout: () => void;
  onContinueShopping: () => void;
}

export const DonationCart: React.FC<DonationCartProps> = ({
  items,
  onRemove,
  onUpdateQuantity,
  onCheckout,
  onContinueShopping
}) => {
  
  const totalAmount = items.reduce((sum, item) => sum + (item.selectedAmount * item.quantity), 0);

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center animate-fade-in">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-400">
           <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
        </div>
        <h2 className="text-2xl font-serif font-bold text-gray-800 mb-2">功德箱是空的</h2>
        <p className="text-gray-500 mb-8">您还没有选择任何功德项目。</p>
        <button 
          onClick={onContinueShopping}
          className="px-8 py-3 bg-monk-700 text-white rounded-full hover:bg-monk-800 transition-colors"
        >
          前往随喜
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 animate-fade-in">
      <h2 className="text-3xl font-serif font-bold text-monk-900 mb-8 text-center md:text-left">确认功德项目</h2>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items List */}
        <div className="flex-1 space-y-6">
          {items.map((item) => (
            <div key={item.uniqueId} className="bg-white rounded-xl p-4 md:p-6 shadow-sm border border-gray-100 flex flex-col md:flex-row items-start md:items-center gap-6">
              {/* Image */}
              <div className="w-full md:w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100 relative">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
              </div>
              
              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-lg font-bold text-gray-800 font-serif truncate">{item.title}</h3>
                  {item.isInstallment && (
                    <span className="bg-blue-100 text-blue-700 text-[10px] px-2 py-0.5 rounded-full font-bold">
                      分期付款
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-500 mb-2">{item.description.substring(0, 60)}...</p>
                <div className="text-monk-600 font-medium">
                  单价: ${item.selectedAmount}
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end">
                <div className="flex items-center border border-gray-200 rounded-lg">
                   <button 
                     onClick={() => onUpdateQuantity(item.uniqueId, Math.max(1, item.quantity - 1))}
                     className="px-3 py-1 hover:bg-gray-50 text-gray-600"
                   >
                     -
                   </button>
                   <span className="px-3 py-1 text-gray-800 font-medium border-l border-r border-gray-200 min-w-[2.5rem] text-center">
                     {item.quantity}
                   </span>
                   <button 
                     onClick={() => onUpdateQuantity(item.uniqueId, item.quantity + 1)}
                     className="px-3 py-1 hover:bg-gray-50 text-gray-600"
                   >
                     +
                   </button>
                </div>
                
                <div className="text-right min-w-[5rem]">
                   <div className="text-lg font-bold text-gray-800">${(item.selectedAmount * item.quantity).toLocaleString()}</div>
                </div>

                <button 
                  onClick={() => onRemove(item.uniqueId)}
                  className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                  title="Remove"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                </button>
              </div>
            </div>
          ))}

          <button 
             onClick={onContinueShopping}
             className="text-monk-600 hover:text-monk-800 font-medium flex items-center gap-2 mt-4"
          >
             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
             继续随喜其他项目
          </button>
        </div>

        {/* Summary Card */}
        <div className="lg:w-80 flex-shrink-0">
          <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 sticky top-24">
             <h3 className="text-lg font-serif font-bold text-gray-800 mb-6 border-b border-gray-100 pb-4">功德汇总</h3>
             
             <div className="flex justify-between items-center mb-2 text-gray-600">
               <span>项目数量</span>
               <span>{items.reduce((acc, item) => acc + item.quantity, 0)}</span>
             </div>
             
             <div className="flex justify-between items-center mb-6 text-xl font-bold text-monk-800 pt-4 border-t border-gray-100">
               <span>总计金额</span>
               <span>${totalAmount.toLocaleString()}</span>
             </div>

             <button 
               onClick={onCheckout}
               className="w-full py-4 bg-monk-700 text-white rounded-lg hover:bg-monk-800 transition-colors shadow-lg shadow-monk-700/20 font-medium mb-4"
             >
               确认支付
             </button>
             
             <p className="text-xs text-gray-400 text-center leading-relaxed">
               您的善款将全额用于指定项目。<br/>多伦多大觉寺是大乘正法道场。
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};
