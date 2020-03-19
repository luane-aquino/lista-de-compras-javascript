class Lista {

  constructor() {
    this.listaDeCompras = document.querySelector("#lista-de-compras")
    this.arrayDeItens = []
  }

  montaArray() {
    if (localStorage.getItem("produtos")) {
      const arrayConvertido = JSON.parse(localStorage.getItem("produtos"))
      this.arrayDeItens = arrayConvertido
    }
  }

  montaLista() {
    let conteudo = ''
    this.arrayDeItens.forEach(item => {
      conteudo += `
      <li>
        <span>${item}</span>
        <button class="deletar">deletar</button>
      </li>
      `
    })
    this.listaDeCompras.innerHTML = conteudo;
  }

  adicionaItem(item) {
    this.arrayDeItens.push(item)
    const arrayJSON = JSON.stringify(this.arrayDeItens)
    localStorage.setItem("produtos", arrayJSON)

  }

  deletarItemDaLista(event) {
    const itemDeletado = event.target.previousSibling.previousSibling
    if (event.target.classList.contains('deletar')) {
      if (confirm("Tem certeza?")) {
        event.target.parentElement.remove()
        this.arrayDeItens.forEach((item, index) => {
          if (itemDeletado.innerText === item) {
          this.arrayDeItens.splice(index, 1)
          }
        })
        const arrayJSON = JSON.stringify(this.arrayDeItens)
        localStorage.setItem("produtos", arrayJSON)
      }
    }
  }

  deletarLista() {
    botaoDeletar.addEventListener("click", () => {
      localStorage.clear()
      this.listaDeCompras.innerHTML = ''
    })
  }
}