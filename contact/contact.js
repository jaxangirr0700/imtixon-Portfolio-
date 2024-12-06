let data;
function displayPortfolio() {
  fetch("http://localhost:3000/contact")
    .then((response) => response.json())
    .then((a) => {
      const theme = document.getElementById("setup_theme");
      const language = document.getElementById("setup_language");
      const primaryColor = document.getElementById("setup_primarycolor");
      const contactEmail = document.getElementById("setup_contactemail");
      const editBtn = document.getElementById("setup__edit_btn");

      if (theme) theme.textContent = a.email;
      if (language) language.textContent = a.phone;
      if (primaryColor) primaryColor.textContent = a.address;
      if (contactEmail) contactEmail.textContent = a.mapLink;

      editBtn.addEventListener("click", () => {
        const updatedData = {
          email: prompt("New Theme"),
          phone: prompt("language"),
          address: prompt("primaryColor"),
          mapLink: prompt("contactEmail"),
        };

        fetch(`http://localhost:3000/contact`, {
          method: "PUT",
          body: JSON.stringify(updatedData),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => response.json())
          .then((updated) => {
            theme.textContent = updated.email;
            language.textContent = updated.phone;
            primaryColor.textContent = updated.address;
            contactEmail.textContent = updated.mapLink;
          })
          .catch((err) => {
            console.error("Update error:", err);
          });
      });
      //   deleteBtn.addEventListener("click", () => {
      //     console.log("del");
      //   });
      //   resetBtn.addEventListener("click", () => {
      //     console.log("resetBtn");
      //   });

      //   createBtn.addEventListener("click", () => {
      //     const newSetup = {
      //       theme: "New Setup Theme",
      //       language: "English",
      //       primaryColor: "#ffffff",
      //       contactEmail: "newcontact@example.com",
      //       socialLinks: {
      //         twitter: "https://twitter.com/newsetup",
      //       },
      //     };

      //     fetch("http://localhost:3000/setup", {
      //       method: "POST",
      //       body: JSON.stringify(newSetup),
      //       headers: {
      //         "Content-Type": "application/json",
      //       },
      //     });
      //   });
    })
    .catch((er) => {
      console.log(`Serverda hatolik bor: ${er}`);
    });
}

displayPortfolio();
