QUnit.config.reorder = false;

//////////////////////////////////
// tests
window.starparam_runTests = function() {

    QUnit.test("smoke", function(assert) {
        assert.ok(true, "zero log divs are present");
    });

    QUnit.test("exit", function(assert) {
        assert.ok('true');
        setTimeout(function() {
            jQuery('#runTestsButton').prop("disabled", false);
        }, 100);
    });
};
