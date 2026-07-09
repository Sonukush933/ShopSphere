import emailLayout from '../layouts/email.layout';
import emailHeader from '../components/header';
import emailButton from '../components/button';
import emailFooter from '../components/footer';
import couponCard from '../components/coupon';

const welcomeTemplate = (name: string) => {
  const content = `
    ${emailHeader()}

    <tr>
      <td style="padding:45px;">

        <h2
          style="
            margin-top:0;
            color:#111827;
            font-family:Arial,sans-serif;
          "
        >
          Welcome, ${name} 👋
        </h2>

        <p
          style="
            font-size:16px;
            line-height:30px;
            color:#4b5563;
          "
        >
          Thank you for joining <strong>ShopSphere</strong>.
          We are excited to have you as part of our shopping community.
        </p>

        <p
          style="
            font-size:16px;
            line-height:30px;
            color:#4b5563;
          "
        >
          Explore thousands of products, secure payments,
          fast delivery and amazing offers.
        </p>

        ${emailButton(
          'Start Shopping',
          'http://localhost:5173',
        )}

        ${couponCard(
          'WELCOME10',
          '10%',
        )}

        <table
          width="100%"
          style="margin-top:35px;"
        >
          <tr>

            <td align="center">
              🚚
              <br><br>
              Fast Delivery
            </td>

            <td align="center">
              🔒
              <br><br>
              Secure Payments
            </td>

            <td align="center">
              ↩
              <br><br>
              Easy Returns
            </td>

          </tr>
        </table>

      </td>
    </tr>

    ${emailFooter()}
  `;

  return emailLayout(
    'Welcome to ShopSphere',
    content,
  );
};

export default welcomeTemplate;