const emailHeader = () => {
  return `
    <tr>
      <td
        align="center"
        style="
          background: linear-gradient(135deg, #1e3a8a, #2563eb);
          padding: 35px;
        "
      >

        <img
          src="${process.env.LOGO_URL}"
          alt="ShopSphere Logo"
          width="240"
          style="
            display:block;
            margin:0 auto;
          "
        />

        <p
          style="
            margin-top:18px;
            color:#e5e7eb;
            font-size:16px;
            font-family:Arial,sans-serif;
          "
        >
          Premium Shopping Experience
        </p>

      </td>
    </tr>
  `;
};

export default emailHeader;