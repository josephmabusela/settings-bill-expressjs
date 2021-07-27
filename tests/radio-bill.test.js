describe('radio-bill', function () {
    it('should calculate the call total for 2 calls at R2.75 each', function () {
        var call = radioBill();

        call.radioItem('call');
        call.radioItem('call');
    
        assert.equal('R' + 5.50, call.radioCallTotal());
    
    });

    it("should calculate the sms total for 3 sms's at 0.75 each", function () {
        var sms = radioBill();

        sms.radioItem('sms');
        sms.radioItem('sms');
        sms.radioItem('sms');  
    
        assert.equal('R' + 2.25, sms.radioSmsTotal());
    
    });

 
    it("should calculate the bill for 2 phone calls and 2 sms's", function () {
        var call = radioBill();
        var sms = radioBill();

        call.radioItem('call');
        sms.radioItem('sms');
        call.radioItem('call');
        sms.radioItem('sms');
      

        assert.equal('R' + 5.50, call.radioTotal());
        assert.equal('R' + 1.50, sms.radioTotal());

});

it('should not return a warning for a radio bill of R3.50', function(){
    var totalBill = radioBill();
    
    totalBill.radioItem('call');
    totalBill.radioItem('sms');
  
    assert.equal('', totalBill.levels());
});


it('should return  warning for  bill  of R31.00', function(){
    var totalBill = radioBill();

    totalBill.radioItem('call');
    totalBill.radioItem('call');
    totalBill.radioItem('call');
    totalBill.radioItem('call');
    totalBill.radioItem('call');
    totalBill.radioItem('call');
    totalBill.radioItem('call');
    totalBill.radioItem('call');
    totalBill.radioItem('call');
    totalBill.radioItem('call');
    totalBill.radioItem('call');

    totalBill.radioItem('sms');
   
    assert.equal('warning', totalBill.levels());

});

it('should return  critical for bill of R56.50', function(){
    var totalBill = radioBill();

    totalBill.radioItem('call');
    totalBill.radioItem('call');
    totalBill.radioItem('call');
    totalBill.radioItem('call');
    totalBill.radioItem('call');
    totalBill.radioItem('call');
    totalBill.radioItem('call');
    totalBill.radioItem('call');
    totalBill.radioItem('call');
    totalBill.radioItem('call');
    totalBill.radioItem('call');
    totalBill.radioItem('call');
    totalBill.radioItem('call');
    totalBill.radioItem('call');
    totalBill.radioItem('call');
    totalBill.radioItem('call');
    totalBill.radioItem('call');
    totalBill.radioItem('call');
    totalBill.radioItem('call');
    totalBill.radioItem('call');

    totalBill.radioItem('sms');
    totalBill.radioItem('sms');
        
    assert.equal( 'critical', totalBill.levels());

});

})