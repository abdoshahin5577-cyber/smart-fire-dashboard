import React, { useState, useEffect } from 'react';
import { 
  Flame, Thermometer, Wind, ShieldAlert, ShieldCheck, 
  Droplets, DoorOpen, Power, PhoneCall, BellRing, Activity 
} from 'lucide-react';

export default function FireDashboard() {
  const [zones, setZones] = useState([
    { id: 1, name: 'المطبخ الرئيسي', temp: 28, smoke: 15, flame: false, status: 'safe' },
    { id: 2, name: 'مخزن المواد', temp: 24, smoke: 10, flame: false, status: 'safe' },
    { id: 3, name: 'غرفة السيرفرات', temp: 21, smoke: 5, flame: false, status: 'safe' },
  ]);

  const [controls, setControls] = useState({
    waterPump: false,
    emergencyDoors: false,
    powerCut: false,
  });

  const isEmergency = zones.some(zone => zone.status === 'danger');

  useEffect(() => {
    if (isEmergency) {
      setControls({
        waterPump: true,
        emergencyDoors: true,
        powerCut: true,
      });
    }
  }, [isEmergency]);

  const toggleSimulation = () => {
    if (!isEmergency) {
      setZones(zones.map(zone => 
        zone.id === 1 
          ? { ...zone, temp: 78, smoke: 85, flame: true, status: 'danger' } 
          : zone
      ));
    } else {
      setZones(zones.map(zone => ({
        ...zone, temp: 25, smoke: 12, flame: false, status: 'safe'
      })));
      setControls({ waterPump: false, emergencyDoors: false, powerCut: false });
    }
  };

  const toggleControl = (key) => {
    setControls(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div dir="rtl" className={`min-h-screen p-6 transition-colors duration-500 ${isEmergency ? 'bg-red-950 text-white' : 'bg-slate-900 text-slate-100'}`}>
      
      <header className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-700">
        <div className="flex items-center gap-3">
          <div className={`p-3 rounded-xl ${isEmergency ? 'bg-red-600 animate-bounce' : 'bg-emerald-600'}`}>
            <Flame className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">نظام الحماية الذكي والاستجابة الفورية</h1>
            <p className="text-sm text-slate-400">مراقبة حية للمستشعرات والتحكم في الطوارئ</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={toggleSimulation}
            className={`px-4 py-2 rounded-lg font-semibold transition ${isEmergency ? 'bg-emerald-600 hover:bg-emerald-500' : 'bg-amber-600 hover:bg-amber-500'}`}
          >
            {isEmergency ? 'إعادة ضبط النظام (وضع آمن)' : 'محاكاة إنذار حريق (اختبار)'}
          </button>
        </div>
      </header>

      {isEmergency && (
        <div className="my-6 p-4 bg-red-600 rounded-xl flex flex-wrap items-center justify-between gap-4 animate-pulse shadow-lg shadow-red-600/50">
          <div className="flex items-center gap-3">
            <BellRing className="w-8 h-8 text-white" />
            <div>
              <h2 className="text-xl font-bold">تحذير حرج: تم رصد حريق في (المطبخ الرئيسي)!</h2>
              <p className="text-sm text-red-100">تم تفعيل مضخات المياه، فتح أبواب الطوارئ، وفصل التيار الكهربائي تلقائياً.</p>
            </div>
          </div>
          <a href="tel:180" className="flex items-center gap-2 bg-white text-red-700 px-5 py-2.5 rounded-lg font-bold hover:bg-red-50">
            <PhoneCall className="w-5 h-5" />
            اتصال بالدفاع المدني
          </a>
        </div>
      )}

      <section className="my-8">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Activity className="w-5 h-5 text-blue-400" />
          حالة المناطق والمستشعرات
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {zones.map((zone) => {
            const isDanger = zone.status === 'danger';
            return (
              <div 
                key={zone.id} 
                className={`p-6 rounded-2xl border transition-all ${
                  isDanger 
                    ? 'bg-red-900/40 border-red-500 shadow-lg shadow-red-500/20' 
                    : 'bg-slate-800/60 border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold">{zone.name}</h3>
                  {isDanger ? (
                    <span className="flex items-center gap-1 px-3 py-1 text-xs font-bold bg-red-600 rounded-full">
                      <ShieldAlert className="w-4 h-4" /> خطر حريق
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 px-3 py-1 text-xs font-bold bg-emerald-600/20 text-emerald-400 rounded-full border border-emerald-500/30">
                      <ShieldCheck className="w-4 h-4" /> آمن
                    </span>
                  )}
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-slate-900/50 rounded-xl">
                    <span className="flex items-center gap-2 text-slate-300">
                      <Thermometer className="w-5 h-5 text-orange-400" /> درجة الحرارة
                    </span>
                    <span className={`font-bold text-lg ${zone.temp > 50 ? 'text-red-400' : 'text-white'}`}>
                      {zone.temp}°C
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-slate-900/50 rounded-xl">
                    <span className="flex items-center gap-2 text-slate-300">
                      <Wind className="w-5 h-5 text-sky-400" /> نسبة الدخان والغاز
                    </span>
                    <span className={`font-bold text-lg ${zone.smoke > 50 ? 'text-red-400' : 'text-white'}`}>
                      {zone.smoke}%
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-slate-900/50 rounded-xl">
                    <span className="flex items-center gap-2 text-slate-300">
                      <Flame className="w-5 h-5 text-rose-500" /> استشعار اللهب
                    </span>
                    <span className={`font-bold ${zone.flame ? 'text-red-400' : 'text-emerald-400'}`}>
                      {zone.flame ? 'تم رصد لهب!' : 'لا يوجد'}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-4">لوحة التحكم في أنظمة الاستجابة</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="p-5 bg-slate-800/60 border border-slate-700 rounded-2xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-3 rounded-xl ${controls.waterPump ? 'bg-blue-600' : 'bg-slate-700'}`}>
                <Droplets className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="font-bold">مضخات الإطفاء</h4>
                <p className="text-xs text-slate-400">{controls.waterPump ? 'تعمل الآن' : 'في وضع الاستعداد'}</p>
              </div>
            </div>
            <button 
              onClick={() => toggleControl('waterPump')}
              className={`px-4 py-2 rounded-lg font-semibold text-sm ${controls.waterPump ? 'bg-blue-600 text-white' : 'bg-slate-700 text-slate-300'}`}
            >
              {controls.waterPump ? 'إيقاف' : 'تشغيل'}
            </button>
          </div>

          <div className="p-5 bg-slate-800/60 border border-slate-700 rounded-2xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-3 rounded-xl ${controls.emergencyDoors ? 'bg-emerald-600' : 'bg-slate-700'}`}>
                <DoorOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="font-bold">مخارج الطوارئ</h4>
                <p className="text-xs text-slate-400">{controls.emergencyDoors ? 'مفتوحة للإخلاء' : 'مغلقة'}</p>
              </div>
            </div>
            <button 
              onClick={() => toggleControl('emergencyDoors')}
              className={`px-4 py-2 rounded-lg font-semibold text-sm ${controls.emergencyDoors ? 'bg-emerald-600 text-white' : 'bg-slate-700 text-slate-300'}`}
            >
              {controls.emergencyDoors ? 'إغلاق' : 'فتح'}
            </button>
          </div>

          <div className="p-5 bg-slate-800/60 border border-slate-700 rounded-2xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-3 rounded-xl ${controls.powerCut ? 'bg-amber-600' : 'bg-slate-700'}`}>
                <Power className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="font-bold">التيار الكهربائي</h4>
                <p className="text-xs text-slate-400">{controls.powerCut ? 'تم الفصل للوقاية' : 'متصل'}</p>
              </div>
            </div>
            <button 
              onClick={() => toggleControl('powerCut')}
              className={`px-4 py-2 rounded-lg font-semibold text-sm ${controls.powerCut ? 'bg-amber-600 text-white' : 'bg-slate-700 text-slate-300'}`}
            >
              {controls.powerCut ? 'إعادة التيار' : 'فصل التيار'}
            </button>
          </div>

        </div>
      </section>

    </div>
  );
}
