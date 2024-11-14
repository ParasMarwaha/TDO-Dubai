

(function($) {
    /* "use strict" */
	
 var dzChartlist = function(){
	
	var screenWidth = $(window).width();
	/* let draw = Chart.controllers.line.__super__.draw; //draw shadow */

	var overiewChart = function(){
		 var options = {
          series: [{
          name: 'Number of Projects',
          type: 'column',
          data: [75, 85, 72, 100, 50, 100, 80]
        }, {
          name: 'Revenue',
          type: 'area',
          data: [44, 65, 55, 75, 45, 55, 40]
        }, {
          name: 'Active Projects',
          type: 'line',
          data: [30, 25, 45, 30, 25, 35, 20]
        }],
          chart: {
          height: 265,
          type: 'line',
          stacked: false,
		  toolbar: {
				show: false,
			},
        },
        stroke: {
          width: [0, 1, 1],
          curve: 'straight',
		  dashArray: [0, 0, 5]
        },
		legend: {
			fontSize: '13px',
			fontFamily: 'poppins',
			 labels: {
				  colors:'#888888', 
			 }
		},
        plotOptions: {
          bar: {
            columnWidth: '18%',
			 borderRadius:6	,
          }
        },
        
        fill: {
          //opacity: [0.1, 0.1, 1],
		  type : 'gradient',
          gradient: {
            inverseColors: false,
            shade: 'light',
            type: "vertical",
            /* opacityFrom: 0.85,
            opacityTo: 0.55, */
			colorStops : [
				[
					{
					  offset: 0,
					  color: 'var(--primary)',
					  opacity: 1
					},
					{
					  offset: 100,
					  color: 'var(--primary)',
					  opacity: 1
					}
				],
				[
					{
					  offset: 0,
					  color: '#3AC977',
					  opacity: 1
					},
					{
					  offset: 0.4,
					  color: '#3AC977',
					  opacity: .15
					},
					{
					  offset: 100,
					  color: '#3AC977',
					  opacity: 0
					}
				],
				[
					{
					  offset: 0,
					  color: '#FF5E5E',
					  opacity: 1
					},
					{
					  offset: 100,
					  color: '#FF5E5E',
					  opacity: 1
					}
				],
			],
            stops: [0, 100, 100, 100]
          }
        },
		colors:["var(--primary)","#3AC977","#FF5E5E"],
        labels: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday',
          'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        ],
        markers: {
          size: 0
        },
        xaxis: {
          type: 'month',
		  labels: {
			   style: {
				   fontSize: '13px',
				   colors:'#888888',
			   },
		  },
        },
        yaxis: {
          min: 0,
		  tickAmount: 4,
		  labels: {
			   style: {
				   fontSize: '13px',
				   colors:'#888888',
			   },
		  },
        },
        tooltip: {
          shared: true,
          intersect: false,
          y: {
            formatter: function (y) {
              if (typeof y !== "undefined") {
                return y.toFixed(0) + " points";
              }
              return y;
        
            }
          }
        }
        };

        var chart = new ApexCharts(document.querySelector("#overiewChart"), options);
        chart.render();
		
		$(".mix-chart-tab .nav-link").on('click',function(){
			var seriesType = $(this).attr('data-series');
			var columnData = [];
			var areaData = [];
			var lineData = [];
			switch(seriesType) {
				case "week":
					columnData = [75, 85, 72, 100, 50, 100, 80];
					areaData = [44, 65, 55, 75, 45, 55, 40];
					lineData = [30, 25, 45, 30, 25, 35, 20];
					break;
				case "month":
					columnData = [20, 50, 80, 52, 10, 80, 50];
					areaData = [40, 25, 85, 45, 85, 25, 95];
					lineData = [65, 45, 25, 65, 45, 25, 75];
					break;
				case "year":
					columnData = [30, 20, 80, 52, 10, 90, 50];
					areaData = [40, 25, 40, 45, 85, 25, 50];
					lineData = [65, 45, 30, 65, 45, 25, 75];
					break;
				default:
					columnData = [75, 80, 72, 100, 50, 100, 80];
					areaData = [44, 65, 55, 75, 45, 55, 40];
					lineData = [30, 25, 45, 30, 25, 35, 20];
			}
			chart.updateSeries([
				{
					name: "Number of Projects",
					type: 'column',
					data: columnData
				},{
					name: 'Revenue',
					type: 'area',
					data: areaData
				},{
					name: 'Active Projects',
					type: 'line',
					data: lineData
				}
			]);
		})
	 
	}
	
	var swiperreview = function() {
		
	var swiper = new Swiper('.mySwiper', {
		speed: 1500,
		parallax: true,
		slidesPerView: 4,
		spaceBetween: 20,
		autoplay: {
			delay: 1000,
		},
		navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev",
		},
		breakpoints: {
			
		  300: {
			slidesPerView: 1,
			spaceBetween: 20,
		  },
		  416: {
			slidesPerView: 2,
			spaceBetween: 20,
		  },
		   768: {
			slidesPerView: 2,
			spaceBetween: 20,
		  },
		   1280: {
			slidesPerView: 3,
			spaceBetween: 20,
		  },
		  1788: {
			slidesPerView: 3,
			spaceBetween: 20,
		  },
		},
	});
}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
 
	/* Function ============ */
		return {
			init:function(){
			},
			
			
			load:function(){
				overiewChart();
				swiperreview();
			
				
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
