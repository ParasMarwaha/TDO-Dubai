(function($) {
    /* "use strict" */
	
 var dzChartlist = function(){
	var screenWidth = $(window).width();	
	var widgetChart1 = function(){
		var options = {
		  series: [
			{
				name: 'Net Profit',
				data: [100,200, 100, 300, 200, 400, 200, 300,100, 300,200,300],
				//radius: 12,	
			}, 				
		],
			chart: {
			type: 'line',
			height: 70,
			toolbar: {
				show: false,
			},
			zoom: {
				enabled: false
			},
			sparkline: {
				enabled: true
			}
			
		},
		
		colors:['var(--primary)'],
		dataLabels: {
		  enabled: false,
		},

		legend: {
			show: false,
		},
		stroke: {
		  show: true,
		  width: 6,
		  curve:'smooth',
		  colors:['var(--primary)'],
		},
		
		grid: {
			show:false,
			borderColor: '#eee',
			padding: {
				top: 0,
				right: 0,
				bottom: 0,
				left: 0

			}
		},
		states: {
                normal: {
                    filter: {
                        type: 'none',
                        value: 0
                    }
                },
                hover: {
                    filter: {
                        type: 'none',
                        value: 0
                    }
                },
                active: {
                    allowMultipleDataPointsSelection: false,
                    filter: {
                        type: 'none',
                        value: 0
                    }
                }
            },
		xaxis: {
			categories: ['Jan', 'feb', 'Mar', 'Apr', 'May', 'Jun', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',],
			axisBorder: {
				show: false,
			},
			axisTicks: {
				show: false
			},
			labels: {
				show: false,
				style: {
					fontSize: '12px',
				}
			},
			crosshairs: {
				show: false,
				position: 'front',
				stroke: {
					width: 1,
					dashArray: 3
				}
			},
			tooltip: {
				enabled: true,
				formatter: undefined,
				offsetY: 0,
				style: {
					fontSize: '12px',
				}
			}
		},
		yaxis: {
			show: false,
		},
		fill: {
		  opacity: 1,
		  colors:'#FB3E7A'
		},
		tooltip: {
			style: {
				fontSize: '12px',
			},
			y: {
				formatter: function(val) {
					return "$" + val + " thousands"
				}
			}
		}
		};

		var chartBar1 = new ApexCharts(document.querySelector("#widgetChart1"), options);
		chartBar1.render();
	 
	}
	
	var widgetChart2 = function(){
		var options = {
		  series: [
			{
				name: 'Net Profit',
				data: [100,200, 100, 300, 200, 400, 200, 300,100, 300,200,300],
				//radius: 12,	
			}, 				
		],
			chart: {
			type: 'line',
			height: 70,
			toolbar: {
				show: false,
			},
			zoom: {
				enabled: false
			},
			sparkline: {
				enabled: true
			}
			
		},
		
		colors:['#FB3E7A'],
		dataLabels: {
		  enabled: false,
		},

		legend: {
			show: false,
		},
		stroke: {
		  show: true,
		  width: 6,
		  curve:'smooth',
		  colors:['#FB3E7A'],
		},
		
		grid: {
			show:false,
			borderColor: '#eee',
			padding: {
				top: 0,
				right: 0,
				bottom: 0,
				left: 0

			}
		},
		states: {
                normal: {
                    filter: {
                        type: 'none',
                        value: 0
                    }
                },
                hover: {
                    filter: {
                        type: 'none',
                        value: 0
                    }
                },
                active: {
                    allowMultipleDataPointsSelection: false,
                    filter: {
                        type: 'none',
                        value: 0
                    }
                }
            },
		xaxis: {
			categories: ['Jan', 'feb', 'Mar', 'Apr', 'May', 'Jun', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',],
			axisBorder: {
				show: false,
			},
			axisTicks: {
				show: false
			},
			labels: {
				show: false,
				style: {
					fontSize: '12px',
				}
			},
			crosshairs: {
				show: false,
				position: 'front',
				stroke: {
					width: 1,
					dashArray: 3
				}
			},
			tooltip: {
				enabled: true,
				formatter: undefined,
				offsetY: 0,
				style: {
					fontSize: '12px',
				}
			}
		},
		yaxis: {
			show: false,
		},
		fill: {
		  opacity: 1,
		  colors:'#FAC7B6'
		},
		tooltip: {
			style: {
				fontSize: '12px',
			},
			y: {
				formatter: function(val) {
					return "$" + val + " thousands"
				}
			}
		}
		};

		var chartBar1 = new ApexCharts(document.querySelector("#widgetChart2"), options);
		chartBar1.render();
	 
	}
	var chartBar = function(){
		if(jQuery('#widgetChart3').length > 0 ){
	
			const widgetChart3 = document.getElementById("widgetChart3").getContext('2d');
			//generate gradient
			

			// widgetChart1.attr('height', '100');

			new Chart(widgetChart3, {
				type: 'bar',
				data: {
					defaultFontFamily: 'Poppins',
					labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"],
					datasets: [
						{
							label: "My First dataset",
							data: [15, 40, 55, 40, 25, 35, 40, 50, 85, 95],
							borderColor: '#FE634E',
							borderWidth: "0",
							backgroundColor: '#FE634E', 
							 borderRadius: 20,
							 barPercentage: 0.4, 
							hoverBackgroundColor: '#FE634E'
						}
					]
				},
				options: {
					plugins:{
						legend:false,
						
					},
					responsive: true, 
					barRoundness: 1,
					maintainAspectRatio: false,  
					scales: {
						y:{
							display: false, 
							max: 100, 
							min: 0, 
							ticks: {
								beginAtZero: true, 
								display: false, 
								stepSize: 10
							}, 
							grid: {
								display: false, 
								drawBorder: false
							}
						},
						x:{
							display: false, 
							barPercentage: 0.4, 
							grid: {
								display: false, 
								drawBorder: false
							}, 
							ticks: {
								display: false
							}
						}
					}
				}
			});

		}
		
		
	}
	var donutChart1 = function(){
		$("span.donut1").peity("donut", {
			width: "90",
			height: "90"
		});
	}
		
	var donutChart2 = function(){
		var options = {
          series: [45, 25, 30],
          chart: {
          type: 'donut',
		  height:230,
        },
		  legend:{
			show:false  
		  },
		  plotOptions: {
			 pie: {
				//startAngle: -96,
				donut: {
					 size: '30%',
				}
			 },
		  },
		  
		  states: {
				normal: {
					filter: {
						type: 'none',
						value: 0,
					}
				},
				hover: {
					filter: {
						type: 'lighten',
						value: 0,
					}
				},
				active: {
					filter: {
						type: 'lighten',
						value: 0,
					}
				},
			},
		  
		  stroke:{
			width:'10'  
		  },
		  dataLabels: {
			  formatter(val, opts) {
				const name = opts.w.globals.labels[opts.seriesIndex]
				return [ val.toFixed() + '%']
			  },
			  dropShadow: {
                enabled: false
              },
			  style: {
                fontSize: '15px',
                colors: ["#fff"],
              }
			},
		  colors:['#0E8A74','#FB3E7A','#C8C8C8'],
        responsive: [{
          breakpoint: 1600,
          options: {
            chart: {
              height: 200
            },
          }
        }] 
        };

        var chart = new ApexCharts(document.querySelector("#donutChart2"), options);
        chart.render();
	}
	var donutChart3 = function(){
		var options = {
          series: [45, 25, 30],
          chart: {
          type: 'donut',
		  height:230,
        },
		  legend:{
			show:false  
		  },
		  plotOptions: {
			 pie: {
				//startAngle: -86,
				donut: {
					 size: '30%',
				}
			 },
		  },
		  
		  states: {
				normal: {
					filter: {
						type: 'none',
						value: 0,
					}
				},
				hover: {
					filter: {
						type: 'lighten',
						value: 0,
					}
				},
				active: {
					filter: {
						type: 'lighten',
						value: 0,
					}
				},
			},
		  
		  stroke:{
			width:'10'  
		  },
		  dataLabels: {
			  formatter(val, opts) {
				const name = opts.w.globals.labels[opts.seriesIndex]
				return [ val.toFixed() + '%']
			  },
			  dropShadow: {
                enabled: false
              },
			  style: {
                fontSize: '15px',
                colors: ["#fff"],
              }
			},
		  colors:['#0E8A74','#FB3E7A','#C8C8C8'],
        responsive: [{
          breakpoint: 1600,
          options: {
            chart: {
              height: 200
            },
          }
        }] 
        };

        var chart = new ApexCharts(document.querySelector("#donutChart3"), options);
        chart.render();
	}
	var donutChart4 = function(){
		var options = {
          series: [45, 25, 30],
          chart: {
          type: 'donut',
		   height:230,
        },
		  legend:{
			show:false  
		  },
		  plotOptions: {
			 pie: {
				//startAngle: -86,
				donut: {
					 size: '30%',
				}
			 },
		  },
		  
		  states: {
				normal: {
					filter: {
						type: 'none',
						value: 0,
					}
				},
				hover: {
					filter: {
						type: 'lighten',
						value: 0,
					}
				},
				active: {
					filter: {
						type: 'lighten',
						value: 0,
					}
				},
			},
		  
		  stroke:{
			width:'10'  
		  },
		  dataLabels: {
			  formatter(val, opts) {
				const name = opts.w.globals.labels[opts.seriesIndex]
				return [ val.toFixed() + '%']
			  },
			  dropShadow: {
                enabled: false
              },
			  style: {
                fontSize: '15px',
                colors: ["#fff"],
              }
			},
		  colors:['#0E8A74','#FB3E7A','#C8C8C8'],
        responsive: [{
          breakpoint: 1600,
          options: {
            chart: {
              height: 200
            },
          }
        }] 
        };

        var chart = new ApexCharts(document.querySelector("#donutChart4"), options);
        chart.render();
	}
	var salesChart = function(){
		var options = {
		  series: [
			{
				name: 'Net Profit',
				data: [100,200, 100, 300, 200, 400, 200, 300,100],
				//radius: 12,	
			}, 				
		],
			chart: {
			type: 'line',
			height: 380,
			toolbar: {
				show: false,
			},
		},
		
		colors:['var(--primary)'],
		dataLabels: {
		  enabled: false,
		},

		legend: {
			show: true,
		},
		stroke: {
		  show: true,
		  width: 6,
		  curve:'smooth',
		  colors:['var(--primary)'],
		},
		
		grid: {
			show:true,
			borderColor: '#C8C8C8',
			strokeDashArray: 4,
			padding: {
				top: 0,
				right: 0,
				bottom: 0,
				left: 0

			}
		},
		states: {
                normal: {
                    filter: {
                        type: 'none',
                        value: 0
                    }
                },
                hover: {
                    filter: {
                        type: 'none',
                        value: 0
                    }
                },
                active: {
                    allowMultipleDataPointsSelection: false,
                    filter: {
                        type: 'none',
                        value: 0
                    }
                }
            },
		xaxis: {
			categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Aug', 'Sep', 'Oct'],
			axisBorder: {
				show: true,
			},
			axisTicks: {
				show: true
			},
			labels: {
				show: true,
				style: {
					fontSize: '14px',
					colors:'#a4a7ab',
				}	
			
			},
			crosshairs: {
				show: false,
				position: 'front',
				stroke: {
					width: 1,
					dashArray: 3
				}
			},
			tooltip: {
				enabled: true,
				formatter: undefined,
				offsetY: 0,
				style: {
					fontSize: '12px',
				}
			}
		},
		yaxis: {
			show: true,
			 labels:{
				offsetX:-10,
				formatter: function (value) {
				  return value + "k";
				},
				  style:{
					   colors:'#a4a7ab',
					   fontSize: '14px',
				  },
			 },
		},
		fill: {
		  opacity: 1,
		  colors:'#FB3E7A'
		},
		tooltip: {
			style: {
				fontSize: '12px',
			},
			y: {
				formatter: function(val) {
					return "k" + val + " thousands"
				}
			}
		},
		responsive: [{
			breakpoint: 575,
			options: {
				chart: {
					height:250,
				},
			},
		}]
		};

		var chartBar1 = new ApexCharts(document.querySelector("#salesChart"), options);
		chartBar1.render();
	 
	}
	var salesChart1 = function(){
		var options = {
		  series: [
			{
				name: 'Net Profit',
				data: [100, 300, 200, 400, 100, 300, 100, 200, 100],
				//radius: 12,	
			}, 				
		],
			chart: {
			type: 'line',
			height: 380,
			toolbar: {
				show: false,
			},
		},
		
		colors:['var(--primary)'],
		dataLabels: {
		  enabled: false,
		},

		legend: {
			show: true,
		},
		stroke: {
		  show: true,
		  width: 6,
		  curve:'smooth',
		  colors:['var(--primary)'],
		},
		
		grid: {
			show:true,
			borderColor: '#C8C8C8',
			strokeDashArray: 4,
			padding: {
				top: 0,
				right: 0,
				bottom: 0,
				left: 0

			}
		},
		states: {
                normal: {
                    filter: {
                        type: 'none',
                        value: 0
                    }
                },
                hover: {
                    filter: {
                        type: 'none',
                        value: 0
                    }
                },
                active: {
                    allowMultipleDataPointsSelection: false,
                    filter: {
                        type: 'none',
                        value: 0
                    }
                }
            },
		xaxis: {
			categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Aug', 'Sep', 'Oct'],
			axisBorder: {
				show: true,
			},
			axisTicks: {
				show: true
			},
			labels: {
				show: true,
				style: {
					fontSize: '14px',
					colors:'#a4a7ab',
				}
			},
			crosshairs: {
				show: false,
				position: 'front',
				stroke: {
					width: 1,
					dashArray: 3
				}
			},
			tooltip: {
				enabled: true,
				formatter: undefined,
				offsetY: 0,
				style: {
					fontSize: '12px',
				}
			}
		},
		yaxis: {
			show: true,
			labels:{
				offsetX:-10,
				formatter: function (value) {
				  return value + "k";
				},
				style:{
					colors:'#a4a7ab',
					fontSize: '14px',
			   },
			}
		},
		fill: {
		  opacity: 1,
		  colors:'#FB3E7A'
		},
		tooltip: {
			style: {
				fontSize: '12px',
			},
			y: {
				formatter: function(val) {
					return "k" + val + " thousands"
				}
			}
		},
		responsive: [{
			breakpoint: 575,
			options: {
				chart: {
					height:250,
				},
			},
		}]
		};

		var chartBar1 = new ApexCharts(document.querySelector("#salesChart1"), options);
		chartBar1.render();
	 
	}
	var salesChart2 = function(){
		var options = {
		  series: [
			{
				name: 'Net Profit',
				data: [200, 300, 400, 200, 300, 100, 300, 200, 100],
				//radius: 12,	
			}, 				
		],
			chart: {
			type: 'line',
			height: 380,
			toolbar: {
				show: false,
			},
		},
		
		colors:['var(--primary)'],
		dataLabels: {
		  enabled: false,
		},

		legend: {
			show: true,
		},
		stroke: {
		  show: true,
		  width: 6,
		  curve:'smooth',
		  colors:['var(--primary)'],
		},
		
		grid: {
			show:true,
			borderColor: '#C8C8C8',
			strokeDashArray: 4,
			padding: {
				top: 0,
				right: 0,
				bottom: 0,
				left: 0

			}
		},
		states: {
                normal: {
                    filter: {
                        type: 'none',
                        value: 0
                    }
                },
                hover: {
                    filter: {
                        type: 'none',
                        value: 0
                    }
                },
                active: {
                    allowMultipleDataPointsSelection: false,
                    filter: {
                        type: 'none',
                        value: 0
                    }
                }
            },
		xaxis: {
			categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Aug', 'Sep', 'Oct'],
			axisBorder: {
				show: true,
			},
			axisTicks: {
				show: true
			},
			labels: {
				show: true,
				style: {
					fontSize: '14px',
					colors:'#a4a7ab',
				}
			},
			crosshairs: {
				show: false,
				position: 'front',
				stroke: {
					width: 1,
					dashArray: 3
				}
			},
			tooltip: {
				enabled: true,
				formatter: undefined,
				offsetY: 0,
				style: {
					fontSize: '12px',
				}
			}
		},
		yaxis: {
			show: true,
			labels:{
				offsetX:-10,
				formatter: function (value) {
				  return value + "k";
				},
				style:{
					colors:'#a4a7ab',
					fontSize: '14px',
			   },
			}
		},
		fill: {
		  opacity: 1,
		  colors:'#FB3E7A'
		},
		tooltip: {
			style: {
				fontSize: '12px',
			},
			y: {
				formatter: function(val) {
					return "k" + val + " thousands"
				}
			}
		},
		responsive: [{
			breakpoint: 575,
			options: {
				chart: {
					height:250,
				},
			},
		}]
		};

		var chartBar1 = new ApexCharts(document.querySelector("#salesChart2"), options);
		chartBar1.render();
	 
	}
	
 
	/* Function ============ */
		return {
			init:function(){
			},
			
			
			load:function(){
				widgetChart1();
				widgetChart2();
				chartBar();
				donutChart1();
				donutChart2();
				donutChart3();
				donutChart4();
				salesChart();
				salesChart1();
				salesChart2();
					
			},
			
			resize:function(){
			}
		}
	
	}();

	
		
	jQuery(window).on('load',function(){
		setTimeout(function(){
			dzChartlist.load();
		}, 1000); 
		
	});

     

})(jQuery);