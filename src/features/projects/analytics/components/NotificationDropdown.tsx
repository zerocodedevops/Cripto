import { motion, AnimatePresence } from 'framer-motion';
import { Info, TrendingUp, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { premiumColors, premiumLayout, premiumEffects } from '../utils/premiumTheme';

interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'alert';
  title: string;
  time: string;
  read: boolean;
}

const MOCK_NOTIFICATIONS: Notification[] = [
  { id: '1', type: 'success', title: 'Revenue target reached!', time: '2m ago', read: false },
  { id: '2', type: 'warning', title: 'Ad spend spikes in EU North', time: '15m ago', read: false },
  { id: '3', type: 'alert', title: 'Unusual drop-off in Checkout', time: '1h ago', read: true },
  { id: '4', type: 'info', title: 'New weekly report is ready', time: '3h ago', read: true },
];

interface NotificationDropdownProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
}

export function NotificationDropdown({ isOpen, onClose }: NotificationDropdownProps) {
  const getIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle2 className="w-3 h-3 text-sage-400" />;
      case 'warning': return <TrendingUp className="w-3 h-3 text-peach-400" />;
      case 'alert': return <AlertTriangle className="w-3 h-3 text-coral-400" />;
      default: return <Info className="w-3 h-3 text-lavender-400" />;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <div className="fixed inset-0 z-[100]" onClick={onClose} aria-hidden="true" />
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
            className="absolute top-full right-0 mt-3 z-[110] min-w-[320px] p-2"
            style={{
              ...premiumEffects.glassmorphism,
              backgroundColor: 'rgba(18, 18, 18, 0.95)',
              borderRadius: premiumLayout.borderRadius.lg,
              boxShadow: premiumEffects.shadow.lg,
            }}
          >
            <div className="p-4 flex items-center justify-between border-b border-white/5">
              <h3 className="text-xs font-bold uppercase tracking-widest" style={{ color: premiumColors.accent.white }}>
                Notifications
              </h3>
              <span className="px-2 py-0.5 rounded-full bg-lavender-500/20 text-lavender-400 text-[10px] font-bold">
                2 NEW
              </span>
            </div>

            <div className="max-h-[300px] overflow-y-auto py-2 custom-scrollbar">
              {MOCK_NOTIFICATIONS.map((notif) => (
                <div 
                  key={notif.id}
                  className={`p-3 mx-2 rounded-xl flex gap-3 transition-colors cursor-pointer hover:bg-white/5 ${notif.read ? '' : 'bg-white/[0.02]'}`}
                >
                  <div className="w-8 h-8 rounded-full flex items-center justify-center bg-white/5 flex-shrink-0">
                    {getIcon(notif.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium truncate mb-0.5" style={{ color: premiumColors.accent.white }}>
                      {notif.title}
                    </p>
                    <p className="text-[10px] opacity-40 uppercase tracking-tighter">
                      {notif.time}
                    </p>
                  </div>
                  {!notif.read && (
                    <div className="w-1.5 h-1.5 rounded-full bg-lavender-500 self-center" />
                  )}
                </div>
              ))}
            </div>

            <div className="p-3 border-t border-white/5 text-center">
              <button className="text-[10px] font-bold uppercase tracking-widest text-lavender-400 hover:text-lavender-300 transition-colors">
                Mark all as read
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
