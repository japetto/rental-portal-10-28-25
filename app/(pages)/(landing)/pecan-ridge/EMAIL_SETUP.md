# Email Setup for Application Form

This document explains how the email functionality works for the Pecan Ridge RV Park application form.

## Overview

The application form sends two emails when a user submits their application:
1. **Admin Notification**: A detailed email to the admin with all application information
2. **Applicant Confirmation**: A confirmation email to the applicant

## Architecture

All email-related functionality is organized in the `lib/` folder:

```
lib/
├── email.ts                        # Core email sending functionality (Mailjet)
├── email-templates.ts              # HTML email templates
└── actions/
    └── application-actions.ts      # Server action for form submission
```

## Files Explained

### 1. `lib/email.ts`
Contains the Mailjet configuration and `sendEmail()` function.

**Key Features:**
- Initializes Mailjet client with API credentials
- Handles email sending with proper error handling
- Provides detailed error messages for common issues (auth, bad request, etc.)

### 2. `lib/email-templates.ts`
Contains HTML email template generators.

**Templates:**
- `generateApplicationEmailHTML()` - Beautiful HTML email for admin with all form data
- `generateApplicantConfirmationEmailHTML()` - Confirmation email for the applicant

### 3. `lib/actions/application-actions.ts`
Server action that processes the application submission.

**Process Flow:**
1. Validates application data using Zod schema
2. Sends detailed email to admin
3. Sends confirmation email to applicant
4. Returns success/error response

## Environment Variables Required

Add these to your `.env.local` file:

```env
# Mailjet Configuration
MAILJET_API_KEY=your_mailjet_api_key_here
MAILJET_SECRET_KEY=your_mailjet_secret_key_here
MAILJET_SENDER_EMAIL=noreply@yourdomain.com
MAILJET_ADMIN_EMAIL=admin@yourdomain.com
```

### How to Get Mailjet Credentials

1. Sign up at [Mailjet](https://www.mailjet.com/)
2. Verify your account and sender email
3. Go to [API Keys](https://app.mailjet.com/account/apikeys)
4. Copy your API Key and Secret Key
5. Add them to your `.env.local` file

## Usage in Components

The `ApplicationModal` component uses the server action:

```typescript
import { submitApplication } from "@/lib/actions/application-actions";

const handleSubmit = async (data: ApplicationFormData) => {
  const result = await submitApplication(data);
  
  if (!result.success) {
    // Handle error
    console.error(result.error);
  } else {
    // Show success message
    console.log(result.message);
  }
};
```

## Email Templates

### Admin Email
- **Subject**: "New RV Park Application - [First Name] [Last Name]"
- **Content**: 
  - Personal Information (name, email, phone, address)
  - RV Information (year, length, make, model, type)
  - Occupancy & Pets details
  - Stay Details (move-in date, duration)
  - Additional notes and how they heard about the park

### Applicant Confirmation Email
- **Subject**: "Application Received - Pecan Ridge RV Park"
- **Content**:
  - Thank you message
  - What happens next (review process, background check, timeline)
  - Contact information if they have questions

## Error Handling

The system includes comprehensive error handling:

1. **Validation Errors**: Form data is validated before sending
2. **Email Failures**: If admin email fails, the applicant still gets confirmation
3. **Configuration Errors**: Clear messages if environment variables are missing
4. **Mailjet Errors**: Specific error messages for auth, bad request, and forbidden errors

## Testing

To test the email functionality:

1. Set up your Mailjet credentials in `.env.local`
2. Fill out and submit the application form
3. Check the admin email for the detailed application
4. Check the applicant's email for the confirmation

## Customization

### Changing Email Templates

Edit `lib/email-templates.ts` to modify:
- Email styling (CSS in the `<style>` tags)
- Content structure
- Color scheme (currently uses emerald/teal gradient)

### Changing Sender Information

Edit `lib/email.ts`:
```typescript
From: {
  Email: config.mailjet_sender_email,
  Name: "Your Park Name", // Change this
}
```

### Adding CC/BCC Recipients

Modify the email sending in `lib/actions/application-actions.ts`:
```typescript
await sendEmail({
  to: adminEmail,
  subject: "...",
  html: "...",
  // Add CC/BCC in the sendEmail function
});
```

## Dependencies

- `node-mailjet`: Mailjet SDK for Node.js
- `@types/node-mailjet`: TypeScript types for Mailjet
- `date-fns`: Date formatting in email templates

## Troubleshooting

### Emails not sending
1. Verify Mailjet credentials are correct
2. Check if sender email is verified in Mailjet
3. Check console logs for specific errors
4. Ensure environment variables are properly loaded

### Validation errors
- Check that the form data matches the Zod schema in `zod/application.validation.ts`
- Verify all required fields are being submitted

### Mailjet authentication errors
- Regenerate API keys in Mailjet dashboard
- Ensure no extra spaces in environment variables
- Verify account is in good standing

## Future Enhancements

Potential improvements:
- [ ] Add email templates for different application statuses
- [ ] Store applications in database before sending emails
- [ ] Add email queue system for better reliability
- [ ] Implement email tracking and analytics
- [ ] Add attachments support (e.g., RV photos)

