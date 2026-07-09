import emailLayout from '../layouts/email.layout';
import emailHeader from '../components/header';
import emailFooter from '../components/footer';

const orderDeliveredTemplate = (
  name: string,
) => {

const content = `

${emailHeader()}

<div style="padding:40px">

<h2>

Hi ${name}

</h2>

<p>

Your order has been delivered successfully.

</p>

<p>

Thank you for shopping with us ❤️

</p>

</div>

${emailFooter()}

`;

return emailLayout(
"Order Delivered",
content,
);

};

export default orderDeliveredTemplate;