describe('settings-bill', function(){
    it('should be able to set the call cost',function(){

        let settingsBill = billSettings();
        settingsBill.setCallCost(1.85);
        assert.equal(1.85,settingsBill.getCallCost());    

        let settingsBill1 = billSettings();
        settingsBill1.setCallCost(1.85);
        assert.equal(1.85,settingsBill1.getCallCost()); 
    });

    it('should be able to set the sms cost',function(){

        let settingsBill = billSettings();
        settingsBill.setSmsCost(0.85);
        assert.equal(0.85,settingsBill.getSmsCost());    

        let settingsBill1 = billSettings();
        settingsBill1.setSmsCost(2.00);
        assert.equal(2.00,settingsBill1.getSmsCost()); 
    });

    it('should be able to set the call and sms cost',function(){

        let settingsBill = billSettings();
        settingsBill.setCallCost(5.00);
        settingsBill.setSmsCost(2.85);
        assert.equal(5.00,settingsBill.getCallCost()); 
        assert.equal(2.85,settingsBill.getSmsCost());    

        let settingsBill1 = billSettings();
        settingsBill1.setCallCost(3.00);
        settingsBill1.setSmsCost(2.00);
        assert.equal(3.00,settingsBill1.getCallCost()); 
        assert.equal(2.00,settingsBill1.getSmsCost());    
    })

    it('should be able to set the warning level',function(){

        let settingsBill = billSettings();
        settingsBill.setWarning(20.00);
        assert.equal(20.00,settingsBill.getWarning());    

        let settingsBill1 = billSettings();
        settingsBill1.setWarning(15.00);
        assert.equal(15.00,settingsBill1.getWarning()); 

    })

    it('should be able to set the critical level',function(){

        let settingsBill = billSettings();
        settingsBill.setCritical(50.00);
        assert.equal(50.00,settingsBill.getCritical());    

        let settingsBill1 = billSettings();
        settingsBill1.setWarning(35.00);
        assert.equal(35.00,settingsBill1.getWarning()); 
    });

    it('should be able to set the warning and critical level',function(){

        let settingsBill = billSettings();
        settingsBill.setWarning(10.00);
        settingsBill.setCritical(30.00);
        assert.equal(30.00,settingsBill.getCritical());    
        assert.equal(10.00,settingsBill.getWarning()); 

    });
});

describe('settings-widget', function(){
    it('should be able to use the call cost values',function(){

        let settingsBill = billSettings();
        settingsBill.setCallCost(2.00);
        settingsBill.setSmsCost(0.50);
        settingsBill.setWarning(20);
        settingsBill.setCritical(30);

        settingsBill.makeCall();
        settingsBill.makeCall();
        settingsBill.makeCall();

        assert.equal(6.00,settingsBill.getTotalCost());
        assert.equal(6.00,settingsBill.getTotalCallCost());
        assert.equal(0.00,settingsBill.getTotalSmsCost()); 
    });

    it('should be able to use the sms cost values',function(){

        let settingsBill = billSettings();
        settingsBill.setCallCost(2.00);
        settingsBill.setSmsCost(0.50);
        settingsBill.setWarning(20);
        settingsBill.setCritical(30);

        settingsBill.sendSms();
        settingsBill.sendSms();  
        settingsBill.sendSms();

        assert.equal(1.50,settingsBill.getTotalCost());
        assert.equal(0.0,settingsBill.getTotalCallCost());
        assert.equal(1.50,settingsBill.getTotalSmsCost()); 

    })

    it('should use the call value of R2.00 and sms value of R0.50 to calculate bill total ',function(){

        let settingsBill = billSettings();
        settingsBill.setCallCost(2.00);
        settingsBill.setSmsCost(0.50);
        settingsBill.setWarning(20);
        settingsBill.setCritical(30);

        settingsBill.makeCall();
        settingsBill.makeCall();
        settingsBill.makeCall();
        settingsBill.makeCall();
        settingsBill.makeCall();
        settingsBill.makeCall();
        settingsBill.makeCall();
        settingsBill.makeCall();
        settingsBill.makeCall();
        settingsBill.makeCall();

        settingsBill.sendSms();

        assert.equal(20.50,settingsBill.getTotalCost());
        assert.equal(20.00,settingsBill.getTotalCallCost());
        assert.equal(0.50,settingsBill.getTotalSmsCost());
    });
});

describe('Warning and critical level', function(){
    it('should return "warning" if warning level is reached',function(){

        let settingsBill = billSettings();
        settingsBill.setCallCost(2.00);
        settingsBill.setSmsCost(0.50);
        settingsBill.setWarning(10);
        settingsBill.setCritical(20);

        settingsBill.makeCall();
        settingsBill.makeCall();
        settingsBill.makeCall();
        settingsBill.makeCall();
        settingsBill.makeCall();
        settingsBill.sendSms();
        settingsBill.sendSms();
    
        assert.equal('warning',settingsBill.levels());
    });

    it('should return "critical" if critical level is reached',function(){

        let settingsBill = billSettings();
        settingsBill.setCallCost(2.00);
        settingsBill.setSmsCost(0.50);
        settingsBill.setWarning(10);
        settingsBill.setCritical(20);

        settingsBill.sendSms();
        settingsBill.sendSms();
        settingsBill.makeCall();
        settingsBill.makeCall();
        settingsBill.makeCall();
        settingsBill.makeCall();
        settingsBill.makeCall();
        settingsBill.makeCall();
        settingsBill.makeCall();
        settingsBill.makeCall();
        settingsBill.makeCall();
        settingsBill.makeCall();

        assert.equal('critical',settingsBill.levels()); 
    });
});