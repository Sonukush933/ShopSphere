import emailLayout from '../layouts/email.layout';
import emailHeader from '../components/header';
import emailFooter from '../components/footer';
import emailButton from '../components/button';

const resetPasswordTemplate = (
  name: string,
  resetLink: string,
) => {

const content = `

${emailHeader()}

<div style="padding:40px">

<h2>

Hi ${name}

</h2>

<p>

We received a password reset request.

</p>

${emailButton(
"Reset Password",
resetLink,
)}

<p>

If you didn't request this,

please ignore this email.

</p>

</div>

${emailFooter()}

`;

return emailLayout(
"Reset Password",
content,
);

};

export default resetPasswordTemplate;