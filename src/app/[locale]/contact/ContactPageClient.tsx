'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Mail, Linkedin, MessageSquare, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { type Locale } from '@/lib/i18n/config';

interface ContactPageClientProps {
  locale: Locale;
}

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

/** WhatsApp brand glyph (not in lucide) */
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.297-.497.1-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  );
}

export default function ContactPageClient({ locale }: ContactPageClientProps) {
  const t = useTranslations('contactPage');
  const tCommon = useTranslations('common');
  const [formStatus, setFormStatus] = useState<FormStatus>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const contactMethods = [
    {
      icon: Mail,
      title: t('methods.email.title'),
      description: t('methods.email.description'),
      action: 'ferdianyosua@gmail.com',
      href: 'mailto:ferdianyosua@gmail.com',
    },
    {
      icon: Linkedin,
      title: t('methods.linkedin.title'),
      description: t('methods.linkedin.description'),
      action: 'Yosua Ferdian',
      href: 'https://www.linkedin.com/in/yosua-ferdian-a1a929116/',
    },
    {
      icon: WhatsAppIcon,
      title: t('methods.whatsapp.title'),
      description: t('methods.whatsapp.description'),
      action: '+62 812 9021 6083',
      href: 'https://wa.me/6281290216083',
    },
    {
      icon: WhatsAppIcon,
      title: t('methods.whatsapp.title'),
      description: t('methods.whatsapp.description'),
      action: '+60 11 2781 7121',
      href: 'https://wa.me/601127817121',
    },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');

    // Simulate form submission (in a real app, this would send to an API)
    await new Promise(resolve => setTimeout(resolve, 1500));

    // For demo purposes, always succeed
    setFormStatus('success');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header locale={locale} />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-[hsl(var(--color-muted)/0.3)] py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl md:text-4xl font-bold text-[hsl(var(--color-foreground))] mb-4">
                {t('hero.title')}
              </h1>
              <p className="text-[hsl(var(--color-muted-foreground))]">
                {t('hero.description')}
              </p>
            </div>
          </div>
        </section>

        {/* Contact Methods */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              {contactMethods.map((method, index) => {
                const Icon = method.icon;
                return (
                  <a
                    key={index}
                    href={method.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <Card className="p-6 h-full text-center" hover>
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[hsl(var(--color-primary)/0.1)] mb-4">
                        <Icon className="h-6 w-6 text-[hsl(var(--color-primary))]" />
                      </div>
                      <h3 className="font-semibold text-[hsl(var(--color-foreground))] mb-2">
                        {method.title}
                      </h3>
                      <p className="text-sm text-[hsl(var(--color-muted-foreground))] mb-4">
                        {method.description}
                      </p>
                      <span className="text-sm font-medium text-[hsl(var(--color-primary))]">
                        {method.action}
                      </span>
                    </Card>
                  </a>
                );
              })}
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="py-12 bg-[hsl(var(--color-muted)/0.3)]">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-[hsl(var(--color-foreground))] mb-2">
                  {t('form.title')}
                </h2>
                <p className="text-[hsl(var(--color-muted-foreground))]">
                  {t('form.description')}
                </p>
              </div>

              {formStatus === 'success' ? (
                <Card className="p-8 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-[hsl(var(--color-foreground))] mb-2">
                    {t('form.success.title')}
                  </h3>
                  <p className="text-[hsl(var(--color-muted-foreground))] mb-6">
                    {t('form.success.description')}
                  </p>
                  <Button variant="outline" onClick={() => setFormStatus('idle')}>
                    {t('form.success.button')}
                  </Button>
                </Card>
              ) : (
                <Card className="p-6 md:p-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-[hsl(var(--color-foreground))] mb-2"
                        >
                          {t('form.fields.name.label')}
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-2 rounded-lg border border-[hsl(var(--color-border))] bg-[hsl(var(--color-background))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--color-ring))]"
                          placeholder={t('form.fields.name.placeholder')}
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-[hsl(var(--color-foreground))] mb-2"
                        >
                          {t('form.fields.email.label')}
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-2 rounded-lg border border-[hsl(var(--color-border))] bg-[hsl(var(--color-background))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--color-ring))]"
                          placeholder={t('form.fields.email.placeholder')}
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="subject"
                        className="block text-sm font-medium text-[hsl(var(--color-foreground))] mb-2"
                      >
                        {t('form.fields.subject.label')}
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 rounded-lg border border-[hsl(var(--color-border))] bg-[hsl(var(--color-background))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--color-ring))]"
                      >
                        <option value="">{t('form.fields.subject.placeholder')}</option>
                        <option value="general">{t('form.fields.subject.options.general')}</option>
                        <option value="bug">{t('form.fields.subject.options.bug')}</option>
                        <option value="feature">{t('form.fields.subject.options.feature')}</option>
                        <option value="feedback">{t('form.fields.subject.options.feedback')}</option>
                        <option value="other">{t('form.fields.subject.options.other')}</option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-[hsl(var(--color-foreground))] mb-2"
                      >
                        {t('form.fields.message.label')}
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={6}
                        className="w-full px-4 py-2 rounded-lg border border-[hsl(var(--color-border))] bg-[hsl(var(--color-background))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--color-ring))] resize-none"
                        placeholder={t('form.fields.message.placeholder')}
                      />
                    </div>

                    {formStatus === 'error' && (
                      <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                        <AlertCircle className="h-5 w-5 flex-shrink-0" />
                        <p className="text-sm">
                          {t('form.error')}
                        </p>
                      </div>
                    )}

                    <Button
                      type="submit"
                      variant="primary"
                      className="w-full"
                      loading={formStatus === 'submitting'}
                      disabled={formStatus === 'submitting'}
                    >
                      {formStatus === 'submitting' ? t('form.submit.loading') : t('form.submit.default')}
                      {formStatus !== 'submitting' && <Send className="ml-2 h-4 w-4" />}
                    </Button>
                  </form>
                </Card>
              )}
            </div>
          </div>
        </section>

        {/* FAQ Link */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <MessageSquare className="h-12 w-12 mx-auto mb-4 text-[hsl(var(--color-muted-foreground))]" />
              <h2 className="text-2xl font-bold text-[hsl(var(--color-foreground))] mb-4">
                {t('faq.title')}
              </h2>
              <p className="text-[hsl(var(--color-muted-foreground))] mb-6">
                {t('faq.description', { brand: tCommon('brand') })}
              </p>
              <Link href={`/${locale}/faq`}>
                <Button variant="outline">
                  {t('faq.button')}
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer locale={locale} />
    </div>
  );
}
