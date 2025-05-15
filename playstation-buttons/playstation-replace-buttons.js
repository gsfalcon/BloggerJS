document.addEventListener("DOMContentLoaded", function () {
  const symbolMap = {
    // Botão X
    "✕": "https://raw.githubusercontent.com/seu-usuario/seu-repo/main/imagens/x.png",
    "❌": "https://raw.githubusercontent.com/seu-usuario/seu-repo/main/imagens/x.png",
    "⨉": "https://raw.githubusercontent.com/seu-usuario/seu-repo/main/imagens/x.png",
    "×": "https://raw.githubusercontent.com/seu-usuario/seu-repo/main/imagens/x.png",

    // Botão Quadrado
    "□": "https://raw.githubusercontent.com/seu-usuario/seu-repo/main/imagens/square.png",
    "■": "https://raw.githubusercontent.com/seu-usuario/seu-repo/main/imagens/square.png",
    "⬛": "https://raw.githubusercontent.com/seu-usuario/seu-repo/main/imagens/square.png",
    "🟥": "https://raw.githubusercontent.com/seu-usuario/seu-repo/main/imagens/square.png",

    // Botão Círculo
    "◯": "https://raw.githubusercontent.com/seu-usuario/seu-repo/main/imagens/circle.png",
    "●": "https://raw.githubusercontent.com/seu-usuario/seu-repo/main/imagens/circle.png",
    "⚫": "https://raw.githubusercontent.com/seu-usuario/seu-repo/main/imagens/circle.png",
    "⭕": "https://raw.githubusercontent.com/seu-usuario/seu-repo/main/imagens/circle.png",

    // Botão Triângulo
    "△": "https://raw.githubusercontent.com/seu-usuario/seu-repo/main/imagens/triangle.png",
    "▲": "https://raw.githubusercontent.com/seu-usuario/seu-repo/main/imagens/triangle.png",
    "🔺": "https://raw.githubusercontent.com/seu-usuario/seu-repo/main/imagens/triangle.png"
  };

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
          img.style.width = "1em"; // Escala com o texto
          img.style.height = "1em"; // Para manter proporção
          img.style.verticalAlign = "middle"; // Alinha com o texto
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
