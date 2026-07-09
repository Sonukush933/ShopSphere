const couponCard = (code: string, discount: string) => {
  return `
  
<div
style="
margin:40px 0;
padding:30px;
border-radius:12px;
background:linear-gradient(135deg,#2563eb,#1d4ed8);
text-align:center;
color:white;
font-family:Arial,sans-serif;
">

<h2
style="
margin:0;
font-size:26px;
"
>

🎉 Welcome Gift

</h2>

<p
style="
margin:20px 0 10px;
font-size:16px;
"
>

Use Coupon

</p>

<div
style="
font-size:34px;
font-weight:bold;
letter-spacing:3px;
margin-bottom:15px;
"
>

${code}

</div>

<p
style="
font-size:18px;
margin:0;
"
>

Get ${discount} OFF
on your first purchase.

</p>

</div>

`;
};

export default couponCard;
