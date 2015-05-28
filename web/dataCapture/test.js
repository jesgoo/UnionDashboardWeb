/**
 * Created by yangyuelong on 15/5/14.
 */
/*
casper.test.begin('a twitter bootstrap dropdown can be opened', 2, function(test) {
    casper.start('http://getbootstrap.com/2.3.2/javascript.html#dropdowns', function() {
        test.assertExists('#navbar-example');
        this.click('#dropdowns .nav-pills .dropdown:last-of-type a.dropdown-toggle');
        this.waitUntilVisible('#dropdowns .nav-pills .open', function() {
            test.pass('Dropdown is open');
        });
    }).run(function() {
        test.done();
    });
});
*/
var casper = require('casper').create();
var util = require('utils');
casper.start('http://union.baidu.com/customerLogin.html?fromu=http%3A%2F%2Funion.baidu.com%2F', function() {
    this.echo(this.getTitle());
    this.fill('form#login_form', {
        'entered_login':    'jesgoo',
        'entered_password':    'Jesgoo08',
        'entered_imagecode': ''
    }, true);
    var imgSrc = this.getElementAttribute('img#validImg', 'src');
    util.dump(imgSrc);
});

casper.run();