exports.handler = async (event, context) => {
  const publicKey = process.env.EMAILJS_PUBLIC_KEY;
  const formUrl = process.env.FORM_URL;
  const f2 = process.env.ORIENTATION;


  return {
    statusCode: 200,
    body: JSON.stringify({ publicKey, formUrl, f2 })
  };
};