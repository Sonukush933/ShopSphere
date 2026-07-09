const emailLayout = (title: string, content: string) => {
  return `
<!DOCTYPE html>
<html>

<head>
<meta charset="UTF-8">
<title>${title}</title>
</head>

<body
style="
margin:0;
padding:0;
background:#f3f4f6;
font-family:Arial,sans-serif;
"
>

<table
width="100%"
cellpadding="0"
cellspacing="0"
>

<tr>

<td align="center">

<table
width="600"
cellpadding="0"
cellspacing="0"
style="
background:#ffffff;
margin:40px auto;
border-radius:12px;
overflow:hidden;
box-shadow:0 10px 30px rgba(0,0,0,.08);
"
>

${content}

</table>

</td>

</tr>

</table>

</body>

</html>
`;
};

export default emailLayout;