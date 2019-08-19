let demoFunc = function () {
    this.params = {};
    this.data = {};
    this.block = false;
    this.intervalId = false;
    this.iterations = 0;
    this.hyperparams = {'reg_c': 0.1, 'learning_rate': 0.1, 'loss_type': 'ww'};
    this.def_hyperparams = {'reg_c': 0.1, 'learning_rate': 0.1};

    this.updateHyperParams = function () {
        for (let i in this.hyperparams) {
            if (!this.hyperparams.hasOwnProperty(i)) {
                continue;
            }
            let value = jQuery('[name="' + i + '"]').val();
            if (['learning_rate', 'reg_c'].indexOf(i) > -1) {
                value = parseFloat(value);
                if (isNaN(value)
                    || value < 0
                    || (i === 'learning_rate' && value === 0)
                ) {
                    value = this.def_hyperparams[i];
                    jQuery('[name="' + i + '"]').val(value)
                }

                this.hyperparams[i] = value;
            }

        }
    };

    this.startContinuousUpdate = function () {
        this.intervalId = setInterval(
            function () {
                demoObj.getStep();
            }, 500);
    };

    this.stopContinuousUpdate = function () {
        if (this.intervalId) {
            clearInterval(this.intervalId);
        }
    };

    this.processError = function (data) {
        if (data.error) {
            alert(data.error);
            return true;
        }
        return false;
    };

    this.getStep = function () {
        if (this.block) {
            return;
        }
        this.block = true;
        jQuery.post(
            getStepUrl,
            {
                data: JSON.stringify(demoObj.data),
                params: JSON.stringify(demoObj.params),
                hyper: JSON.stringify(demoObj.hyperparams)
            },
            this.processStep,
            'json'
        );
    };

    this.processStep = function (data) {
        demoObj.block = false;
        if (demoObj.processError(data)) {
            return;
        }
        demoObj.iterations += 1;
        losses = ['mean_loss', 'total_loss', 'reg_loss'];
        for (let i in losses) {
            if (!losses.hasOwnProperty(i)) {
                continue;
            }
            if (data[losses[i]]) {
                jQuery('[data-target="' + losses[i] + '"]')
                    .text(parseFloat(data[losses[i]]).toFixed(2))
            }
        }

        jQuery('[data-target="iterations"]').text(demoObj.iterations);
        demoObj.displayPlot(data);
        demoObj.processParams(data, false);
        demoObj.displayScores(data);
        demoObj.displayLoss(data);
    };

    this.displayLoss = function (data) {
        if (data.loss) {
            for (let i in data.loss) {
                if (!data.loss.hasOwnProperty(i)) {
                    continue;
                }
                jQuery('[data-target="L-' + i + '"]')
                    .text(parseFloat(data.loss[i]).toFixed(2));
            }
        }
    };

    this.displayScores = function (data) {
        if (data.scores) {
            for (let i in data.scores) {
                if (!data.scores.hasOwnProperty(i)) {
                    continue;
                }
                for (let j in data.scores[i]) {
                    if (!data.scores[i].hasOwnProperty(j)) {
                        continue;
                    }
                    jQuery('[data-target="s-' + i + '-' + j + '"]')
                        .text(parseFloat(data.scores[i][j]).toFixed(2));
                }
            }
        }
    };

    this.getPlot = function () {
        jQuery.post(
            getPlotUrl,
            {
                data: JSON.stringify(demoObj.data),
                params: JSON.stringify(demoObj.params)
            },
            this.displayPlot,
            'json'
        );
    };

    this.displayPlot = function (data) {
        let src = 'data:image/png;base64, ';
        let target = jQuery('#plot');
        if (data.plot) {
            target.attr('src', src + data.plot)
        }
    };

    this.getParams = function (rand = 0) {
        this.iterations = 0;
        jQuery.get(
            getParamsUrl,
            {
                rand: rand,
            },
            this.processParams,
            'json'
        );
    };

    this.getTrainData = function (rand = 0) {
        this.iterations = 0;
        jQuery.get(
            getDataUrl,
            {
                rand: rand,
            },
            this.processData,
            'json'
        );
    };

    this.processData = function (data, withPlot = true) {
        demoObj.data = data;
        demoObj.displayData(data);
        if (withPlot) {
            demoObj.getPlot();
        }
    };

    this.processParams = function (data, withPlot = true) {
        if (!data.weights || !data.biases) {
            return;
        }
        demoObj.params = data;
        demoObj.displayParams(demoObj.params);
        if (withPlot) {
            demoObj.getPlot();
        }

    };

    this.displayData = function (data) {
        for (let i in data) {
            if (!data.hasOwnProperty(i)) {
                continue;
            }
            jQuery('[data-target="x-' + i + '-0"]')
                .text(parseFloat(data[i][0]).toFixed(2));
            jQuery('[data-target="x-' + i + '-1"]')
                .text(parseFloat(data[i][1]).toFixed(2));
            jQuery('[data-target="y-' + i + '"]')
                .text(parseFloat(data[i][2]).toFixed(2));
        }
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
                jQuery('[data-source="w' + i + '-' + j + '"]')
                    .val(parseFloat(params.weights[i][j]).toFixed(4));
                if (params.grad_w) {
                    jQuery('[data-target="grad-w' + i + '-' + j + '"]')
                        .text(parseFloat(params.grad_w[i][j]).toFixed(4));
                }
            }
        }

        for (let i in params.biases) {
            if (!params.biases.hasOwnProperty(i)) {
                continue;
            }
            jQuery('[data-source="b-' + i + '"]')
                .val(parseFloat(params.biases[i]).toFixed(4));
            if (params.grad_b) {
                jQuery('[data-target="grad-b-' + i + '"]')
                    .text(parseFloat(params.grad_b[i]).toFixed(4));
            }
        }
    }
};

let demoObj = new demoFunc();

jQuery(function () {
    demoObj.getParams();
    demoObj.getTrainData();
});