# 📧 EmailJS Setup Guide for Close Protection Forces

## 🚀 Quick Setup Steps

### 1. Install EmailJS Package
The package `@emailjs/browser` has been installed in your project.

### 2. Create EmailJS Account
- Go to [EmailJS.com](https://www.emailjs.com/)
- Sign up for a free account
- Verify your email address

### 3. Set Up Email Service
- In EmailJS dashboard, go to "Email Services"
- Click "Add New Service"
- Choose your email provider (Gmail, Outlook, etc.)
- Follow the authentication steps
- **Save your Service ID** (you'll need this)

### 4. Create Email Template
- Go to "Email Templates"
- Click "Create New Template"
- **Copy the HTML code from `EMAILJS_TEMPLATE_CODE.html`**
- Paste it into the template editor
- Save the template
- **Save your Template ID** (you'll need this)

### 5. Get Your Public Key
- Go to "Account" → "API Keys"
- **Copy your Public Key** (you'll need this)

### 6. Update the Code
Replace these placeholders in `src/components/ContactSection.tsx`:

```typescript
// Replace these with your actual EmailJS credentials
const serviceId = '';        // From step 2
const templateId = '';      // From step 3
const publicKey = '';        // From step 4
```

## 🔧 Template Variables

The template uses these variables that are automatically filled:
- `{{from_name}}` - Client's name
- `{{from_email}}` - Client's email
- `{{from_phone}}` - Client's phone
- `{{service}}` - Requested service
- `{{message}}` - Client's message
- `{{reply_to}}` - Reply email address

## 📱 Testing

1. Fill out the contact form on your website
2. Submit the form
3. Check your email for the new message
4. Verify all information is correctly displayed

## 🎨 Customizing the Template

You can modify the `EMAILJS_TEMPLATE_CODE.html` file to:
- Change colors and styling
- Add your company logo
- Modify the layout
- Add additional fields

## ⚠️ Important Notes

- **Free Plan**: 200 emails/month
- **Paid Plans**: Start at $15/month for 1,000 emails
- **Rate Limiting**: Free plan has rate limits
- **Security**: Never expose your private keys

## 🆘 Troubleshooting

### Common Issues:
1. **Form not sending**: Check console for errors
2. **Wrong template**: Verify Template ID
3. **Service not working**: Verify Service ID
4. **Authentication failed**: Re-authenticate your email service

### Debug Steps:
1. Check browser console for errors
2. Verify all IDs are correct
3. Test with EmailJS dashboard
4. Check email service status

## 📞 Support

- EmailJS Documentation: [docs.emailjs.com](https://docs.emailjs.com/)
- EmailJS Community: [community.emailjs.com](https://community.emailjs.com/)
- Contact: support@emailjs.com

---

**🎯 Your contact form is now ready to send emails directly to your inbox!**
