const getData = async () => {
  const response = await fetch("../data.json");
  const data = await response.json();
  return data;
};

const listData = async () => {
  const main = document.querySelector("main");
  const sectionCard = document.createElement("section");
  const sectionLittleCar = document.createElement("section");

  const titleCard = document.createElement("h2");
  titleCard.className = "text-[#372824] font-bold text-3xl mb-6";
  titleCard.textContent = "Desserts";
  sectionCard.appendChild(titleCard);

  const contentCards = document.createElement("div");
  contentCards.className =
    "grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3";

  try {
    const data = await getData();

    data.forEach((dessert) => {
      const card = document.createElement("div");
      card.className = "flex flex-col";

      const contentImg = document.createElement("div");
      contentImg.className = "rounded-xl overflow-hidden";

      const picture = document.createElement("picture");

      const sourceDesktop = document.createElement("source");
      sourceDesktop.srcset = dessert.image.desktop;
      sourceDesktop.media = "(min-width: 1024px)";

      const sourceTablet = document.createElement("source");
      sourceTablet.srcset = dessert.image.tablet;
      sourceTablet.media = "(min-width: 768px)";

      const img = document.createElement("img");
      img.src = dessert.image.mobile;
      img.alt = dessert.name;
      img.className = "w-full h-auto rounded-xl";

      picture.appendChild(sourceDesktop);
      picture.appendChild(sourceTablet);
      picture.appendChild(img);
      contentImg.appendChild(picture);

      const contentInfo = document.createElement("div");
      contentInfo.className = "-mt-5 flex justify-center z-10 flex-col";

      const botonDiv = document.createElement("div");
      botonDiv.className = "boton flex justify-center items-center";

      const button = document.createElement("button");
      button.className =
        "btn-agregar bg-white text-[#ec6d47] border border-[#ec6d47] px-4 py-1.5 rounded-full text-sm font-semibold hover:bg-[#fff2ee] transition flex items-center gap-2 shadow-md cursor pointer";

      button.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
        </svg>
        Añadir al Carrito
      `;

      botonDiv.appendChild(button);

      const p1 = document.createElement("p");
      p1.className = "mt-4 text-xs text-gray-500";
      p1.textContent = dessert.category;

      const p2 = document.createElement("p");
      p2.className = "text-sm font-semibold text-gray-800";
      p2.textContent = dessert.name;

      const p3 = document.createElement("p");
      p3.className = "text-[15px] font-bold text-[#ea6950]";
      p3.textContent = `$${dessert.price.toFixed(2)}`;

      contentInfo.appendChild(botonDiv);
      contentInfo.appendChild(p1);
      contentInfo.appendChild(p2);
      contentInfo.appendChild(p3);

      card.appendChild(contentImg);
      card.appendChild(contentInfo);

      contentCards.appendChild(card);
    });

    sectionCard.appendChild(contentCards);
    main.appendChild(sectionCard);
  } catch (error) {
    console.error("Error al cargar JSON:", error);
  }
};

const createLittleCarSection = () => {
  const section = document.createElement("section");
  section.className = "contenedor-carrito w-full md:sticky md:top-8 self-start";

  const wrapper = document.createElement("div");
  wrapper.className = "bg-white rounded-xl shadow-md p-6 w-full";

  const h2 = document.createElement("h2");
  h2.className = "text-lg font-bold text-red-700 mb-4";
  h2.innerHTML = `Your Cart (<span>0</span>)`;

  const elementsLittleCar = document.createElement("div");
  elementsLittleCar.className ="flex flex-col justify-center items-center";

  const emptyImg = document.createElement("img");
  emptyImg.src = "./images/illustration-empty-cart.svg";
  emptyImg.alt = "illustration-empty-cart.svg";
  emptyImg.className = "w-[50%] h-auto rounded-xl";
  const emptyMsg = document.createElement("p");
  emptyMsg.className = "text-[#9d7871] text-sm text-center";
  emptyMsg.textContent = "Your added items will appear here";
  elementsLittleCar.appendChild(emptyImg);
  elementsLittleCar.appendChild(emptyMsg);

  const total = document.createElement("p");
  total.className = "text-gray-700 font-bold text-right mt-4";
  total.innerHTML = `Total: $<span class="total-carrito">0.00</span>`;

  const button = document.createElement("button");
  button.id = "confirmar-pedido";
  button.className =
    "confirmar-pedido bg-[#ea6950] text-white w-full mt-4 py-2 rounded-full hover:bg-[#d85a3f] transition";
  button.textContent = "Confirmar Pedido";

  wrapper.appendChild(h2);
//   wrapper.appendChild(emptyImg);
  wrapper.appendChild(elementsLittleCar);
//   wrapper.appendChild(total);
  section.appendChild(wrapper);

  const main = document.querySelector("main");
  if (main) main.appendChild(section);

  return section;
};

export { listData, createLittleCarSection };
