export function onRequest(context) {
  const { env } = context;
  const client_id = env.GITHUB_CLIENT_ID;

  if (!client_id) {
    return new Response('Missing GITHUB_CLIENT_ID environment variable.', { status: 500 });
  }

  const redirect_uri = new URL(context.request.url).origin + '/api/callback';
  const url = `https://github.com/login/oauth/authorize?client_id=${client_id}&scope=repo,user&redirect_uri=${encodeURIComponent(redirect_uri)}`;

  return Response.redirect(url, 302);
}
