const emailButton = (text: string, url: string) => {
  return `
    <div
      style="
        text-align: center;
        margin: 40px 0;
      "
    >
      <a
        href="${url}"
        style="
          background: linear-gradient(135deg, #2563eb, #1d4ed8);
          color: #ffffff;
          text-decoration: none;
          padding: 16px 36px;
          border-radius: 8px;
          font-size: 16px;
          font-weight: bold;
          display: inline-block;
          font-family: Arial, sans-serif;
        "
      >
        ${text}
      </a>
    </div>
  `;
};

export default emailButton;