const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../models/connection')
const productModels = require('../../../models/productsModels')

describe('CAMADA MODELS - Testa camada Models para requição de produtos', () => {

  describe('1 - Ao fazer requisição para "/products"', () => {
  
      describe('✅ Se for resolvido', () => {

        before( () => {
          const products = [
            { id: 1, name: 'Martelo de Thor' },
          ]
          sinon.stub(connection, 'execute').resolves([products])
        })
      
        after(() => {
          connection.execute.restore();
        })
      
      
        it('1.1 - Se o tipo de retorno é um array', async () => {
          const response = await productModels.getProducts();
          // console.log(response);
          expect(response).to.be.an('array');
        });
        it('1.2 - Se dentro do retorno existe um objeto com as keys "id" e "name"', async () => {
          const response = await productModels.getProducts();
          expect(response[0]).to.have.a.property('id')
          expect(response[0]).to.have.a.property('name')
        });
        it('1.3 - Se para os values das keys "id" e "name" são "1" e "Martelo de Thor", respectivamente ', async () => {
          const response = await productModels.getProducts();
          expect(response[0]).to.deep.equal({ "id": 1, "name": 'Martelo de Thor' });
        });
      })

  describe('❌ Se for *não* resolvido', () => {

        before(() => {
          const products = []
          sinon.stub(connection, 'execute').resolves([products])
        })

        after(() => {
          connection.execute.restore();
        })


        it('1.4 - Se o tipo de retorno é um objeto', async () => {
          const response = await productModels.getProducts();
          expect(response).to.be.an('object');
        });
        it('1.5 - Se dentro do retorno existe um objeto com as keys "message" e "code"', async () => {
          const response = await productModels.getProducts();
          expect(response).to.have.a.property('message')
          expect(response).to.have.a.property('code')
        });
        it('1.6 - Se para os values das keys "message" e "code" são "Product not found" e "404", respectivamente ', async () => {
          const response = await productModels.getProducts();
          expect(response).to.deep.equal({ message: 'Product not found', code: 404  });
        });
      })
  });
  

  describe('2 - Ao fazer requisição para "/products/:id"', () => {

    describe('✅ Se for resolvido', () => {

      before(() => {
        const products = [
          { id: 1, name: 'Martelo de Thor' },
        ]
        sinon.stub(connection, 'execute').resolves([products])
      })

      after(() => {
        connection.execute.restore();
      })


      
      it('2.1 - Se o tipo de retorno é um objeto', async () => {
        const response = await productModels.getProductById(1);
        expect(response).to.be.an('object');
      });

      it('2.2 - Se dentro do retorno existe um objeto com as keys "id" e "name"', async () => {
        const response = await productModels.getProductById(1);
        expect(response).to.have.a.property('id')
        expect(response).to.have.a.property('name')
      });

      it('2.3 - Se para os values das keys "id" e "name" são "1" e "Martelo de Thor", respectivamente ', async () => {
        const response = await productModels.getProductById(1);
        expect(response).to.deep.equal({ "id": 1, "name": 'Martelo de Thor' });
      });
    })


    describe('❌ Se for *não* resolvido', () => {

      before(() => {
        const products = []
        sinon.stub(connection, 'execute').resolves([products])
      })

      after(() => {
        connection.execute.restore();
      })

      it('2.4 - Se o tipo de retorno é um objeto', async () => {
        const response = await productModels.getProductById(1);
        expect(response).to.be.an('object');
      });

      it('2.5 - Se dentro do retorno existe um objeto com as keys "message" e "code"', async () => {
        const response = await productModels.getProductById(1);
        expect(response).to.have.a.property('message')
        expect(response).to.have.a.property('code')
      });

      it('2.6 - Se para os values das keys "message" e "code" são "Product not found" e "404", respectivamente ', async () => {
        const response = await productModels.getProductById(1);
        expect(response).to.deep.equal({ message: 'Product not found', code: 404 });
      });
    })
  });
})