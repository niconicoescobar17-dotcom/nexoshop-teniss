
/* =========================================
   URBANSOLE - CONFIGURACIÓN
========================================= */

const STORE_CONFIG = {
  // Coloca aquí el WhatsApp del negocio.
  // Colombia: 57 + número de celular.
  // Ejemplo: 573001234567

  whatsappNumber: "REEMPLAZAR_CON_NUMERO",

  storeName: "URBANSOLE"
};


/* =========================================
   ELEMENTOS
========================================= */

const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

const quantitySelect = document.getElementById("customerQuantity");
const secondSizeRow = document.getElementById("secondSizeRow");
const secondSizeSelect = document.getElementById("customerSize2");


/* =========================================
   SEGUNDA TALLA PARA DOS PARES
========================================= */

quantitySelect?.addEventListener("change", () => {

  const isTwoPairs = quantitySelect.value === "2 pares";

  if (secondSizeRow) {
    secondSizeRow.hidden = !isTwoPairs;
  }

  if (secondSizeSelect) {
    secondSizeSelect.required = isTwoPairs;
  }

});


/* =========================================
   MENÚ RESPONSIVE
========================================= */

menuToggle?.addEventListener("click", () => {

  const isOpen = mainNav.classList.toggle("open");

  menuToggle.setAttribute(
    "aria-expanded",
    String(isOpen)
  );

});

mainNav?.querySelectorAll("a").forEach(link => {

  link.addEventListener("click", () => {

    mainNav.classList.remove("open");

    menuToggle?.setAttribute(
      "aria-expanded",
      "false"
    );

  });

});


/* =========================================
   AÑO AUTOMÁTICO
========================================= */

document.getElementById("currentYear").textContent =
  new Date().getFullYear();


/* =========================================
   VALIDAR WHATSAPP
========================================= */

function whatsappConfigured() {

  return /^\d{10,15}$/.test(
    STORE_CONFIG.whatsappNumber
  );

}


/* =========================================
   ABRIR WHATSAPP
========================================= */

function openWhatsApp(message) {

  if (!whatsappConfigured()) {

    const feedback = document.getElementById("formFeedback");

    if (feedback) {

      feedback.textContent =
        "Debes configurar primero el número de WhatsApp en script.js.";

    } else {

      alert(
        "Configura el número de WhatsApp del negocio en script.js."
      );

    }

    return;
  }

  const url =
    `https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;

  window.open(
    url,
    "_blank",
    "noopener,noreferrer"
  );

}


/* =========================================
   FORMULARIO DE PEDIDOS
========================================= */

document.getElementById("orderForm")?.addEventListener(
  "submit",
  event => {

    event.preventDefault();

    const form = event.currentTarget;

    if (!form.reportValidity()) {
      return;
    }

    const data = new FormData(form);

    const name = String(data.get("name") || "").trim();

    const phone = String(data.get("phone") || "").trim();

    const city = String(data.get("city") || "").trim();

    const size = String(data.get("size") || "").trim();

    const quantity = String(
      data.get("quantity") || "1 par"
    );

    const size2 = String(
      data.get("size2") || ""
    ).trim();

    const extra = String(
      data.get("message") || ""
    ).trim();


    /* PRECIOS */

    const price =
      quantity === "2 pares"
        ? "$195.900 COP"
        : "$116.000 COP";


    /* MENSAJE DE PEDIDO */

    const message = [

      `Hola, quiero pedir los Tenis Urban White Edition.`,

      `Nombre: ${name}`,

      `Mi WhatsApp: ${phone}`,

      `Ciudad: ${city}`,

      `Talla del primer par: ${size}`,

      quantity === "2 pares"
        ? `Talla del segundo par: ${size2}`
        : "",

      `Cantidad: ${quantity}`,

      `Precio publicado: ${price}`,

      extra
        ? `Mensaje adicional: ${extra}`
        : "",

      `Por favor, confirmen disponibilidad, costo de envío y condiciones de entrega.`

    ].filter(Boolean).join("\n");


    openWhatsApp(message);

  }
);


/* =========================================
   BOTÓN FLOTANTE WHATSAPP
========================================= */

document.getElementById("floatingWhatsapp")?.addEventListener(
  "click",
  event => {

    event.preventDefault();

    openWhatsApp(
      "Hola, quiero más información sobre los Tenis Urban White Edition. Vi que el precio es $116.000 por un par o $195.900 por dos pares. ¿Me confirman disponibilidad?"
    );

  }
);


/* =========================================
   PREGUNTAS FRECUENTES
========================================= */

document.querySelectorAll(".faq-list details").forEach(item => {

  item.addEventListener("toggle", () => {

    if (item.open) {

      document.querySelectorAll(".faq-list details").forEach(other => {

        if (other !== item) {
          other.open = false;
        }

      });

    }

  });

});
