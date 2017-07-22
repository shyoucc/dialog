 let Dialog  = require('../src/dialog.js')
 let expect = require('chai').expect

 describe('dialog test', function(){
    it('should return dom', function(){
        let o = new Dialog()
        expect(o._create()).to.be.equal()
    })
 })

