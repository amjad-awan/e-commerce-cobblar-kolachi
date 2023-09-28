"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[188],{3045:function(e,r,s){s.r(r),s.d(r,{default:function(){return w}});var n=s(2791),a=s(8914),t=s(1413),i=s(4165),l=s(5861),o=s(9439),c=s(5705),u=s(8007),m=s(1224),d=s(8880),p=s(184),x=function(){var e=(0,n.useState)(!1),r=(0,o.Z)(e,2),s=r[0],a=r[1],x=(0,d.D3)(),h=x.user,f=x.logout,w=x.isAuthenticated,j=x.loginWithRedirect;console.log("user",h);var v=(0,m.a)(),b=v.registerUser,N=v.loginUser,g=u.Ry().shape({email:u.Z_().email("Invalid email").required("Required"),password:u.Z_().required("Required")}),_=u.Ry().shape({email:u.Z_().email("Invalid email").required("Required"),password:u.Z_().required("Required"),firstname:u.Z_().required("Required"),lastname:u.Z_().required("Required")}),Z=(0,c.TA)({initialValues:{email:"",password:"",firstname:"",lastname:""},validationSchema:s?_:g,onSubmit:function(){var e=(0,l.Z)((0,i.Z)().mark((function e(r){var n,t;return(0,i.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!s){e.next=7;break}return e.next=3,b(r);case 3:e.sent&&a(!1),e.next=10;break;case 7:return n=r.email,t=r.password,e.next=10,N({email:n,password:t});case 10:case"end":return e.stop()}}),e)})));return function(r){return e.apply(this,arguments)}}()});return(0,p.jsxs)("div",{className:"flex w-[400px] justify-center items-center flex-col",children:[(0,p.jsxs)("form",{onSubmit:Z.handleSubmit,className:"w-[100%]",children:[s&&(0,p.jsxs)(p.Fragment,{children:[(0,p.jsxs)("div",{className:"w-[100%] mb-[20px] h-[50px] ",children:[(0,p.jsx)("input",(0,t.Z)({type:"text",placeholder:"first name",className:"h-[100%] w-[100%] px-2 outline-none auth_input",name:"firstname"},Z.getFieldProps("firstname"))),Z.touched.firstname&&Z.errors.firstname?(0,p.jsx)("div",{className:"error",children:Z.errors.firstname}):null]}),(0,p.jsxs)("div",{className:"w-[100%] mb-[20px] h-[50px] ",children:[(0,p.jsx)("input",(0,t.Z)({type:"text",placeholder:"last name",className:"h-[100%] w-[100%] px-2 outline-none auth_input",name:"lastname"},Z.getFieldProps("lastname"))),Z.touched.lastname&&Z.errors.lastname?(0,p.jsx)("div",{className:"error",children:Z.errors.lastname}):null]})]}),(0,p.jsxs)("div",{className:"w-[100%] mb-[20px] h-[50px] ",children:[(0,p.jsx)("input",(0,t.Z)({type:"text",placeholder:"email",className:"h-[100%] w-[100%] px-2 outline-none auth_input",name:"email"},Z.getFieldProps("email"))),Z.touched.email&&Z.errors.email?(0,p.jsx)("div",{className:"error",children:Z.errors.email}):null]}),(0,p.jsxs)("div",{className:"w-[100%] mb-[20px] h-[50px] ",children:[(0,p.jsx)("input",(0,t.Z)({type:"text",placeholder:"password",className:"h-[100%] w-[100%] px-2 outline-none auth_input",name:"password"},Z.getFieldProps("password"))),Z.touched.password&&Z.errors.password?(0,p.jsx)("div",{className:"error",children:Z.errors.password}):null]}),(0,p.jsxs)("button",{type:"submit",className:"__button uppercase w-[100%]",children:[(0,p.jsx)("span",{children:s?"create account":"login"}),(0,p.jsx)("span",{children:s?"create account":"login"})]})]}),(0,p.jsx)("p",{className:"text-[20px] font-[500] cursor-pointer text-[#363636] mt-6",onClick:function(){return a(!s)},children:s?"have an account? Login":" Don't have an account? Create one"}),w?(0,p.jsx)("button",{className:"__button",onClick:function(){return f({logoutParams:{returnTo:window.location.origin}})},children:"Log Out"}):(0,p.jsx)("button",{className:"__button",onClick:function(){return j()},children:"Log In"})]})},h=n.memo(x),f=function(){return(0,p.jsxs)(a.Z,{children:[(0,p.jsx)("div",{className:"container mx-auto flex justify-center items-center relative py-[30px] min-h-[90vh] mt-[113px]",children:(0,p.jsx)(h,{})}),(0,p.jsx)("hr",{className:"w-[100%] h-[1px] bg-[rgba(255, 255, 255, 0.25)]"})]})},w=n.memo(f)}}]);
//# sourceMappingURL=188.5cc950bd.chunk.js.map