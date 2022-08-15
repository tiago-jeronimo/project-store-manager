const { expect } = require('chai');
const sinon = require('sinon');
const CONTROLLER = require('../../../controllers/productsController');
const SERVICE = require('../../../services/productsServices');

describe(' CAMADA CONTROLLER - Testa camada Service para requição de produtos', () => {

  describe('1 - Ao fazer requisição para "/products"', () => {

    describe('✅ Se for resolvido', () => {
      const response = {};
      const request = {};
      const products = [
        { id: 1, name: 'Martelo de Thor' },
      ]
      before(() => {
        request.body = {};
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        sinon.stub(SERVICE, 'getProducts').resolves(products)
      })

      after(() => {
        SERVICE.getProducts.restore();
      })


      it('1.1 - Se o código do status é 200', async () => {
        await CONTROLLER.getProducts(request, response)
        expect(response.status.calledWith(200)).to.be.equal(true);
      });
      it('1.1 - Se o tipo de retorno é um array', async () => {
          await CONTROLLER.getProducts(request, response)
          expect([response]).to.be.an('array');
      });
      it('1.3 - Se para os values das keys "id" e "name" são "1" e "Martelo de Thor", respectivamente ', async () => {
        await CONTROLLER.getProducts(request, response);
        expect(response.json.calledWith(products)).to.be.equal(true);
      });
    })

    describe('❌ Se for *não* resolvido', () => {
      const response = {};
      const request = {};
      const error = { message: 'Product not found', code: 404 };
      before(() => {
        request.body = {};
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        sinon.stub(SERVICE, 'getProducts').resolves(error)
      })

      after(() => {
        SERVICE.getProducts.restore();
      })


      it('1.4 - Se o código do status é 404', async () => {
        await CONTROLLER.getProducts(request, response)
        expect(response.status.calledWith(404)).to.be.equal(true);
      });
      it('1.5 - Se dentro do retorno existe um objeto com as keys "message" e "code"', async () => {
        await CONTROLLER.getProducts(request, response)
        expect(response.json.calledWith({ "message": "Product not found" })).to.be.equal(true);
      });
    })
  });


  describe('2 - Ao fazer requisição para "/products/:id"', () => {

    describe('✅ Se for resolvido', () => {
      const response = {};
      const request = {};

      const products = { id: 1, name: 'Martelo de Thor' };

      before(() => {
        request.body = {};
        request.params = { id: 1 }
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        sinon.stub(SERVICE, 'getProducts').resolves(products)
      })

      after(() => {
        SERVICE.getProducts.restore();
      })


      it('2.1 - Se o tipo de retorno é um objeto', async () => {
         await CONTROLLER.getProductById(request, response);
        expect(response).to.be.an('object');
      });

      it('2.2 - - Se o código do status é 200', async () => {
        await CONTROLLER.getProducts(request, response)
        expect(response.status.calledWith(200)).to.be.equal(true);
      });

      it('2.3 - Se para os values das keys "id" e "name" são "1" e "Martelo de Thor", respectivamente ', async () => {
        await CONTROLLER.getProductById(request, response);
        expect(response.json.calledWith(products)).to.be.equal(true);
      });
    })


    describe('❌ Se for *não* resolvido', () => {
    
      const response = {};
      const request = {};
      const error = { message: 'Product not found', code: 404 };
      before(() => {
        request.body = {};
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        sinon.stub(SERVICE, 'getProducts').resolves(error)
      })

      after(() => {
        SERVICE.getProducts.restore();
      })
  
      it('2.4 - Se o código do status é 404', async () => {
        await CONTROLLER.getProducts(request, response)
        expect(response.status.calledWith(404)).to.be.equal(true);
      });
     it('2.5 - Se dentro do retorno existe um objeto com as keys "message" e "code"', async () => {
      await CONTROLLER.getProducts(request, response)
       expect(response.json.calledWith({ "message": "Product not found" })).to.be.equal(true);
    });
    })
   
  });
});