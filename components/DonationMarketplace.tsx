
import React, { useState } from 'react';
import { DonationItem, CartItem } from '../types';

interface DonationMarketplaceProps {
  items: DonationItem[];
  onAddToCart: (item: DonationItem, amount: number, quantity: number, isInstallment: boolean) => void;
  onViewCart: () => void;
  cartItemCount: number;
}

type CategoryTab = 'ALL' | 'GENERAL' | 'CEREMONY' | 'CONSTRUCTION';

export const DonationMarketplace: React.FC<DonationMarketplaceProps> = ({ 
  items, 
  onAddToCart, 
  onViewCart,
  cartItemCount
}) => {
  const [activeTab, setActiveTab] = useState<CategoryTab>('ALL');
  const [selectedItem, setSelectedItem] = useState<DonationItem | null>(null);
  
  // Modal State
  const [amount, setAmount] = useState<number>(0);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [isInstallment, setIsInstallment] = useState(false);

  const filterItems = () => {
    switch (activeTab) {
      case 'GENERAL':
        return items.filter(i => i.category === 'charity' || i.category === 'academy');
      case 'CEREMONY':
        return items.filter(i => i.category === 'dharma');
      case 'CONSTRUCTION':
        return items.filter(i => i.category === 'construction');
      default:
        return items;
    }
  };

  const openModal = (item: DonationItem) => {
    setSelectedItem(item);
    setAmount(item.minAmount);
    setCustomAmount('');
    setQuantity(1);
    setIsInstallment(false);
  };

  const handleAddToCart = () => {
    if (selectedItem && amount > 0) {
      onAddToCart(selectedItem, amount, quantity, isInstallment);
      setSelectedItem(null);
    }
  };

  const tabs: {id: CategoryTab, label: string}[] = [
    { id: 'ALL', label: '全部项目' },
    { id: 'GENERAL', label: '常规捐款' },
    { id: 'CEREMONY', label: '法会捐款' },
    { id: 'CONSTRUCTION', label: '建寺捐款' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 animate-fade-in relative">
      
      {/* Header & Cart Button */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
        <div className="text-center md:text-left">
          <h2 className="text-3xl font-serif font-bold text-monk-900">功德护持</h2>
          <p className="text-gray-500 mt-2">广种福田，利乐有情</p>
        </div>
        
        <button 
          onClick={onViewCart}
          className="group relative flex items-center gap-3 px-6 py-3 bg-monk-700 text-white rounded-full hover:bg-monk-800 transition-all shadow-lg hover:shadow-monk-700/30"
        >
          <div className="relative">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center animate-bounce">
                {cartItemCount}
              </span>
            )}
          </div>
          <span className="font-medium">查看功德箱</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex justify-center mb-10 overflow-x-auto">
        <div className="flex bg-gray-100 p-1 rounded-xl">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                activeTab === tab.id 
                  ? 'bg-white text-monk-800 shadow-sm' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filterItems().map((item) => {
          const imgPos = item.imagePosition === 'top' ? 'object-top' : item.imagePosition === 'bottom' ? 'object-bottom' : 'object-center';
          return (
            <div 
              key={item.id} 
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col group"
            >
              <div className="h-56 overflow-hidden relative">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ${imgPos}`}
                />
                <div className="absolute top-4 right-4">
                  <span className="bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-monk-700 shadow-sm">
                    {item.category === 'construction' && '🏗️ 建寺'}
                    {item.category === 'dharma' && '🕯️ 法会'}
                    {item.category === 'charity' && '🤲 慈善'}
                    {item.category === 'academy' && '📖 助学'}
                  </span>
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-gray-800 mb-2 font-serif">{item.title}</h3>
                <p className="text-gray-500 text-sm mb-6 line-clamp-3 flex-1 leading-relaxed">
                  {item.description}
                </p>
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
                  <span className="text-monk-600 font-bold text-lg">${item.minAmount} <span className="text-xs font-normal text-gray-400">起</span></span>
                  <button 
                    onClick={() => openModal(item)}
                    className="px-4 py-2 bg-monk-50 text-monk-700 font-medium rounded-lg hover:bg-monk-700 hover:text-white transition-colors flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                    随喜
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add to Cart Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-fade-in-up">
            <div className="bg-monk-700 p-6 flex justify-between items-start">
               <div>
                  <h3 className="text-xl font-serif font-bold text-white">{selectedItem.title}</h3>
                  <p className="text-monk-200 text-sm mt-1">请选择随喜金额与数量</p>
               </div>
               <button onClick={() => setSelectedItem(null)} className="text-white/70 hover:text-white">
                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
               </button>
            </div>
            
            <div className="p-8 space-y-8">
               {/* Amount Selection */}
               <div>
                 <label className="block text-sm font-medium text-gray-700 mb-3">随喜金额 (单份)</label>
                 <div className="grid grid-cols-3 gap-3 mb-3">
                    {[selectedItem.minAmount, selectedItem.minAmount * 2, selectedItem.minAmount * 5].map(amt => (
                      <button
                        key={amt}
                        onClick={() => { setAmount(amt); setCustomAmount(''); }}
                        className={`py-2 px-3 rounded-lg border transition-all text-sm font-medium ${
                          amount === amt && customAmount === ''
                            ? 'border-monk-600 bg-monk-50 text-monk-800' 
                            : 'border-gray-200 hover:border-monk-300 text-gray-600'
                        }`}
                      >
                        ${amt}
                      </button>
                    ))}
                 </div>
                 <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                    <input 
                      type="number" 
                      placeholder="输入其他金额"
                      value={customAmount}
                      onChange={(e) => {
                        setCustomAmount(e.target.value);
                        setAmount(Number(e.target.value));
                      }}
                      className={`w-full pl-7 pr-4 py-2 rounded-lg border outline-none transition-all ${
                        customAmount ? 'border-monk-600 bg-monk-50' : 'border-gray-200 focus:border-monk-400'
                      }`}
                    />
                 </div>
               </div>

               {/* Quantity */}
               <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">数量</label>
                  <div className="flex items-center gap-4">
                     <button 
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 text-gray-600"
                     >
                       -
                     </button>
                     <span className="text-xl font-bold text-gray-800 w-12 text-center">{quantity}</span>
                     <button 
                        onClick={() => setQuantity(quantity + 1)}
                        className="w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 text-gray-600"
                     >
                       +
                     </button>
                  </div>
               </div>
               
               {/* Installment Option */}
               {selectedItem.allowInstallment && (
                 <div className="p-4 bg-blue-50 border border-blue-100 rounded-lg">
                   <label className="flex items-start cursor-pointer gap-3">
                     <div className="flex items-center h-5">
                       <input 
                         type="checkbox" 
                         checked={isInstallment} 
                         onChange={(e) => setIsInstallment(e.target.checked)}
                         className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500 border-gray-300"
                       />
                     </div>
                     <div>
                       <span className="font-bold text-blue-800 block text-sm">申请分期付款 (Installment Plan)</span>
                       <span className="text-xs text-blue-600 block mt-1">
                         若勾选此项，所填金额为功德总额。寺院将协助您安排分期支付事宜。
                       </span>
                     </div>
                   </label>
                 </div>
               )}

               {/* Total */}
               <div className="flex justify-between items-center pt-6 border-t border-gray-100">
                  <div className="text-gray-500">
                     总计: <span className="text-2xl font-bold text-monk-700">${(amount * quantity).toLocaleString()}</span>
                  </div>
                  <button 
                    onClick={handleAddToCart}
                    disabled={amount <= 0}
                    className="px-8 py-3 bg-monk-700 text-white rounded-lg hover:bg-monk-800 transition-colors shadow-lg shadow-monk-700/20 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    加入功德箱
                  </button>
               </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
