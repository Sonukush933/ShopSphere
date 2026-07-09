const emailFooter = () => {
  return `
    <tr>
      <td
        style="
          background:#f8fafc;
          padding:35px;
          text-align:center;
          font-family:Arial,sans-serif;
          border-top:1px solid #e5e7eb;
        "
      >

        <p
          style="
            margin:0;
            font-size:16px;
            color:#111827;
            font-weight:bold;
          "
        >
          Need Help?
        </p>

        <p
          style="
            margin:10px 0 20px;
            color:#6b7280;
            font-size:14px;
          "
        >
          Contact us anytime
        </p>

        <a
          href="mailto:shopspherebackend@gmail.com"
          style="
            color:#2563eb;
            text-decoration:none;
            font-size:15px;
            font-weight:bold;
          "
        >
          shopspherebackend@gmail.com
        </a>

        <div style="margin:30px 0;">

          <a
            href="#"
            style="
              margin:0 10px;
              text-decoration:none;
              font-size:22px;
            "
          >
            📘
          </a>

          <a
            href="#"
            style="
              margin:0 10px;
              text-decoration:none;
              font-size:22px;
            "
          >
            📸
          </a>

          <a
            href="#"
            style="
              margin:0 10px;
              text-decoration:none;
              font-size:22px;
            "
          >
            💼
          </a>

        </div>

        <p
          style="
            margin:0;
            color:#9ca3af;
            font-size:13px;
          "
        >
          © 2026 ShopSphere.
          All Rights Reserved.
        </p>

      </td>
    </tr>
  `;
};

export default emailFooter;