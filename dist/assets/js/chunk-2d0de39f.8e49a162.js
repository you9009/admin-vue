(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0de39f"],{"856b":function(t,e,n){"use strict";n.r(e);var o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"page"},[n("table-tree",{attrs:{loading:t.loading,border:"",columns:t.columns,data:t.HomeMenuList},scopedSlots:t._u([{key:"action",fn:function(e){var o=e.row;return[n("Button",{attrs:{type:"primary",size:"small"},on:{click:function(e){return t.submit(o)}}},[t._v("按钮")])]}}])}),n("Modal",{attrs:{title:"内容","mask-closable":!1},model:{value:t.modal.show,callback:function(e){t.$set(t.modal,"show",e)},expression:"modal.show"}},[t._v("\n      "+t._s(t.modal.main)+"\n  ")])],1)},r=[],a=(n("8e6e"),n("ac6a"),n("456d"),n("bd86")),i=n("2f62");function c(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);e&&(o=o.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,o)}return n}function l(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?c(n,!0).forEach((function(e){Object(a["a"])(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):c(n).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}var s={name:"page3",data:function(){return{loading:!1,columns:[{width:200,title:"名称",key:"label"},{title:"路由",key:"link"},{title:"说明",key:"dec",tooltip:!0},{width:80,title:"操作",slot:"action",align:"center"}],modal:{show:!1,main:{}}}},computed:l({},Object(i["c"])(["HomeMenuList"])),methods:{submit:function(t){this.modal={show:!0,main:t}}}},u=s,d=n("2877"),p=Object(d["a"])(u,o,r,!1,null,"e60a46a4",null);e["default"]=p.exports}}]);