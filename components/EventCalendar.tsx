import React, { useState } from 'react';
import { EventItem } from '../types';

interface EventCalendarProps {
  events: EventItem[];
}

export const EventCalendar: React.FC<EventCalendarProps> = ({ events }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  // Helper to get days in month
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // Helper to get first day of month (0-6, 0 is Sunday)
  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth(); // 0-11

  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const emptyDays = Array.from({ length: firstDay }, (_, i) => i);

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
    setSelectedDate(null);
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
    setSelectedDate(null);
  };

  const formatDate = (y: number, m: number, d: number) => {
    return `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
  };

  const getEventsForDate = (dateStr: string) => {
    return events.filter(e => e.date === dateStr);
  };

  // Get all events for current month to list below if no date selected
  const currentMonthEvents = events.filter(e => {
    const eDate = new Date(e.date);
    return eDate.getMonth() === month && eDate.getFullYear() === year;
  }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const displayEvents = selectedDate 
    ? events.filter(e => e.date === selectedDate)
    : currentMonthEvents;

  const categories = {
    ceremony: { label: '法会', color: 'bg-red-100 text-red-800 border-red-200' },
    meditation: { label: '禅修', color: 'bg-green-100 text-green-800 border-green-200' },
    class: { label: '课程', color: 'bg-blue-100 text-blue-800 border-blue-200' },
    festival: { label: '节日', color: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 animate-fade-in">
       <div className="bg-monk-50/50 py-12 text-center mb-12 rounded-3xl border border-monk-100">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-monk-900 mb-4">法务行事历</h2>
        <p className="text-gray-500">
          晨钟暮鼓，佛事庄严。<br/>欢迎各位善信大德随喜参加，共沾法益。
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Left: Calendar Grid */}
        <div className="lg:w-1/2">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            {/* Header */}
            <div className="bg-monk-700 text-white p-6 flex justify-between items-center">
              <button onClick={prevMonth} className="p-2 hover:bg-white/20 rounded-full transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              </button>
              <h3 className="text-2xl font-serif font-bold tracking-widest">
                {year}年 {month + 1}月
              </h3>
              <button onClick={nextMonth} className="p-2 hover:bg-white/20 rounded-full transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>

            {/* Grid */}
            <div className="p-6">
              <div className="grid grid-cols-7 mb-4">
                {['日', '一', '二', '三', '四', '五', '六'].map(d => (
                  <div key={d} className="text-center text-sm font-medium text-gray-400 py-2">
                    {d}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-2">
                {emptyDays.map((_, i) => <div key={`empty-${i}`} />)}
                {daysArray.map(d => {
                  const dateStr = formatDate(year, month, d);
                  const dayEvents = getEventsForDate(dateStr);
                  const hasEvent = dayEvents.length > 0;
                  const isSelected = selectedDate === dateStr;
                  const isToday = dateStr === new Date().toISOString().split('T')[0];

                  return (
                    <button
                      key={d}
                      onClick={() => setSelectedDate(isSelected ? null : dateStr)}
                      className={`
                        relative h-12 md:h-16 rounded-lg flex flex-col items-center justify-center border transition-all
                        ${isSelected 
                          ? 'bg-monk-700 text-white border-monk-700 shadow-md' 
                          : hasEvent 
                            ? 'bg-monk-50 border-monk-200 text-monk-900 hover:border-monk-400' 
                            : 'bg-white border-transparent text-gray-600 hover:bg-gray-50'
                        }
                        ${isToday && !isSelected ? 'font-bold text-monk-700 border-monk-300' : ''}
                      `}
                    >
                      <span className="text-sm">{d}</span>
                      {hasEvent && (
                        <div className="flex gap-1 mt-1">
                           <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-white' : 'bg-monk-500'}`}></span>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
          
          {/* Legend */}
          <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-400"></span> 法会
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-green-400"></span> 禅修
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-blue-400"></span> 课程
            </div>
          </div>
        </div>

        {/* Right: Event List */}
        <div className="lg:w-1/2">
          <div className="flex justify-between items-end mb-6 border-b border-gray-200 pb-2">
            <h3 className="text-xl font-bold text-gray-800">
              {selectedDate ? `${selectedDate} 活动详情` : '本月法务安排'}
            </h3>
            {selectedDate && (
              <button onClick={() => setSelectedDate(null)} className="text-sm text-monk-600 hover:text-monk-800">
                查看全部
              </button>
            )}
          </div>

          <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
            {displayEvents.length > 0 ? (
              displayEvents.map(event => {
                const cat = categories[event.category];
                return (
                  <div key={event.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex flex-col sm:flex-row gap-6">
                    <div className="flex-shrink-0 flex flex-col items-center justify-center w-16 h-16 bg-monk-50 rounded-lg border border-monk-100 text-monk-800">
                      <span className="text-xs font-bold uppercase">{new Date(event.date).toLocaleString('default', { month: 'short' })}</span>
                      <span className="text-2xl font-bold font-serif">{new Date(event.date).getDate()}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                         <h4 className="text-lg font-bold text-gray-800 font-serif">{event.title}</h4>
                         <span className={`px-2 py-0.5 text-xs rounded-full border ${cat.color}`}>
                           {cat.label}
                         </span>
                      </div>
                      <div className="text-sm text-gray-500 space-y-1 mb-3">
                         <div className="flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            {event.time}
                         </div>
                         <div className="flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                            {event.location}
                         </div>
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed border-l-2 border-gray-200 pl-3">
                        {event.description}
                      </p>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-300 text-gray-500">
                <p>该日期暂无活动安排</p>
                <button onClick={() => setSelectedDate(null)} className="text-monk-600 text-sm mt-2 hover:underline">查看本月所有活动</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};