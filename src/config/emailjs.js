/**
 * EmailJS Configuration
 * ─────────────────────────────────────────────────
 * Set these in your .env file (copy from .env.example):
 *
 *   VITE_EMAILJS_SERVICE_ID=service_xxxxxxx
 *   VITE_EMAILJS_TEMPLATE_ID=template_xxxxxxx
 *   VITE_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxxxxxxxxxx
 *
 * Steps to get these values:
 *  1. Create account at https://www.emailjs.com/
 *  2. Add an Email Service (Gmail / Outlook / etc.)
 *  3. Create an Email Template with variables:
 *       {{from_name}}, {{from_email}}, {{subject}}, {{message}}
 *  4. Copy your Service ID, Template ID, and Public Key here.
 * ─────────────────────────────────────────────────
 */

export const EMAILJS_CONFIG = {
  serviceId:  import.meta.env.VITE_EMAILJS_SERVICE_ID  || '',
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '',
  publicKey:  import.meta.env.VITE_EMAILJS_PUBLIC_KEY  || '',
};

/**
 * Validates that all required EmailJS credentials are present.
 * Returns false in development when credentials are not yet configured.
 */
export function isEmailJSConfigured() {
  return (
    Boolean(EMAILJS_CONFIG.serviceId) &&
    Boolean(EMAILJS_CONFIG.templateId) &&
    Boolean(EMAILJS_CONFIG.publicKey)
  );
}
