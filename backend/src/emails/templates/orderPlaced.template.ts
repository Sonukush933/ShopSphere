import emailLayout from '../layouts/email.layout';
import emailHeader from '../components/header';
import emailFooter from '../components/footer';
import emailButton from '../components/button';

const orderPlacedTemplate = (
  name: string,
  orderId: string,
) => {

const content = `

${emailHeader()}

<div style="padding:40px">

<h2>
Hi ${name},
</h2>

<p>

Your order has been placed successfully.

</p>

<p>

Order ID

<strong>

${orderId}

</strong>

</p>

${emailButton(
"View Order",
"http://localhost:5173/orders",
)}

</div>

${emailFooter()}

`;

return emailLayout(
"Order Placed",
content,
);

};

export default orderPlacedTemplate;