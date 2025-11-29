import React, { useState } from 'react';
import { DonationItem } from '../types';

interface DonationFormProps {
  item: DonationItem;
  onBack: () => void;
}

export const DonationForm: React.FC<DonationFormProps> = ({ item, onBack }) => {
  const [step, setStep] = useState(1);
  const [amount, setAmount] = useState<number>(item.minAmount);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [donorName, setDonorName] = useState('');
  const [wishes, setWishes] = useState('');
  const [receiptNeeded, setReceiptNeeded] = useState(false);

  // MikeCRM Style: Vertical flow, clear sections
  const predefinedAmounts = [
    item.minAmount, 
    item.minAmount * 2, 
    item.minAmount * 5, 
    item.minAmount * 10
  ];

  const handleDonate = () => {
    // Simulate processing
    setStep(3);
  };

  if (step === 3) {
    return (
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center animate-fade-in">
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
           <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
        </div>
        <h3 className="text-3xl font-serif text-monk-800 mb-4">随喜功德</h3>
        <p className="text-gray-600 mb-8">感谢您的护持，{donorName} 居士。<br/>您的善款将用于 {item.title} 项目。</p>
        <p className="text-sm text-gray-400">订单编号: DJ-{Math.floor(Math.random() * 1000000)}</p>
        <button 
          onClick={onBack}
          className="mt-8 px-8 py-3 bg-monk-700 text-white rounded-full hover:bg-monk-800 transition-colors"
        >
          返回功德列表
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden border border-gray-200 animate-fade-in-up">
      {/* Header with Image Background */}
      <div className="relative h-48 bg-monk-800">
         <img src={item.image} alt={item.title} className="w-full h-full object-cover opacity-40" />
         <div className="absolute inset-0 flex flex-col justify-end p-8">
           <button onClick={onBack} className="absolute top-6 left-6 text-white/80 hover:text-white flex items-center gap-2">
             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
             返回
           </button>
           <h2 className="text-3xl font-serif text-white font-bold">{item.title}</h2>
           <p className="text-monk-100 mt-2">{item.description}</p>
         </div>
      </div>

      <div className="p-8 md:p-12">
        <div className="space-y-10">
          
          {/* Section 1: Amount */}
          <section>
            <h4 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-monk-100 text-monk-800 flex items-center justify-center text-xs font-bold">1</span>
              随喜金额
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              {predefinedAmounts.map(amt => (
                <button
                  key={amt}
                  onClick={() => { setAmount(amt); setCustomAmount(''); }}
                  className={`py-3 px-4 rounded-lg border-2 transition-all font-medium ${
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
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">$</span>
              <input 
                type="number" 
                placeholder="输入其他金额"
                value={customAmount}
                onChange={(e) => {
                  setCustomAmount(e.target.value);
                  setAmount(Number(e.target.value));
                }}
                className={`w-full pl-8 pr-4 py-3 rounded-lg border-2 outline-none transition-all ${
                  customAmount ? 'border-monk-600 bg-monk-50' : 'border-gray-200 focus:border-monk-400'
                }`}
              />
            </div>
          </section>

          {/* Section 2: Donor Info */}
          <section>
             <h4 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-monk-100 text-monk-800 flex items-center justify-center text-xs font-bold">2</span>
              功德芳名
            </h4>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-500 mb-1">功德主姓名</label>
                <input 
                  type="text" 
                  value={donorName}
                  onChange={(e) => setDonorName(e.target.value)}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-monk-100 outline-none"
                  placeholder="请输入您的法名或俗名"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-500 mb-1">回向愿文 (选填)</label>
                <textarea 
                  rows={3}
                  value={wishes}
                  onChange={(e) => setWishes(e.target.value)}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-monk-100 outline-none resize-none"
                  placeholder="愿以此功德，普及于一切..."
                />
              </div>
            </div>
          </section>

          {/* Section 3: Options */}
          <section>
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <input 
                type="checkbox" 
                id="receipt"
                checked={receiptNeeded}
                onChange={(e) => setReceiptNeeded(e.target.checked)}
                className="w-5 h-5 text-monk-600 rounded focus:ring-monk-500 border-gray-300" 
              />
              <label htmlFor="receipt" className="text-gray-700 cursor-pointer select-none">需要抵税收据 (年度总额超过$20将自动发送)</label>
            </div>
          </section>

          {/* Submit */}
          <div className="pt-6 border-t border-gray-100">
            <button 
              onClick={handleDonate}
              disabled={!amount || !donorName}
              className="w-full py-4 bg-monk-700 text-white text-lg font-medium rounded-lg hover:bg-monk-800 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-monk-700/20 transition-all transform active:scale-[0.99]"
            >
               确认捐赠 ${amount || 0}
            </button>
            <p className="text-center text-xs text-gray-400 mt-4">
              所有的在线支付均经过加密处理，安全可靠。<br/>多伦多大觉寺是注册慈善机构。
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};