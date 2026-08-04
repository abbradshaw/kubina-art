export async function onRequest(context) {
  const { env, request } = context;
  const client_id = env.GITHUB_CLIENT_ID;
  const client_secret = env.GITHUB_CLIENT_SECRET;

  if (!client_id || !client_secret) {
    return new Response('Missing GITHUB_CLIENT_ID or GITHUB_CLIENT_SECRET environment variable.', { status: 500 });
  }

  const url = new URL(request.url);
  const code = url.searchParams.get('code');

  if (!code) {
    return new Response('No code provided', { status: 400 });
  }

  // Exchange code for access token
  const response = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      accept: 'application/json',
    },
    body: JSON.stringify({
      client_id,
      client_secret,
      code,
    }),
  });

  const data = await response.json();

  if (data.error) {
    return new Response(JSON.stringify(data), { status: 400 });
  }

  const token = data.access_token;
  const provider = 'github';

  // Return HTML that posts the message back to Sveltia/Decap CMS opener window
  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Authenticating...</title>
    </head>
    <body>
      <p>Completing login, please wait...</p>
      <script>
        const token = ${JSON.stringify(token)};
        const provider = ${JSON.stringify(provider)};
        
        // Post authorization message back to opener window
        if (window.opener) {
          window.opener.postMessage(
            "authorization:" + provider + ":success:" + JSON.stringify({ token, provider }),
            window.location.origin
          );
        } else {
          document.body.innerText = "No opener window found. Please close this window and try again.";
        }
      </script>
    </body>
    </html>
  `;

  return new Response(html, {
    headers: {
      'content-type': 'text/html;charset=UTF-8',
    },
  });
}
