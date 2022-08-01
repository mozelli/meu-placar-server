module.exports = {
  emailValidationView(name, url) {
    return `
    <div style="font-family: verdana;">
    <h3>Meu Placar - Confirmação de E-mail</h3>
    <br />
    <p>Olá ${name}!</p>
    <p>
      Estamos felizes por você fazer parte da nossa plataforma de entretenimento
      <strong>Meu Placar</strong>.
    </p>
    <p>
      Só falta mais um passo para finalizar seu cadastro. Clique no link abaixo para
      verificarmos que este e-mail é realmente seu.
    </p>
    <p><a href="${url}" style="text-decoration: none">Clique aqui!</a></p>
    <br />
    <p>Atenciosamente, equipe Meu Placar.</p>
    </div>
    `;
  },
};
