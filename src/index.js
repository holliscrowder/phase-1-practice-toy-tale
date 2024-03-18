let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyCollection = document.querySelector("#toy-collection");

  function addToyCardToPage(toy) {
    const toyCard = document.createElement("div");
    toyCard.className = "card";
    const toyName = document.createElement("h2");
    toyName.textContent = toy.name;
    const toyImage = document.createElement("Img");
    toyImage.src = toy.image;
    toyImage.alt = `${toyName} avatar`;
    toyImage.className = "toy-avatar";
    const likes = document.createElement("p");
    likes.textContent = `${toy.likes} like`;
    if (toy.likes !== 1) {
      likes.textContent += "s";
    }
    const likeBtn = document.createElement("button");
    likeBtn.addEventListener("click", () => {
      toy.likes += 1;
      likes.textContent = `${toy.likes} like`;
      if (toy.likes !== 1) {
        likes.textContent += "s";
      }
      const updateLike = async () => {
        response = await fetch(`http://localhost:3000/toys/${toy.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ likes: toy.likes }),
        });
      };
      updateLike();
    });
    likeBtn.className = "like-btn";
    likeBtn.textContent = "like ❤";
    likeBtn.id = toy.id;
    toyCard.append(toyName, toyImage, likes, likeBtn);
    toyCollection.append(toyCard);
  }

  // GET request to get card info
  // load each toy in a card
  const fetchToys = async () => {
    const response = await fetch("http://localhost:3000/toys");
    const toys = await response.json();

    for (toy of toys) {
      newToyID = toy.id;
      addToyCardToPage(toy);
    }
  };
  fetchToys();

  // Add new toy cards from submitted form
  const toyForm = document.querySelector("form");
  toyForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const newToy = {
      name: event.target.name.value,
      image: event.target.image.value,
      likes: 0,
    };
    // POST new toy card to the server
    const addToy = async () => {
      const response = await fetch("http://localhost:3000/toys", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(newToy),
      });
    };
    addToy();
    addToyCardToPage(newToy);
    event.target.reset();
  });

  const toyFormContainer = toyForm.parentNode;
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});
