let demoFunc = function () {
    this.params = {};

    this.getInitParams = function () {
        jQuery.get(initParamUrl, this.processParam, 'json');
    };

    this.processParam = function (data) {
        if (!data.weights || !data.biases) {
            alert('doh!')
        }
        demoObj.params = data;
        demoObj.displayParams(demoObj.params);
    };

    this.displayParams = function (params) {
        if (!params.weights
            || !(params.weights.length === 3)
            || !params.biases
            || !(params.biases.length === 3)
        ) {
            return false;
        }
        for (let i in params.weights) {
            if (!params.weights.hasOwnProperty(i)) {
                continue;
            }
            for (let j in params.weights[i]) {
                if (!params.weights[i].hasOwnProperty(j)) {
                    continue;
                }
                jQuery('[data-source="w' + i + '-' + j + '"]').val(params.weights[i][j])
            }
        }

        for (let i in params.biases) {
            if (!params.biases.hasOwnProperty(i)) {
                continue;
            }
            jQuery('[data-source="b-' + i + '"]').val(params.biases[i])
        }
    }
};

let demoObj = new demoFunc();

jQuery(function () {
    demoObj.getInitParams()
});