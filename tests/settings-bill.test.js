const assert = require('assert');

const SettingsBill = require('../settings-bill');


describe('settings-bill', function(){

    const settingsBill = SettingsBill();

    it('should be able to record calls', function(){
        settingsBill.setSettings({
            smsCost: 1.50,
            callCost: 2.50,
            warningLevel: 30,
            criticalLevel: 40
        });
        settingsBill.recordAction('call')
        assert.strictEqual(1, settingsBill.actionsFor('call').length)
    });

    it('should be able to set the settings', function(){
        settingsBill.setSettings({
            smsCost: 2.35,
            callCost: 3.35,
            warningLevel: 30,
            criticalLevel: 40
        });

        assert.deepStrictEqual({
            smsCost: 2.35,
            callCost: 3.35,
            warningLevel: 30,
            criticalLevel: 40
        }, settingsBill.getSettings())


    });

    it('should calculate the right totals', function(){
        const settingsBill = SettingsBill();
        settingsBill.setSettings({
            smsCost: 2.35,
            callCost: 3.35,
            warningLevel: 30,
            criticalLevel: 40
        });

        settingsBill.recordAction('call');
        settingsBill.recordAction('sms');

        assert.strictEqual(2.35.toFixed(2), settingsBill.totals().smsTotal);
        assert.strictEqual(3.35.toFixed(2), settingsBill.totals().callTotal);
        assert.strictEqual(5.70.toFixed(2), settingsBill.totals().grandTotal);

    });

    it('should calculate the right totals for multiple actions', function(){
        const settingsBill = SettingsBill();
        settingsBill.setSettings({
            smsCost: 2.35,
            callCost: 3.35,
            warningLevel: 30,
            criticalLevel: 40
        });

        settingsBill.recordAction('call');
        settingsBill.recordAction('call');
        settingsBill.recordAction('sms');
        settingsBill.recordAction('sms');

        assert.strictEqual(4.70.toFixed(2), settingsBill.totals().smsTotal);
        assert.strictEqual(6.70.toFixed(2), settingsBill.totals().callTotal);
        assert.strictEqual(11.40.toFixed(2), settingsBill.totals().grandTotal);

    });

    it('should know when warning level reached', function(){
        const settingsBill = SettingsBill();
        settingsBill.setSettings({
            smsCost: 2.50,
            callCost: 5.00,
            warningLevel: 5,
            criticalLevel: 10
        });

        settingsBill.recordAction('call');
        settingsBill.recordAction('sms');

        assert.strictEqual(true, settingsBill.hasReachedWarningLevel());
    });

    it('should know when critical level reached', function(){
        const settingsBill = SettingsBill();
        settingsBill.setSettings({
            smsCost: 2.50,
            callCost: 5.00,
            warningLevel: 5,
            criticalLevel: 10
        });

        settingsBill.recordAction('call');
        settingsBill.recordAction('call');
        settingsBill.recordAction('sms');

        assert.strictEqual(true, settingsBill.hasReachedCriticalLevel());

    });
});
/** 
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
**/
/** 
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
*/