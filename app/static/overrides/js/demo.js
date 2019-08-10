let demoFunc = function () {
    this.params = {};
    this.data = {};

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
        jQuery.get(
            getParamsUrl,
            {
                rand: rand,
            },
            this.processParam,
            'json'
        );
    };

    this.getTrainData = function (rand = 0) {
        jQuery.get(
            getDataUrl,
            {
                rand: rand,
            },
            this.processData,
            'json'
        );
    };

    this.processData = function (data) {
        demoObj.data = data;
        demoObj.displayData(data);
        demoObj.getPlot();
    };

    this.processParam = function (data) {
        if (!data.weights || !data.biases) {
            return;
        }
        demoObj.params = data;
        demoObj.displayParams(demoObj.params);
        demoObj.getPlot();
    };

    this.displayData = function (data) {
        for (let i in data) {
            if (!data.hasOwnProperty(i)) {
                continue;
            }
            jQuery('[data-target="x-' + i + '-0"]').text(data[i][0])
            jQuery('[data-target="x-' + i + '-1"]').text(data[i][1])
            jQuery('[data-target="y-' + i + '"]').text(data[i][2])
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
    demoObj.getParams();
    demoObj.getTrainData();
});