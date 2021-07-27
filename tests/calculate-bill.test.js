describe('calculate-bill', function(){
    it('should calculate the bill of two calls', function(){
        var text = totalPhoneBill();
        text.billText('call,call');
      
     
        assert.equal('R' + 5.50, text.billTotal());
    });

    it("should calculate the bill of two sms's", function(){

        var text = totalPhoneBill();
        text.billText('sms,sms');
      
        assert.equal('R' + 1.50, text.billTotal());
    });

    it("should calculate the bill of 2 sms's and 3 calls", function(){

        var text = totalPhoneBill();
        text.billText('sms,sms,call,call,call');
      
        assert.equal('R'+ 9.75, text.billTotal());
    });

    it('should not return a warning or critical for a bill of R7.00', function(){

        var text = totalPhoneBill();
        text.billText('call,call,sms,sms')
        text.billTotal();

        assert.equal('',text.totallevel());
    });
    

    it('should return  warning for  bill  of R20.75', function(){

        var text = totalPhoneBill();
        text.billText('call,call,sms,call,call,call,sms,call,call');
        text.billTotal();

        assert.equal('warning',text.totallevel());
    });

    it('should return  critical for bill of R31', function(){
        var text = totalPhoneBill();
        text.billText('call,call,call,call,call,call,call,call,call,sms,call,call');
        text.billTotal();

        assert.equal('critical',text.totallevel());
    });
})