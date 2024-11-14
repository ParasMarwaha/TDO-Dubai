let showChart1 = (charType) => {
    // alert(charType)
    document.getElementById("activityz2").innerHTML = ""
    /* "use strict" */
    if (charType === "weekly") {
        let formData = new FormData();
        formData.append("agentEmail", localStorage.getItem("agentEmail"))
        formData.append("type","weekly")
        fetch("/fetchFlightChartCount", {
            method: "post",
            body: formData
        }).then(res => res.json()).then(val => {
            console.log(val.recordset)
            let amtArr = [];
            let labelsArr = [];
            let data = val.recordset;
            let sum=0;
            let dt = new Date();
            data.forEach(item => {
                // Access properties
                const totalAmt = item.totalAmt;
                console.log(totalAmt);
                sum+=(item.totalAmt);
console.log(sum);
                amtArr.push(totalAmt.toFixed(2));
                labelsArr.push(item.date+"-"+(dt.getUTCMonth()+1)+"-"+dt.getFullYear());
            });
            // console.log(amtArr)
            document.getElementById("totalAmt2").innerText = sum.toFixed(2) + " (Weekly)"
            var dzChartlist = function () {

                var screenWidth = $(window).width();
                let draw = Chart.controllers.line.__super__.draw; //draw shadow
                var activityz = function () {
                    var optionsArea = {
                        series: [
                            {
                                name: "",
                                data: amtArr
                            }
                        ],
                        chart: {
                            height: 180,
                            type: 'bar',
                            group: 'social',
                            toolbar: {
                                show: false
                            },
                            zoom: {
                                enabled: false
                            },
                        },
                        dataLabels: {
                            enabled: false
                        },
                        stroke: {
                            width: [0, 0],
                            colors: ['var(--primary)', '#FF6A59'],
                            curve: 'straight'
                        },
                        legend: {
                            show: false,
                            tooltipHoverFormatter: function (val, opts) {
                                return val + ' - ' + opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] + ''
                            },
                        },

                        xaxis: {
                            categories: labelsArr,
                            labels: {
                                style: {
                                    colors: '#3E4954',
                                    fontSize: '14px',
                                    fontFamily: 'Poppins',
                                    fontWeight: 100,

                                },
                            },
                            axisBorder: {
                                show: false
                            },
                            axisTicks: {

                                show: false,
                            },
                        },
                        yaxis: {
                            labels: {
                                offsetX: -16,
                                minWidth: 40,
                                style: {
                                    colors: '#3E4954',
                                    fontSize: '14px',
                                    fontFamily: 'Poppins',
                                    fontWeight: 100,

                                },
                            },
                            axisTicks: {
                                show: false,
                                borderType: 'solid',
                                color: '#78909C',
                                width: 6,
                                offsetX: 0,
                                offsetY: 0
                            },
                        },

                        colors: ['var(--primary)', '#FF3D3D'],

                        //type: 'solid',
                        //colors:['var(--primary)','#FF3D3D'],
                        fill: {
                            type: 'solid',
                            opacity: .9,
                        },
                        grid: {
                            borderColor: '#f1f1f1',
                            xaxis: {
                                lines: {
                                    show: false
                                }
                            },
                            yaxis: {
                                lines: {
                                    show: true
                                }
                            },
                        },
                        responsive: [{
                            breakpoint: 575,
                            options: {}
                        }]
                    };
                    var chartArea = new ApexCharts(document.querySelector("#activityz2"), optionsArea);
                    chartArea.render();

                }

                /* Function ============ */
                return {
                    init: function () {

                    },


                    load: function () {

                        activityz();
                        // piechart();


                    },

                    resize: function () {
                    }
                }
            }();
            setTimeout(function () {
                dzChartlist.load();
            }, 1000);
        })
    }
    else if(charType ==="monthly"){
        let formData =  new FormData();
        let agentEmail = localStorage.getItem('agentEmail');
        formData.append("agentEmail",agentEmail);
        formData.append("type","monthly");
        fetch("/fetchFlightChartCount",{
            method:"post",
            body:formData
        })
            .then(res=>res.json()).then(val=>{
            console.log(val.recordset)
            let amtArr = [];
            let labelsArr = [];
            let data = val.recordset;
            let sum=0;
            let dt = new Date();
            data.forEach(item => {
                // Access properties
                const totalAmt = item.totalAmt;
                sum+=item.totalAmt;

                amtArr.push(totalAmt);
                labelsArr.push(item.month+"-"+item.year);
            });
            // console.log(amtArr)
            document.getElementById("totalAmt2").innerText = sum.toFixed(2) + " (Monthly)"
            var dzChartlist = function () {
                var screenWidth = $(window).width();
                let draw = Chart.controllers.line.__super__.draw; //draw shadow
                var activityz = function () {
                    var optionsArea = {
                        series: [
                            {
                                name: "",
                                data: amtArr
                            }
                        ],
                        chart: {
                            height: 300,
                            type: 'bar',
                            group: 'social',
                            toolbar: {
                                show: false
                            },
                            zoom: {
                                enabled: false
                            },
                        },
                        dataLabels: {
                            enabled: false
                        },
                        stroke: {
                            width: [0, 0],
                            colors: ['var(--primary)', '#FF6A59'],
                            curve: 'straight'
                        },
                        legend: {
                            show: false,
                            tooltipHoverFormatter: function (val, opts) {
                                return val + ' - ' + opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] + ''
                            },
                        },

                        xaxis: {
                            categories: labelsArr,
                            labels: {
                                style: {
                                    colors: '#3E4954',
                                    fontSize: '14px',
                                    fontFamily: 'Poppins',
                                    fontWeight: 100,

                                },
                            },
                            axisBorder: {
                                show: false
                            },
                            axisTicks: {

                                show: false,
                            },
                        },
                        yaxis: {
                            labels: {
                                offsetX: -16,
                                minWidth: 40,
                                style: {
                                    colors: '#3E4954',
                                    fontSize: '14px',
                                    fontFamily: 'Poppins',
                                    fontWeight: 100,

                                },
                            },
                            axisTicks: {
                                show: false,
                                borderType: 'solid',
                                color: '#78909C',
                                width: 6,
                                offsetX: 0,
                                offsetY: 0
                            },
                        },

                        colors: ['var(--primary)', '#FF3D3D'],

                        //type: 'solid',
                        //colors:['var(--primary)','#FF3D3D'],
                        fill: {
                            type: 'solid',
                            opacity: .9,
                        },
                        grid: {
                            borderColor: '#f1f1f1',
                            xaxis: {
                                lines: {
                                    show: false
                                }
                            },
                            yaxis: {
                                lines: {
                                    show: true
                                }
                            },
                        },
                        responsive: [{
                            breakpoint: 575,
                            options: {}
                        }]
                    };
                    var chartArea = new ApexCharts(document.querySelector("#activityz2"), optionsArea);
                    chartArea.render();

                }

                /* Function ============ */
                return {
                    init: function () {

                    },


                    load: function () {

                        activityz();
                        // piechart();


                    },

                    resize: function () {
                    }
                }
            }();
            setTimeout(function () {
                dzChartlist.load();
            }, 1000);
        })
    }
    else{
        let formData =  new FormData();
        let agentEmail = localStorage.getItem('agentEmail');
        formData.append("agentEmail",agentEmail);
        formData.append("type","yearly");
        fetch("/fetchFlightChartCount",{
            method:"post",
            body:formData
        })
            .then(res=>res.json()).then(val=>{
            console.log(val.recordset)
            let amtArr = [];
            let labelsArr = [];
            let data = val.recordset;
            let sum=0;
            let dt = new Date();
            data.forEach(item => {
                // Access properties
                const totalAmt = item.totalAmt;
                sum+=item.totalAmt;

                amtArr.push(totalAmt);
                labelsArr.push(item.year);
            });
            // console.log(amtArr)
            document.getElementById("totalAmt2").innerText = sum.toFixed(2) + " (Yearly)"
            var dzChartlist = function () {
                var screenWidth = $(window).width();
                let draw = Chart.controllers.line.__super__.draw; //draw shadow
                var activityz = function () {
                    var optionsArea = {
                        series: [
                            {
                                name: "",
                                data: amtArr
                            }
                        ],
                        chart: {
                            height: 300,
                            type: 'bar',
                            group: 'social',
                            toolbar: {
                                show: false
                            },
                            zoom: {
                                enabled: false
                            },
                        },
                        dataLabels: {
                            enabled: false
                        },
                        stroke: {
                            width: [0, 0],
                            colors: ['var(--primary)', '#FF6A59'],
                            curve: 'straight'
                        },
                        legend: {
                            show: false,
                            tooltipHoverFormatter: function (val, opts) {
                                return val + ' - ' + opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] + ''
                            },
                        },

                        xaxis: {
                            categories: labelsArr,
                            labels: {
                                style: {
                                    colors: '#3E4954',
                                    fontSize: '14px',
                                    fontFamily: 'Poppins',
                                    fontWeight: 100,

                                },
                            },
                            axisBorder: {
                                show: false
                            },
                            axisTicks: {

                                show: false,
                            },
                        },
                        yaxis: {
                            labels: {
                                offsetX: -16,
                                minWidth: 40,
                                style: {
                                    colors: '#3E4954',
                                    fontSize: '14px',
                                    fontFamily: 'Poppins',
                                    fontWeight: 100,

                                },
                            },
                            axisTicks: {
                                show: false,
                                borderType: 'solid',
                                color: '#78909C',
                                width: 6,
                                offsetX: 0,
                                offsetY: 0
                            },
                        },

                        colors: ['var(--primary)', '#FF3D3D'],

                        //type: 'solid',
                        //colors:['var(--primary)','#FF3D3D'],
                        fill: {
                            type: 'solid',
                            opacity: .9,
                        },
                        grid: {
                            borderColor: '#f1f1f1',
                            xaxis: {
                                lines: {
                                    show: false
                                }
                            },
                            yaxis: {
                                lines: {
                                    show: true
                                }
                            },
                        },
                        responsive: [{
                            breakpoint: 575,
                            options: {}
                        }]
                    };
                    var chartArea = new ApexCharts(document.querySelector("#activityz2"), optionsArea);
                    chartArea.render();

                }

                /* Function ============ */
                return {
                    init: function () {

                    },


                    load: function () {

                        activityz();
                        // piechart();


                    },

                    resize: function () {
                    }
                }
            }();
            setTimeout(function () {
                dzChartlist.load();
            }, 1000);
        })
    }
}


