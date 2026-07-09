import emailLayout from '../layouts/email.layout';
import emailHeader from '../components/header';
import emailFooter from '../components/footer';
import emailButton from '../components/button';

const orderShippedTemplate = (
  name: string,
  orderId: string,
) => {

const content = `

${emailHeader()}

<div style="padding:40px">

<h2>

Hello ${name}

</h2>

<p>

Good news 🎉

</p>

<p>

Your order

<strong>

${orderId}

</strong>

has been shipped.

</p>

${emailButton(
"Track Order",
"http://localhost:5173/orders",
)}

</div>

${emailFooter()}

`;

return emailLayout(
"Order Shipped",
content,
);

};

export default orderShippedTemplate;