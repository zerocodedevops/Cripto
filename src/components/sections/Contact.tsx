import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import emailjs from '@emailjs/browser';
import { useTranslation, Trans } from 'react-i18next';
/* eslint-disable @typescript-eslint/no-deprecated */
// eslint-disable-next-line
import { Send, Mail, MapPin, CheckCircle, AlertCircle, Linkedin, Github, Phone } from 'lucide-react';
import { Button, SectionTitle } from '@/components/ui';
import { slideInLeft, slideInRight } from '@/hooks/useScrollAnimation';

// Custom WhatsApp Icon since Lucide doesn't have it
const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
    stroke="none"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const contactInfo = [
  {
    icon: Mail,
    // label: 'Email', // Replaced by translation
    labelKey: 'email',
    value: 'zerocode.devops@gmail.com',
    href: 'mailto:zerocode.devops@gmail.com',
  },
  {
    icon: WhatsAppIcon,
    labelKey: 'whatsapp',
    value: '+34 912 622 712',
    href: 'https://wa.me/34912622712',
  },
  {
    icon: MapPin,
    labelKey: 'location',
    value: 'Madrid, España',
    href: '#',
  },
  {
    // eslint-disable-next-line
    icon: Linkedin,
    labelKey: 'linkedin',
    value: 'zerocode-devops',
    href: 'https://www.linkedin.com/in/zerocode-devops',
  },
  {
    // eslint-disable-next-line
    icon: Github,
    labelKey: 'github',
    value: 'zerocodedevops',
    href: 'https://github.com/zerocodedevops',
  },
];

export function Contact() {
  const { t } = useTranslation();
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const contactSchema = useMemo(() => z.object({
    name: z.string().min(2, t('contact.form.validation.name')),
    email: z.string().email(t('contact.form.validation.email')),
    subject: z.string().min(5, t('contact.form.validation.subject')),
    message: z.string().min(10, t('contact.form.validation.message')),
  }), [t]);

  type ContactFormData = z.infer<typeof contactSchema>;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setStatus('loading');
    setErrorMessage('');

    try {
      // EmailJS configuration
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      if (!serviceId || !templateId || !publicKey) {
        // For demo purposes, simulate success
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setStatus('success');
        reset();
        return;
      }

      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: data.name,
          from_email: data.email,
          subject: data.subject,
          message: data.message,
        },
        publicKey
      );

      setStatus('success');
      reset();
    } catch {
      setStatus('error');
      setErrorMessage(t('contact.form.error'));
    }
  };

  return (
    <section id="contact" className="section relative">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute bottom-0 left-1/4 w-1/2 h-1/2 bg-gradient-radial from-primary-500/5 to-transparent blur-3xl" />
      </div>

      <div className="container-custom relative z-10">
        <SectionTitle
          title={t('contact.title')}
          subtitle={t('contact.subtitle')}
        />

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact info */}
          <motion.div
            variants={slideInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h3 className="heading-3 text-dark-100 mb-6">
              {t('contact.cta.title')}
            </h3>
            <p className="text-dark-400 mb-8 leading-relaxed">
              <Trans i18nKey="contact.cta.description">
                Estoy abierto a colaborar en proyectos que valoren la <span className="text-primary-400 font-medium">innovación</span>, la <span className="text-primary-400 font-medium">transparencia</span> y el uso estratégico de <span className="text-accent-400 font-medium">IA</span>.
              </Trans>
            </p>

            <div className="space-y-4">
              {contactInfo.map((info) => (
                <motion.a
                  key={info.labelKey}
                  href={info.href}
                  target={info.href.startsWith('http') ? '_blank' : undefined}
                  rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="flex items-center gap-4 p-4 rounded-xl bg-dark-800/30 border border-dark-700/50 hover:border-primary-500/30 transition-all group"
                  whileHover={{ x: 5 }}
                >
                  <div className="p-3 rounded-lg bg-primary-500/10 text-primary-400 group-hover:bg-primary-500/20 transition-colors">
                    <info.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-dark-500 text-sm">
                      {/* Check if specific translation exists, otherwise use fallback logic or basic key if added to json */}
                       {['email', 'linkedin', 'github', 'whatsapp'].includes(info.labelKey) 
                          ? info.labelKey.charAt(0).toUpperCase() + info.labelKey.slice(1) 
                          : t(`contact.info.${info.labelKey}`)}
                    </p>
                    <p className="text-dark-200 font-medium">{info.value}</p>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Contact form */}
          <motion.div
            variants={slideInRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="card p-8"
            >
              <div className="space-y-6">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="label">
                    {t('contact.form.name')}
                  </label>
                  <input
                    id="name"
                    type="text"
                    className="input"
                    placeholder={t('contact.form.placeholders.name')}
                    {...register('name')}
                    aria-invalid={errors.name ? 'true' : 'false'}
                    required={true}
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-400" role="alert">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="label">
                    {t('contact.form.email')}
                  </label>
                  <input
                    id="email"
                    type="email"
                    className="input"
                    placeholder={t('contact.form.placeholders.email')}
                    {...register('email')}
                    aria-invalid={errors.email ? 'true' : 'false'}
                    required={true}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-400" role="alert">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Subject */}
                <div>
                  <label htmlFor="subject" className="label">
                    {t('contact.form.subject')}
                  </label>
                  <input
                    id="subject"
                    type="text"
                    className="input"
                    placeholder={t('contact.form.placeholders.subject')}
                    {...register('subject')}
                    aria-invalid={errors.subject ? 'true' : 'false'}
                  />
                  {errors.subject && (
                    <p className="mt-1 text-sm text-red-400" role="alert">
                      {errors.subject.message}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="label">
                    {t('contact.form.message')}
                  </label>
                  <textarea
                    id="message"
                    className="textarea"
                    placeholder={t('contact.form.placeholders.message')}
                    rows={5}
                    {...register('message')}
                    aria-invalid={errors.message ? 'true' : 'false'}
                    required={true}
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-400" role="alert">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                {/* Submit button */}
                <Button
                  type="submit"
                  variant="primary"
                  className="w-full"
                  isLoading={status === 'loading'}
                  rightIcon={<Send className="w-5 h-5" />}
                >
                  {status === 'loading' ? t('contact.form.sending') : t('contact.form.submit')}
                </Button>

                {/* Status messages */}
                <AnimatePresence mode="wait">
                  {status === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex items-center gap-2 p-4 rounded-lg bg-green-500/10 border border-green-500/30 text-green-400"
                    >
                      <CheckCircle className="w-5 h-5" />
                      <p>{t('contact.form.success')}</p>
                    </motion.div>
                  )}

                  {status === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex items-center gap-2 p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400"
                    >
                      <AlertCircle className="w-5 h-5" />
                      <p>{errorMessage}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
