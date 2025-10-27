import Mailjet from "node-mailjet";

// Email configuration
const config = {
  mailjet_api_key: process.env.MAILJET_API_KEY || "",
  mailjet_secret_key: process.env.MAILJET_SECRET_KEY || "",
  mailjet_sender_email:
    process.env.MAILJET_SENDER_EMAIL || "noreply@example.com",
};

// Initialize Mailjet client
const mailjet = Mailjet.apiConnect(
  config.mailjet_api_key,
  config.mailjet_secret_key
);

export interface IEmailOptions {
  to: string;
  subject: string;
  html: string;
  name?: string;
}

// Send email function using Mailjet v3.1 API
export const sendEmail = async (emailOptions: IEmailOptions): Promise<void> => {
  try {
    const request = mailjet.post("send", { version: "v3.1" }).request({
      Messages: [
        {
          From: {
            Email: config.mailjet_sender_email,
            Name: "Pecan Ridge RV Park",
          },
          To: [
            {
              Email: emailOptions.to,
              Name: emailOptions.name || "",
            },
          ],
          Subject: emailOptions.subject,
          HTMLPart: emailOptions.html,
        },
      ],
    });

    console.log("Attempting to send email to:", emailOptions.to);
    const result = await request;
    console.log("Email sent successfully. Result:", result.body);
  } catch (error) {
    console.error("Error sending email:", error);

    // Provide more specific error messages
    if (error instanceof Error) {
      if (error.message.includes("Unauthorized")) {
        throw new Error(
          "Mailjet authentication failed. Please check your API key and secret."
        );
      } else if (error.message.includes("Bad Request")) {
        throw new Error(
          "Invalid email request. Please check the email format and content."
        );
      } else if (error.message.includes("Forbidden")) {
        throw new Error(
          "Mailjet access denied. Please check your account permissions."
        );
      }
    }

    throw new Error(
      `Failed to send email: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
};
