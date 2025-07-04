document.addEventListener("DOMContentLoaded", function () {
  const symbolMap = {
    // Botão X
    "✕": "https://gsfalcon.github.io/BloggerJS/playstation-buttons/img/playstation_X_button.png",
    "❌": "https://gsfalcon.github.io/BloggerJS/playstation-buttons/img/playstation_X_button.png",
    "⨉": "https://gsfalcon.github.io/BloggerJS/playstation-buttons/img/playstation_X_button.png",
    "×": "https://gsfalcon.github.io/BloggerJS/playstation-buttons/img/playstation_X_button.png",

    // Botão Quadrado
    "□": "https://gsfalcon.github.io/BloggerJS/playstation-buttons/img/playstation_square_button.png",
    "■": "https://gsfalcon.github.io/BloggerJS/playstation-buttons/img/playstation_square_button.png",
    "⬛": "https://gsfalcon.github.io/BloggerJS/playstation-buttons/img/playstation_square_button.png",
    "🟥": "https://gsfalcon.github.io/BloggerJS/playstation-buttons/img/playstation_square_button.png",

    // Botão Círculo
    "◯": "https://gsfalcon.github.io/BloggerJS/playstation-buttons/img/playstation_circle_button.png",
    "●": "https://gsfalcon.github.io/BloggerJS/playstation-buttons/img/playstation_circle_button.png",
    "⚫": "https://gsfalcon.github.io/BloggerJS/playstation-buttons/img/playstation_circle_button.png",
    "⭕": "https://gsfalcon.github.io/BloggerJS/playstation-buttons/img/playstation_circle_button.png",
    "○": "https://gsfalcon.github.io/BloggerJS/playstation-buttons/img/playstation_circle_button.png",
    "○": "https://gsfalcon.github.io/BloggerJS/playstation-buttons/img/playstation_circle_button.png",


    // Botão Triângulo
    "△": "https://gsfalcon.github.io/BloggerJS/playstation-buttons/img/playstation_triangle_button.png",
    "▲": "https://gsfalcon.github.io/BloggerJS/playstation-buttons/img/playstation_triangle_button.png",
    "🔺": "https://gsfalcon.github.io/BloggerJS/playstation-buttons/img/playstation_triangle_button.png"
  };

  // Função recursiva para substituir os símbolos por imagens
  function replaceSymbols(node) {
    if (node.nodeType === Node.TEXT_NODE) {
      const parent = node.parentNode;
      const text = node.nodeValue;

      const fragment = document.createDocumentFragment();

      for (const char of text) {
        if (symbolMap[char]) {
          const img = document.createElement("img");
          img.src = symbolMap[char];
          img.alt = char;
          img.style.width = "1em";
          img.style.height = "1em";
          img.style.verticalAlign = "middle";
          img.style.display = "inline-block";

          // Se estiver dentro de <code>, aumenta o tamanho
          if (parent.nodeName === "CODE") {
            img.style.width = "1.4em";
            img.style.height = "1.4em";
          }

          fragment.appendChild(img);
        } else {
          fragment.appendChild(document.createTextNode(char));
        }
      }

      parent.replaceChild(fragment, node);
    } else if (
      node.nodeType === Node.ELEMENT_NODE &&
      node.tagName !== "SCRIPT" &&
      node.tagName !== "STYLE"
    ) {
      for (const child of Array.from(node.childNodes)) {
        replaceSymbols(child);
      }
    }
  }

  const postBody = document.getElementById("postBody");
  if (postBody) {
    replaceSymbols(postBody);
  }
});
