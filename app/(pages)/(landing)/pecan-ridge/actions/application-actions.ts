"use server";

import { sendEmail } from "@/app/(pages)/(landing)/pecan-ridge/lib/email";
import {
  generateAdminNotificationEmailHTML,
  generateApplicantConfirmationEmailHTML,
} from "@/app/(pages)/(landing)/pecan-ridge/lib/email-templates";
import {
  applicationFormSchema,
  type ApplicationFormData,
} from "@/zod/application.validation";

interface SubmitApplicationResponse {
  success: boolean;
  message?: string;
  error?: string;
}

/**
 * Server action to submit RV park application
 */
export async function submitApplication(
  data: ApplicationFormData
): Promise<SubmitApplicationResponse> {
  try {
    // Validate the application data
    const validationResult = applicationFormSchema.safeParse(data);

    if (!validationResult.success) {
      console.error("Validation errors:", validationResult.error.errors);
      return {
        success: false,
        error: "Invalid application data. Please check all required fields.",
      };
    }

    const applicationData: ApplicationFormData = validationResult.data;

    // Send confirmation email to applicant
    try {
      await sendEmail({
        to: applicationData.email,
        name: `${applicationData.firstName} ${applicationData.lastName}`,
        subject: "Application Received - Pecan Ridge RV Park",
        html: generateApplicantConfirmationEmailHTML(
          applicationData.firstName,
          applicationData.lastName
        ),
      });
    } catch (emailError) {
      console.error(
        "Failed to send confirmation email to applicant:",
        emailError
      );
      // Continue even if confirmation email fails
    }

    // Send notification email to admin
    try {
      const adminEmail = process.env.ADMIN_EMAIL || "iveypursuits@gmail.com";

      await sendEmail({
        to: adminEmail,
        name: "Pecan Ridge Admin",
        subject: `New Application Received - ${applicationData.firstName} ${applicationData.lastName}`,
        html: generateAdminNotificationEmailHTML(applicationData),
      });
    } catch (emailError) {
      console.error("Failed to send admin notification email:", emailError);
      // Continue even if admin notification fails
    }

    // Return success response
    return {
      success: true,
      message:
        "Application submitted successfully! Check your email for confirmation.",
    };
  } catch (error) {
    console.error("Error processing application:", error);

    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to process application. Please try again later.",
    };
  }
}
