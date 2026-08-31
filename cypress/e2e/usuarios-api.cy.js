///<reference types="cypress"/>

let token

beforeEach(() => {
  cy.geraToken('admin@biblioteca.com', 'admin123').then(tkn =>{
    token = tkn
  
  })
});

describe('GET Teste-api gestao de usuario', () => {
  it('Deve listar usuarios com sucesso', () => {
    cy.request({
      method: 'GET',
      url: 'users',
      headers: { 'Authorization': token }
    }).should(response => {
      expect(response.status).to.equal(200)
      expect(response.body.users).to.be.an('array')
    })
  });

  it('Deve validar propiedades de usuario', () => {
    cy.request({
      method: 'GET',
      url: 'users',
      headers: { 'Authorization': token }
    }).should(response => {
      expect(response.status).to.equal(200)
      expect(response.body.users[0]).to.have.property('id')
      expect(response.body.users[0]).to.have.property('name')
      expect(response.body.users[0]).to.have.property('email')
    });
  });
});

describe('POST-Teste-api Gestao de usuario', () => {
  it('Deve cadastrar usuario com sucesso', () => {
   let email =`marcos${Date.now()}@gmail.com`
    cy.request({
      method: 'POST',
      url:'users' ,
      body: {
        "name": "Marcos Perez",
        "email": email,
        "password": "senha123"
      }
    }).should(response => {
      expect(response.status).to.equal(201)
      expect(response.body.message).to.equal('Usuário criado com sucesso.')
    })
  });

  it('Nao deve permitir cadastrar usuario com email invalido', () => {
    cy.request({
      method: 'POST',
      url:'users',
       failOnStatusCode: false,
      body: {
        "name": "Marcos Fabian",
        "email": "marcosteste511email.com", // inválido
        "password": "senha123"
      }
    }).should(response => {
      expect(response.status).to.equal(400)
      expect(response.body.message).to.equal('Formato de email inválido.')
    })
  });
});
