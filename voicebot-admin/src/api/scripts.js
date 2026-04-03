let activeScript = `Hello, this is an automated call from Harmony Health Clinic.

We're reaching out to confirm your upcoming appointment scheduled for [DATE] at [TIME] with Dr. [DOCTOR_NAME].

Press 1 to confirm your appointment.
Press 2 to cancel or reschedule.

If you have any questions, please call us back at 555-0100 during business hours.

Thank you for choosing Harmony Health Clinic. Have a great day!`;

export async function getActiveScript() {
  await delay(400);
  return { script: activeScript };
}

export async function updateActiveScript(newScript) {
  await delay(500);
  activeScript = newScript;
  return { script: activeScript };
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
