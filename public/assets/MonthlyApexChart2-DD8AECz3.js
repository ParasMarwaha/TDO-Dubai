import{R as o,j as e,_ as a}from"./index-C6t8CTSe.js";class i extends o.Component{constructor(t){super(t),this.state={series:[{name:"Net Profit",data:[500,600,500,600,500,600,500,600,500,600,500,300]}],options:{chart:{type:"area",height:75,toolbar:{show:!1},zoom:{enabled:!1},sparkline:{enabled:!0}},colors:["#0E8A74"],dataLabels:{enabled:!1},markers:{shape:"circle",colors:["#FB3E7A"],hover:{size:10}},legend:{show:!1},stroke:{show:!0,width:3,curve:"smooth",colors:["#0E8A74"]},grid:{show:!1,borderColor:"#eee",padding:{top:0,right:0,bottom:0,left:0}},states:{normal:{filter:{type:"none",value:0}},hover:{filter:{type:"none",value:0}},active:{allowMultipleDataPointsSelection:!1,filter:{type:"none",value:0}}},xaxis:{categories:["Jan","feb","Mar","Apr","May","Jun","Aug","Sep","Oct","Nov","Dec"],axisBorder:{show:!1},axisTicks:{show:!1},labels:{show:!1,style:{fontSize:"12px"}},crosshairs:{show:!1,position:"front",stroke:{width:1,dashArray:3}},tooltip:{enabled:!0,formatter:void 0,offsetY:0,style:{fontSize:"12px"}}},yaxis:{show:!1},fill:{type:"solid",opacity:1,colors:"#0E8A74"},tooltip:{style:{fontSize:"12px"},y:{formatter:function(s){return"$"+s+" thousands"}}}}}}render(){return e.jsx("div",{id:"chart",children:e.jsx(a,{options:this.state.options,series:this.state.series,type:"area",height:"75px"})})}}export{i as default};