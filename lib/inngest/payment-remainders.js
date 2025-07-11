import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";
import { inngest } from "./client";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL);

export const paymentReminders = inngest.createFunction(
  { id: "send-payment-reminders" },
  { cron: "0 10 * * *" }, // daily at 10 AM UTC
  async ({ step }) => {
    /* 1. fetch all users that still owe money */
    const users = await step.run("fetch-debts", () =>
      convex.query(api.inngest.getUsersWithOutstandingDebts)
    );

    /* 2. build & send one e‑mail per user */
    const results = await step.run("send-emails", async () => {
      return Promise.all(
        users.map(async (u) => {
          const rows = u.debts
            .map(
              (d) => `
                <tr>
                  <td style="padding:4px 8px;">${d.name}</td>
                  <td style="padding:4px 8px;">$${d.amount.toFixed(2)}</td>
                </tr>
              `
            )
            .join("");

          if (!rows) return { userId: u._id, skipped: true };

        const html = `
            <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f6f8fa; padding: 40px 24px; color: #333; max-width: 600px; margin: auto; border-radius: 8px;">
                <div style="background-color: #ffffff; padding: 32px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
                    <h2 style="margin-top: 0; color: #0d1117; font-size: 24px; border-bottom: 1px solid #eaecef; padding-bottom: 8px;">
                    SplitZee – Payment Reminder
                    </h2>

                    <p style="font-size: 16px; line-height: 1.6;">
                    Hi <strong>${u.name}</strong>,
                    </p>

                    <p style="font-size: 16px; line-height: 1.6;">
                    You currently <strong>owe the following people</strong>:
                    </p>

                    <table style="width: 100%; border-collapse: collapse; margin: 24px 0; font-size: 15px;">
                        <thead>
                            <tr style="background-color: #f0f3f6;">
                                <th style="text-align: left; padding: 12px; border: 1px solid #d0d7de;">Owed To</th>
                                <th style="text-align: right; padding: 12px; border: 1px solid #d0d7de;">Amount</th>
                            </tr>
                        </thead>
                
                        <tbody>
                        ${rows}
                        </tbody>
                    </table>

                    <p style="font-size: 16px; line-height: 1.6;">
                    Please try to settle these dues soon.
                    </p>

                    <div style="text-align: center; margin-top: 32px;">
                        <a href="https://your-splitzee-app-link.com" style="display: inline-block; padding: 12px 24px; background-color: #3b82f6; color: #fff; text-decoration: none; border-radius: 6px; font-weight: 500;">
                        View and Settle Now
                        </a>
                    </div>
                </div>

                <p style="font-size: 13px; text-align: center; color: #7d8590; margin-top: 24px;">
                    This is an automated reminder from SplitZee. You're receiving this because you have outstanding balances.
                </p>
            </div>
        `;

          // FIX: Use your email for all recipients in non-production
          const recipientEmail =
            process.env.NODE_ENV === "production"
              ? u.email
              : "jimit8929@gmail.com";

          try {
            await convex.action(api.email.sendEmail, {
              to: recipientEmail, // Use conditional email
              subject: "You have pending payments on SplitZee",
              html,
              apiKey: process.env.RESEND_API_KEY,
            });
            return { userId: u._id, success: true };
          } catch (err) {
            return { userId: u._id, success: false, error: err.message };
          }
        })
      );
    });

    return {
      processed: results.length,
      successes: results.filter((r) => r.success).length,
      failures: results.filter((r) => r.success === false).length,
    };
  }
);
