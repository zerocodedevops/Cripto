import { useNavigate } from 'react-router-dom';
import { XCircle, RefreshCw, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui';
import { trackEvent } from '@/lib/analytics';
import { useEffect } from 'react';

export default function CheckoutCancelPage() {
  const navigate = useNavigate();

  useEffect(() => {
    trackEvent('Shop', 'PurchaseCancelled', 'UserAction');
  }, []);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-6 animate-fade-in">
      <div className="w-24 h-24 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-6">
        <XCircle className="w-12 h-12 text-red-600 dark:text-red-400" />
      </div>
      
      <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
        Pago Cancelado
      </h1>
      
      <p className="text-lg text-slate-600 dark:text-slate-300 max-w-md mb-8">
        Has cancelado el proceso de pago o ha ocurrido un error. No se ha realizado ningún cargo.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <Button 
          variant="primary" 
          leftIcon={<RefreshCw className="w-5 h-5" />}
          onClick={() => navigate('/proyectos/ecommerce/checkout')}
        >
          Intentar de Nuevo
        </Button>
        <Button 
          variant="ghost"
          leftIcon={<HelpCircle className="w-5 h-5" />}
          onClick={() => window.open('mailto:soporte@zerocode.dev', '_blank')}
        >
           ¿Necesitas Ayuda?
        </Button>
      </div>
    </div>
  );
}
