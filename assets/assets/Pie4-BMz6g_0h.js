import{R as s,j as e,_ as o}from"./index-BDl-KjTW.js";class a extends s.Component{constructor(t){super(t),this.state={series:[42,47,52,58],options:{chart:{type:"polarArea",sparkline:{enabled:!0}},labels:["VIP","Reguler","Exclusive","Economic"],fill:{opacity:1,colors:["#709fba","#ff5c00","#0E8A74","#2258bf"]},stroke:{width:0,colors:void 0},yaxis:{show:!1},legend:{position:"bottom"},plotOptions:{polarArea:{rings:{strokeWidth:0}}},theme:{monochrome:{enabled:!0,shadeTo:"light",shadeIntensity:.6}}}}}render(){return e.jsx("div",{id:"chart",children:e.jsx(o,{options:this.state.options,series:this.state.series,type:"polarArea",height:251})})}}export{a as default};