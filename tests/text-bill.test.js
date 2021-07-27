describe('text-bill', function () {
    it('should calculate the call total for 3 calls ', function () {
        var call = textBill();

        call.billText('call');
        call.billText('call');
        call.billText('call');
       
    
        assert.equal('R' + 8.25, call.callTotal());
    
    });

    it('should calculate the sms total for 3 sms\'', function () {
        var sms = textBill();

        sms.billText('sms');
        sms.billText('sms');
        sms.billText('sms'); 
    
        assert.equal('R' + 2.25, sms.smsTotal());
    
    });

 
    it("should calculate the total for 2 phone calls and 2 sms's", function () {
        var sms = textBill();
        var call = textBill();
        //var total = textBill();

        call.billText('call');
        sms.billText('sms');
        call.billText('call');
        sms.billText('sms');
        //total.billText(total)

        assert.equal('R' + 5.50, call.callTotal());
        assert.equal('R' + 1.50, sms.smsTotal());
       // assert.equal('R' + 7.00, total.totalTotal());

    });

    it('should not return a warning or critical for a total of R21', function(){
        var total = textBill();

        total.billText('call');
        total.billText('sms');
        total.billText('call');
        total.billText('sms');
        total.billText('call');
        total.billText('sms');
        total.billText('call');
        total.billText('sms');
        total.billText('call');
        total.billText('sms');
        total.billText('call');
        total.billText('sms'); 
        

        assert.equal('',total.level());
    });


    it('should return warning for total  of R30.75', function(){
        var total = textBill();

        total.billText('sms');
        total.billText('sms');
        total.billText('sms');
        total.billText('sms');
        total.billText('sms');
        total.billText('sms');
        total.billText('sms');
        total.billText('sms');
        total.billText('sms');
        total.billText('sms');
        total.billText('sms');
        total.billText('sms');
        total.billText('sms');
        total.billText('sms');
        total.billText('sms');
        total.billText('sms');
        total.billText('sms');
        total.billText('sms');
        total.billText('sms');
        total.billText('sms');
        total.billText('sms');
        total.billText('sms');
        total.billText('sms');
        total.billText('sms');
        total.billText('sms');
        total.billText('sms');
        total.billText('sms');
        total.billText('sms');
        total.billText('sms');
        total.billText('sms');
        total.billText('sms');
        total.billText('sms');
        total.billText('sms');
        total.billText('sms');
        total.billText('sms');
        total.billText('sms');
        total.billText('sms');
        total.billText('sms');
        total.billText('sms');
        total.billText('sms');
        total.billText('sms');

        assert.equal('warning', total.level());

    });

    it('should return critical for total of R55', function(){
        var total = textBill();

            total.billText('call');
            total.billText('call');
            total.billText('call');
            total.billText('call');
            total.billText('call');
            total.billText('call');
            total.billText('call');
            total.billText('call');
            total.billText('call');
            total.billText('call');
            total.billText('call');
            total.billText('call');
            total.billText('call');
            total.billText('call');
            total.billText('call');
            total.billText('call');
            total.billText('call');
            total.billText('call');
            total.billText('call');
            total.billText('call');

            assert.equal('critical', total.level());

    });
})