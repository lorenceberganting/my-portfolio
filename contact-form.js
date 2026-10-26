const contactForm = document.querySelector(".contact-form");

if (contactForm) {
  const submitButton = contactForm.querySelector('button[type="submit"]');
  const statusMessage = contactForm.querySelector(".contact-status");

  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    statusMessage.textContent = "Sending your message...";
    statusMessage.classList.remove("contact-status-error");
    submitButton.disabled = true;

    try {
      const response = await fetch(contactForm.action, {
        method: contactForm.method,
        body: new FormData(contactForm),
        headers: { Accept: "application/json" },
      });

      if (!response.ok) {
        throw new Error(`Form submission failed with status ${response.status}`);
      }

      contactForm.reset();
      statusMessage.textContent = "Thanks! Your message has been sent.";
    } catch (error) {
      console.error("Unable to send contact form:", error);
      statusMessage.textContent =
        "Sorry, your message could not be sent. Please email lorenceberganting@gmail.com directly.";
      statusMessage.classList.add("contact-status-error");
    } finally {
      submitButton.disabled = false;
    }
  });
}
