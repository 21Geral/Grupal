const main = document.querySelector("main");
const getData = async () => {
  const response = await fetch("../data.json");
  const data = await response.json();
  return data;
};

const createButtonAddCart = () => {
  const button = document.createElement("button");
  button.className =
    "btn-agregar bg-white text-[#ec6d47] border border-[#ec6d47] px-4 py-1.5 rounded-full text-sm font-semibold hover:bg-[#fff2ee] transition flex items-center gap-2 shadow-md cursor-pointer";

  const imgCart = document.createElement("img");
  imgCart.src = "./images/icon-add-to-cart.svg";
  imgCart.alt = "icon-add-to-cart";
  imgCart.className = "w-4 h-4";

  const text = document.createElement("span");
  text.textContent = "Add to Cart";

  button.appendChild(imgCart);
  button.appendChild(text);

  return button;
};

const createQuantitySelector= (initial = 1)=>{
  const container = document.createElement("div");
  container.className =
    "bg-[#c83b0e] text-white  px-4 py-1.5 rounded-full text-sm font-semibold flex items-center justify-between gap-2 shadow-md w-full select-none";

  const btnMinus = document.createElement("button");
  btnMinus.className = "p-1 hover:scale-110 transition cursor-pointer";
  const iconMinus = document.createElement("img");
  iconMinus.src = "./images/icon-decrement-quantity.svg";
  iconMinus.alt = "Disminuir cantidad";
  btnMinus.appendChild(iconMinus);

  const counter = document.createElement("span");
  counter.className =
    "text-white font-semibold text-gray-700 min-w-[20px] text-center";
  counter.textContent = initial;

  const btnPlus = document.createElement("button");
  btnPlus.className = "p-1 hover:scale-110 transition cursor-pointer";
  const iconPlus = document.createElement("img");
  iconPlus.src = "./images/icon-increment-quantity.svg";
  iconPlus.alt = "Aumentar cantidad";
  btnPlus.appendChild(iconPlus);

  btnMinus.addEventListener("click", () => {
    let value = parseInt(counter.textContent);
    if (value > 0) counter.textContent = value - 1;
  });

  btnPlus.addEventListener("click", () => {
    let value = parseInt(counter.textContent);
    counter.textContent = value + 1;
  });

  container.appendChild(btnMinus);
  container.appendChild(counter);
  container.appendChild(btnPlus);

  return container;
}
function createCartControls() {
  const wrapper = document.createElement("div");
  wrapper.className = "flex justify-center items-center";

  const button = createButtonAddCart();
  const quantitySelector = createQuantitySelector(1);

  
  quantitySelector.style.display = "none";

 
  button.addEventListener("click", () => {
    button.style.display = "none";
    quantitySelector.style.display = "flex";
  });


  const counter = quantitySelector.querySelector("span");
  const btnMinus = quantitySelector.querySelector("button:first-child");

  btnMinus.addEventListener("click", () => {
    let value = parseInt(counter.textContent);
    if (value < 1) {
      quantitySelector.style.display = "none";
      button.style.display = "flex";
      counter.textContent = "1"; 
    }
  });

  wrapper.appendChild(button);
  wrapper.appendChild(quantitySelector);

  return wrapper;
}

const listData = async () => {
  const sectionCard = document.createElement("section");

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

      // const button =createButtonAddCart();
      const button = createCartControls();
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
  elementsLittleCar.className = "flex flex-col justify-center items-center";

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

  if (main) main.appendChild(section);

  return section;
};

export { listData, createLittleCarSection };
