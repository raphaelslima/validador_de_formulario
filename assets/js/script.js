class ValidaFormulario {
  constructor() {
    this.formulario = document.querySelector('.formulario')
    this.eventos()
  }

  eventos() {
    this.formulario.addEventListener('submit', e => {
      this.hadleSubmit(e)
    })
  }

  hadleSubmit(e) {
    e.preventDefault()
    const camposValidos = this.camposValidos()
    const senhasValidas = this.senhasValidas()

    if (camposValidos && senhasValidas) {
      alert('Formulário enviado com sucesso')
      this.formulario.submit()
    }
  }

  senhasValidas() {
    let valid = true

    const senha = this.formulario.querySelector('.senha')
    const repetirSenha = this.formulario.querySelector('.repetir-senha')

    if (senha.value !== repetirSenha.value) {
      valid = false
      this.criaErro(senha, 'As senhas não são semelhantes')
      this.criaErro(repetirSenha, 'As senhas não são semelhantes')
    }

    if (senha.value.length < 3 || senha.value.length > 12) {
      valid = false
      this.criaErro(senha, 'A senha precisa conter entre 6 a 12 caracteres')
    }

    return valid
  }

  camposValidos() {
    let valid = true

    for (let error of this.formulario.querySelectorAll('.error-text')) {
      error.remove()
    }

    for (let campo of this.formulario.querySelectorAll('.validar')) {
      if (!campo.value) {
        valid = false
        const label = campo.previousElementSibling
        const labeltext = label.innerHTML
        this.criaErro(campo, `Campo "${labeltext}" não pode ser enviado vazio`)
      }

      if (campo.classList.contains('cpf')) {
        if (!this.validaCPF(campo)) valid = false
      }

      if (campo.classList.contains('usuario')) {
        if (!this.validaUsuario(campo)) valid = false
      }
    }

    return valid
  }

  criaErro(campo, msg) {
    const div = document.createElement('div')
    div.innerHTML = msg
    div.classList.add('error-text')
    campo.insertAdjacentElement('afterend', div)
  }

  validaCPF(campo) {
    const cpf = new ValidaCPF(campo.value)

    if (!cpf.valida()) {
      this.criaErro(campo, 'CPF inválido')
      return false
    }
    return true
  }

  validaUsuario(campo) {
    const usuario = campo.value
    let valid = true

    if (usuario.length < 3 || usuario.length > 12) {
      this.criaErro(campo, 'Usuário precisa ter entre 3 e 12 caracteres.')
      valid = false
    }

    if (!usuario.match(/^[a-zA-Z0-9]+$/g)) {
      this.criaErro(
        campo,
        'Nome de usuário precisar conter apenas letras e/ou números.'
      )
      valid = false
    }

    return valid
  }
}

const valida = new ValidaFormulario()
