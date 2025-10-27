# Admin Email Setup

## Environment Variables

To ensure admin notifications are sent to the correct email address, add the following environment variable to your `.env.local` file:

```bash
# Admin email for receiving application notifications
ADMIN_EMAIL=learnweb.rony@gmail.com
```

## How It Works

When someone submits an application:

1. **Applicant receives**: A confirmation email confirming their application was received
2. **Admin receives**: A detailed notification email with all application information

## Email Templates

- **Applicant Confirmation**: Simple confirmation with next steps
- **Admin Notification**: Detailed email with all application data including:
  - Personal information (name, email, phone, address)
  - RV details (year, length, make, model, type)
  - Stay details (occupants, pets, move-in date, duration)
  - Additional notes and application source

## Testing

To test the admin email functionality:

1. Submit a test application through the form
2. Check both email addresses:
   - Applicant email (confirmation)
   - Admin email (detailed notification)

## Troubleshooting

If admin emails are not being received:

1. Check the `ADMIN_EMAIL` environment variable is set correctly
2. Verify Mailjet API credentials are working
3. Check server logs for email sending errors
4. Ensure the admin email address is valid and can receive emails

## Default Behavior

If `ADMIN_EMAIL` is not set, the system will default to `learnweb.rony@gmail.com`.
