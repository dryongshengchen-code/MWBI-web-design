
import React, { useState } from 'react';
import { CartItem } from '../types';

interface DonationCheckoutProps {
  cartItems: CartItem[];
  onBack: () => void;
  onSuccess: () => void;
}

export const DonationCheckout: React.FC<DonationCheckoutProps> = ({ cartItems, onBack, onSuccess }) => {
  const [step, setStep] = useState(1); // 1: Info Input, 2: Review, 3: Success
  const [donorName, setDonorName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [wishes, setWishes] = useState('');
  const [receiptNeeded, setReceiptNeeded] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'credit' | 'etransfer'>('credit');

  const totalAmount = cartItems.reduce((sum, item) => sum + (item.selectedAmount * item.quantity), 0);

  const handleToReview = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handleConfirmPayment = () => {
    // Simulate API call / Payment processing
    setTimeout(() => {
      setStep(3);
    }, 1000);
  };

  // Step 3: Success Page
  if (step === 3) {
    return (
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center animate-fade-in mt-12">
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
           <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
        </div>
        <h3 className="text-3xl font-serif text-monk-800 mb-4">随喜功德圆满</h3>
        <p className="text-gray-600 mb-8">
          感谢您的发心护持，{donorName} 居士。<br/>
          收据已发送至您的邮箱：{email}
        </p>
        <div className="bg-gray-50 p-6 rounded-xl text-left mb-8 text-sm text-gray-600">
           <p className="font-bold mb-2">捐赠明细：</p>
           <ul className="space-y-1 list-disc pl-5">
             {cartItems.map((item, idx) => (
               <li key={idx}>
                 {item.title} x {item.quantity} (${item.selectedAmount * item.quantity})
                 {item.isInstallment && <span className="text-blue-600 text-xs ml-2">[分期付款]</span>}
               </li>
             ))}
           </ul>
           <p className="mt-4 pt-4 border-t border-gray-200 text-right font-bold text-lg text-monk-800">总计: ${totalAmount}</p>
        </div>
        <button 
          onClick={onSuccess}
          className="mt-2 px-8 py-3 bg-monk-700 text-white rounded-full hover:bg-monk-800 transition-colors"
        >
          返回首页
        </button>
      </div>
    );
  }

  // Step 2: Confirmation / Review Page
  if (step === 2) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12 animate-fade-in">
         <button onClick={() => setStep(1)} className="flex items-center text-gray-500 hover:text-monk-700 mb-8 transition-colors">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            返回修改
         </button>

         <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
            <div className="bg-monk-700 px-8 py-6 text-white">
               <h2 className="text-2xl font-serif font-bold">确认捐赠信息</h2>
               <p className="opacity-80 mt-1">请核对以下信息无误后提交</p>
            </div>

            <div className="p-8 space-y-8">
               {/* Cart Summary */}
               <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                  <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">功德项目</h4>
                  <ul className="space-y-3">
                      {cartItems.map((item, idx) => (
                          <li key={idx} className="flex justify-between text-gray-800 text-sm md:text-base">
                              <span className="flex items-center gap-2">
                                {item.title} <span className="text-gray-500 text-sm">x {item.quantity}</span>
                                {item.isInstallment && <span className="bg-blue-100 text-blue-700 text-[10px] px-2 rounded-full">分期</span>}
                              </span>
                              <span className="font-medium">${item.selectedAmount * item.quantity}</span>
                          </li>
                      ))}
                  </ul>
                   <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200">
                      <span className="font-bold text-gray-800">总计金额</span>
                      <span className="text-xl font-bold text-monk-700">${totalAmount.toLocaleString()}</span>
                   </div>
               </div>

               {/* Info Grid */}
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                       <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">功德主信息</h4>
                       <div className="space-y-3 text-sm text-gray-800">
                          <p className="flex"><span className="text-gray-500 w-20 flex-shrink-0">姓名:</span> <span className="font-medium">{donorName}</span></p>
                          <p className="flex"><span className="text-gray-500 w-20 flex-shrink-0">邮箱:</span> <span className="font-medium">{email}</span></p>
                          {phone && <p className="flex"><span className="text-gray-500 w-20 flex-shrink-0">电话:</span> {phone}</p>}
                          <p className="flex"><span className="text-gray-500 w-20 flex-shrink-0">收据:</span> {receiptNeeded ? '需要' : '不需要'}</p>
                          {receiptNeeded && address && <p className="flex"><span className="text-gray-500 w-20 flex-shrink-0">地址:</span> {address}</p>}
                       </div>
                  </div>
                  
                  <div>
                       <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">支付方式</h4>
                       <div className="text-gray-800 font-medium mb-6">
                           {paymentMethod === 'credit' ? '信用卡支付 (Credit Card)' : 'E-Transfer 转账'}
                       </div>
                       
                       <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">回向愿文</h4>
                       <div className="text-gray-600 italic bg-monk-50 p-3 rounded-lg text-sm">
                           {wishes || "无"}
                       </div>
                  </div>
               </div>

               <div className="pt-6 border-t border-gray-100">
                 <button 
                     onClick={handleConfirmPayment}
                     className="w-full py-4 bg-monk-700 text-white rounded-lg font-bold text-lg hover:bg-monk-800 transition-colors shadow-lg shadow-monk-700/20"
                 >
                     确认并支付 ${totalAmount.toLocaleString()}
                 </button>
                 <p className="text-center text-xs text-gray-400 mt-4">
                    点击确认即表示您同意我们的捐赠条款。
                 </p>
               </div>
            </div>
         </div>
      </div>
    );
  }

  // Step 1: Input Form
  return (
    <div className="max-w-3xl mx-auto px-4 py-12 animate-fade-in">
      <button onClick={onBack} className="flex items-center text-gray-500 hover:text-monk-700 mb-8 transition-colors">
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
        返回购物车
      </button>

      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        <div className="bg-monk-700 px-8 py-6 text-white">
          <h2 className="text-2xl font-serif font-bold">填写功德芳名</h2>
          <p className="opacity-80 mt-1">总金额: ${totalAmount.toLocaleString()}</p>
        </div>

        <form onSubmit={handleToReview} className="p-8 space-y-8">
          {/* Section 1: Contact Info */}
          <section>
            <h4 className="text-lg font-bold text-gray-800 mb-4 pb-2 border-b border-gray-100">基本信息</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">功德主姓名 (必填)</label>
                <input 
                  type="text" 
                  value={donorName}
                  onChange={(e) => setDonorName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-monk-500 outline-none"
                  placeholder="请输入您的姓名"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">电子邮箱 (必填)</label>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-monk-500 outline-none"
                  placeholder="用于接收收据"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">联系电话</label>
                <input 
                  type="tel" 
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-monk-500 outline-none"
                  placeholder="(可选)"
                />
              </div>
            </div>
          </section>

          {/* Section 2: Receipt & Wishes */}
          <section>
            <h4 className="text-lg font-bold text-gray-800 mb-4 pb-2 border-b border-gray-100">更多选项</h4>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <input 
                  type="checkbox" 
                  id="receipt"
                  checked={receiptNeeded}
                  onChange={(e) => setReceiptNeeded(e.target.checked)}
                  className="w-5 h-5 text-monk-600 rounded focus:ring-monk-500 border-gray-300" 
                />
                <label htmlFor="receipt" className="text-gray-700 cursor-pointer select-none">需要抵税收据 (需提供详细地址)</label>
              </div>

              {receiptNeeded && (
                <div className="animate-fade-in">
                  <label className="block text-sm font-medium text-gray-700 mb-1">邮寄地址</label>
                  <input 
                    type="text" 
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-monk-500 outline-none"
                    placeholder="请输入完整的邮寄地址"
                    required={receiptNeeded}
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">回向愿文 (可选)</label>
                <textarea 
                  rows={3}
                  value={wishes}
                  onChange={(e) => setWishes(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-monk-500 outline-none resize-none"
                  placeholder="愿以此功德，回向..."
                />
              </div>
            </div>
          </section>

          {/* Section 3: Payment Method */}
          <section>
             <h4 className="text-lg font-bold text-gray-800 mb-4 pb-2 border-b border-gray-100">支付方式</h4>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div 
                  onClick={() => setPaymentMethod('credit')}
                  className={`p-4 border rounded-xl cursor-pointer flex items-center gap-3 transition-all ${
                    paymentMethod === 'credit' 
                    ? 'border-monk-600 bg-monk-50 ring-1 ring-monk-600' 
                    : 'border-gray-200 hover:bg-gray-50'
                  }`}
                >
                   <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${paymentMethod === 'credit' ? 'border-monk-600' : 'border-gray-300'}`}>
                      {paymentMethod === 'credit' && <div className="w-2.5 h-2.5 bg-monk-600 rounded-full" />}
                   </div>
                   <span className="font-medium text-gray-800">信用卡支付 (Credit Card)</span>
                </div>
                <div 
                  onClick={() => setPaymentMethod('etransfer')}
                  className={`p-4 border rounded-xl cursor-pointer flex items-center gap-3 transition-all ${
                    paymentMethod === 'etransfer' 
                    ? 'border-monk-600 bg-monk-50 ring-1 ring-monk-600' 
                    : 'border-gray-200 hover:bg-gray-50'
                  }`}
                >
                   <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${paymentMethod === 'etransfer' ? 'border-monk-600' : 'border-gray-300'}`}>
                      {paymentMethod === 'etransfer' && <div className="w-2.5 h-2.5 bg-monk-600 rounded-full" />}
                   </div>
                   <span className="font-medium text-gray-800">E-Transfer 转账</span>
                </div>
             </div>
             {paymentMethod === 'etransfer' && (
               <div className="mt-4 p-4 bg-blue-50 text-blue-800 rounded-lg text-sm">
                 请转账至: donate@manjuwisdom.org <br/>
                 备注: 请在转账备注中填写您的姓名。
               </div>
             )}
          </section>

          <button 
            type="submit"
            className="w-full py-4 bg-monk-700 text-white rounded-lg font-bold text-lg hover:bg-monk-800 transition-colors shadow-lg shadow-monk-700/20"
          >
            下一步：核对信息
          </button>
        </form>
      </div>
    </div>
  );
};
