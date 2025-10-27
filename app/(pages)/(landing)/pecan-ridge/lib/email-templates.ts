/**
 * Generate admin notification email with application details
 */
export const generateAdminNotificationEmailHTML = (applicationData: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  currentAddress: string;
  rvYear: number;
  rvLength: number;
  rvMake: string;
  rvModel: string;
  rvType: string;
  numOccupants: number;
  hasPets: string;
  petDetails?: string;
  moveInDate: Date;
  stayDuration: string;
  additionalNotes?: string;
  hearAboutUs?: string;
}): string => {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  };

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Application - Pecan Ridge RV Park</title>
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      line-height: 1.6;
      color: #334155;
      background-color: #f8fafc;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 700px;
      margin: 20px auto;
      background-color: #ffffff;
      border-radius: 12px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      overflow: hidden;
    }
    .header {
      background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
      color: white;
      padding: 30px;
      text-align: center;
    }
    .header h1 {
      margin: 0;
      font-size: 24px;
      font-weight: bold;
    }
    .content {
      padding: 30px;
    }
    .alert-icon {
      text-align: center;
      font-size: 40px;
      margin-bottom: 20px;
    }
    .section {
      margin-bottom: 25px;
      padding: 20px;
      background-color: #f8fafc;
      border-radius: 8px;
      border-left: 4px solid #dc2626;
    }
    .section h3 {
      margin-top: 0;
      color: #0f172a;
      font-size: 18px;
      font-weight: bold;
    }
    .info-row {
      display: flex;
      margin-bottom: 10px;
      padding: 8px 0;
      border-bottom: 1px solid #e2e8f0;
    }
    .info-row:last-child {
      border-bottom: none;
    }
    .info-label {
      font-weight: bold;
      color: #475569;
      min-width: 140px;
      margin-right: 15px;
    }
    .info-value {
      color: #0f172a;
      flex: 1;
    }
    .urgent-box {
      background-color: #fef2f2;
      border: 2px solid #fecaca;
      border-radius: 8px;
      padding: 20px;
      margin: 25px 0;
      text-align: center;
    }
    .urgent-box h3 {
      color: #dc2626;
      margin-top: 0;
    }
    .footer {
      background-color: #f1f5f9;
      padding: 20px 30px;
      text-align: center;
      font-size: 14px;
      color: #64748b;
    }
    @media only screen and (max-width: 600px) {
      .container {
        margin: 10px;
      }
      .header, .content {
        padding: 20px;
      }
      .info-row {
        flex-direction: column;
      }
      .info-label {
        min-width: auto;
        margin-bottom: 5px;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Pecan Ridge RV Park</h1>
      <h3>🚨 New Application Received!</h3>
      
    </div>
    
    <div class="content">
      <div class="alert-icon">📋</div>
      
      <div class="urgent-box">
        <h3>Action Required</h3>
        <p>A new application has been submitted and requires your review.</p>
      </div>

      <div class="section">
        <h3>👤 Personal Information</h3>
        <div class="info-row">
          <span class="info-label">Name:</span>
          <span class="info-value">${applicationData.firstName} ${
    applicationData.lastName
  }</span>
        </div>
        <div class="info-row">
          <span class="info-label">Email:</span>
          <span class="info-value"><a href="mailto:${applicationData.email}">${
    applicationData.email
  }</a></span>
        </div>
        <div class="info-row">
          <span class="info-label">Phone:</span>
          <span class="info-value"><a href="tel:${applicationData.phone}">${
    applicationData.phone
  }</a></span>
        </div>
        <div class="info-row">
          <span class="info-label">Current Address:</span>
          <span class="info-value">${applicationData.currentAddress}</span>
        </div>
      </div>

      <div class="section">
        <h3>🚐 RV Information</h3>
        <div class="info-row">
          <span class="info-label">Year:</span>
          <span class="info-value">${applicationData.rvYear}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Length:</span>
          <span class="info-value">${applicationData.rvLength} feet</span>
        </div>
        <div class="info-row">
          <span class="info-label">Make:</span>
          <span class="info-value">${applicationData.rvMake}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Model:</span>
          <span class="info-value">${applicationData.rvModel}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Type:</span>
          <span class="info-value">${applicationData.rvType
            .replace("-", " ")
            .replace(/\b\w/g, (l) => l.toUpperCase())}</span>
        </div>
      </div>

      <div class="section">
        <h3>🏠 Stay Details</h3>
        <div class="info-row">
          <span class="info-label">Occupants:</span>
          <span class="info-value">${applicationData.numOccupants}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Pets:</span>
          <span class="info-value">${
            applicationData.hasPets === "yes" ? "Yes" : "No"
          }</span>
        </div>
        ${
          applicationData.hasPets === "yes" && applicationData.petDetails
            ? `
        <div class="info-row">
          <span class="info-label">Pet Details:</span>
          <span class="info-value">${applicationData.petDetails}</span>
        </div>
        `
            : ""
        }
        <div class="info-row">
          <span class="info-label">Move-in Date:</span>
          <span class="info-value">${formatDate(
            applicationData.moveInDate
          )}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Stay Duration:</span>
          <span class="info-value">${applicationData.stayDuration
            .replace("-", " ")
            .replace(/\b\w/g, (l) => l.toUpperCase())}</span>
        </div>
      </div>

      ${
        applicationData.additionalNotes
          ? `
      <div class="section">
        <h3>📝 Additional Notes</h3>
        <p style="margin: 0; padding: 15px; background-color: #ffffff; border-radius: 6px; border: 1px solid #e2e8f0;">
          ${applicationData.additionalNotes}
        </p>
      </div>
      `
          : ""
      }

      <div class="section">
        <h3>📊 Application Source</h3>
        <div class="info-row">
          <span class="info-label">How they heard about us:</span>
          <span class="info-value">${
            applicationData.hearAboutUs
              ? applicationData.hearAboutUs
                  .replace("-", " ")
                  .replace(/\b\w/g, (l) => l.toUpperCase())
              : "Not specified"
          }</span>
        </div>
        <div class="info-row">
          <span class="info-label">Submitted:</span>
          <span class="info-value">${formatDate(new Date())}</span>
        </div>
      </div>

      <div class="urgent-box">
        <h3>Next Steps</h3>
        <p>Please review this application and contact the applicant to discuss availability and next steps.</p>
      </div>
    </div>

    <div class="footer">
      <p>© ${new Date().getFullYear()} Pecan Ridge RV Park. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
  `.trim();
};

/**
 * Generate confirmation email for applicant
 */
export const generateApplicantConfirmationEmailHTML = (
  firstName: string,
  lastName: string
): string => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Application Received - Pecan Ridge RV Park</title>
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      line-height: 1.6;
      color: #334155;
      background-color: #f8fafc;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 20px auto;
      background-color: #ffffff;
      border-radius: 12px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      overflow: hidden;
    }
    .header {
      background: linear-gradient(135deg, #10b981 0%, #14b8a6 100%);
      color: white;
      padding: 40px 30px;
      text-align: center;
    }
    .header h1 {
      margin: 0;
      font-size: 28px;
      font-weight: bold;
    }
    .content {
      padding: 40px 30px;
    }
    .success-icon {
      text-align: center;
      font-size: 48px;
      margin-bottom: 20px;
    }
    .message {
      font-size: 16px;
      margin-bottom: 20px;
    }
    .info-box {
      background-color: #f0fdf4;
      border-left: 4px solid #10b981;
      padding: 20px;
      border-radius: 6px;
      margin: 25px 0;
    }
    .info-box h3 {
      margin-top: 0;
      color: #0f172a;
      font-size: 18px;
    }
    .info-box ul {
      margin: 10px 0;
      padding-left: 20px;
    }
    .info-box li {
      margin: 8px 0;
    }
    .footer {
      background-color: #f1f5f9;
      padding: 25px 30px;
      text-align: center;
      font-size: 14px;
      color: #64748b;
    }
    @media only screen and (max-width: 600px) {
      .container {
        margin: 10px;
      }
      .header, .content {
        padding: 30px 20px;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Application Received!</h1>
    </div>
    
    <div class="content">
      <div class="success-icon">✅</div>
      
      <p class="message">
        Dear ${firstName} ${lastName},
      </p>
      
      <p class="message">
        Thank you for applying to <strong>Pecan Ridge RV Park</strong>! We've successfully received your application and are excited to review it.
      </p>

      <div class="info-box">
        <h3>What Happens Next?</h3>
        <ul>
          <li>📋 Our team will carefully review your application</li>
          <li>🔍 We'll conduct the required background check</li>
          <li>📞 We'll contact you as soon as possible with next steps</li>
          <li>✨ If approved, we'll discuss available spaces and move-in details</li>
        </ul>
      </div>

      <p class="message">
        If you have any questions in the meantime, please don't hesitate to reach out to us.
      </p>

      <p class="message">
        We look forward to potentially welcoming you to our community!
      </p>

      <p class="message">
        <strong>Best regards,</strong><br>
        The Pecan Ridge RV Park Team
      </p>
    </div>

    <div class="footer">
      <p>© ${new Date().getFullYear()} Pecan Ridge RV Park. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
  `.trim();
};
