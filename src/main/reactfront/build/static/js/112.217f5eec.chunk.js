"use strict";(self.webpackChunkadminpro=self.webpackChunkadminpro||[]).push([[112],{3112:function(e,r,t){t.r(r),t.d(r,{default:function(){return w}});var n=t(4165),s=t(4942),a=t(1413),o=t(5861),u=t(9439),c=t(2791),i=t(5294),l=localStorage.getItem("tokenType"),p=localStorage.getItem("accessToken"),d=localStorage.getItem("refreshToken"),f=i.Z.create({baseURL:"http://localhost:8080",headers:{"Content-Type":"application/json",Authorization:"".concat(l," ").concat(p),REFRESH_TOKEN:d}}),h=function(){var e=(0,o.Z)((0,n.Z)().mark((function e(r){var t,s,a,o,u;return(0,n.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=r.userId,s=r.userName,a=r.userPassword,o={userId:t,userName:s,userPassword:a},e.next=4,f.post("/api/v1/user",o);case 4:return u=e.sent,e.abrupt("return",u.data);case 6:case"end":return e.stop()}}),e)})));return function(r){return e.apply(this,arguments)}}(),m=function(){var e=(0,o.Z)((0,n.Z)().mark((function e(){var r;return(0,n.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,f.get("/api/v1/auth/refresh");case 2:r=e.sent,p=r.data,localStorage.setItem("accessToken",p),f.defaults.headers.common.Authorization="".concat(l," ").concat(p);case 6:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();f.interceptors.response.use((function(e){return e}),function(){var e=(0,o.Z)((0,n.Z)().mark((function e(r){var t;return(0,n.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t=r.config,403!==r.response.status||t._retry){e.next=5;break}return e.next=4,m();case 4:return e.abrupt("return",f(t));case 5:return e.abrupt("return",Promise.reject(r));case 6:case"end":return e.stop()}}),e)})));return function(r){return e.apply(this,arguments)}}());var v=t(184);function w(){var e=(0,c.useState)({userId:"",userName:"",userPassword:""}),r=(0,u.Z)(e,2),t=r[0],i=r[1],l=function(){var e=(0,o.Z)((0,n.Z)().mark((function e(r){return(0,n.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:i((0,a.Z)((0,a.Z)({},t),{},(0,s.Z)({},r.target.id,r.target.value)));case 1:case"end":return e.stop()}}),e)})));return function(r){return e.apply(this,arguments)}}(),p=function(){var e=(0,o.Z)((0,n.Z)().mark((function e(r){return(0,n.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:h(t).then((function(e){window.location.href="/login"})).catch((function(e){console.log(e)}));case 1:case"end":return e.stop()}}),e)})));return function(r){return e.apply(this,arguments)}}();return(0,v.jsx)("div",{className:"d-flex justify-content-center",style:{minHeight:"100vh"},children:(0,v.jsx)("div",{className:"align-self-center",children:(0,v.jsxs)("form",{onSubmit:p,children:[(0,v.jsxs)("div",{className:"form-group",style:{minWidth:"25vw"},children:[(0,v.jsx)("label",{htmlFor:"userId",children:"\uc544\uc774\ub514"}),(0,v.jsx)("input",{type:"text",className:"form-control",id:"userId",onChange:l,value:t.userId})]}),(0,v.jsxs)("div",{className:"form-group",style:{minWidth:"25vw"},children:[(0,v.jsx)("label",{htmlFor:"userPassword",children:"\ube44\ubc00\ubc88\ud638"}),(0,v.jsx)("input",{type:"password",className:"form-control",id:"userPassword",onChange:l,value:t.userPassword})]}),(0,v.jsxs)("div",{className:"form-group",style:{minWidth:"25vw"},children:[(0,v.jsx)("label",{htmlFor:"userName",children:"\uc774\ub984"}),(0,v.jsx)("input",{type:"text",className:"form-control",id:"userName",onChange:l,value:t.userName})]}),(0,v.jsx)("div",{className:"form-group",style:{minWidth:"25vw"},children:(0,v.jsx)("button",{type:"submit",style:{width:"100%"},children:"\ud68c\uc6d0\uac00\uc785"})})]})})})}}}]);
//# sourceMappingURL=112.217f5eec.chunk.js.map