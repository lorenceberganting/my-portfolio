const contactForm = document.querySelector(".contact-form");

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(contactForm);
    const name = formData.get("Name").trim();
    const email = formData.get("Email").trim();
    const message = formData.get("Message").trim();
    const subject = encodeURIComponent(`Portfolio message from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\n${message}`,
    );

    window.location.href = `mailto:lorenceberganting@gmail.com?subject=${subject}&body=${body}`;
  });
}
