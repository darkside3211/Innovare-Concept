export async function onRequest(context) {
  const { request, env, next } = context;
  const url = new URL(request.url);

  const cookieHeader = request.headers.get('Cookie') || '';
  const isAuthenticated = cookieHeader.includes('auth_session=granted');

  if (isAuthenticated) {
    return await next();
  }

  let errorMessage = '';
  if (request.method === 'POST') {
    const formData = await request.formData();
    const password = formData.get('password');

    if (password === env.ORG_PASS) {
      return new Response(null, {
        status: 302,
        headers: {
          'Set-Cookie': 'auth_session=granted; HttpOnly; Secure; Path=/; Max-Age=86400',
          'Location': url.origin,
        },
      });
    }
    errorMessage = '<p style="color: red; margin-bottom: 1rem;">Incorrect password.</p>';
  }

  const html = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Secure Access</title>
      </head>
      <body style="font-family: system-ui, sans-serif; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; background-color: #f3f4f6;">
        <div style="background: white; padding: 2.5rem; border-radius: 8px; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1); width: 100%; max-width: 320px;">
          <h2 style="margin-top: 0; margin-bottom: 1.5rem; color: #111827; text-align: center;">Organization Portal</h2>
          ${errorMessage}
          <form method="POST" style="display: flex; flex-direction: column;">
            <input type="password" name="password" placeholder="Enter Password" required style="padding: 0.75rem; margin-bottom: 1rem; border: 1px solid #d1d5db; border-radius: 4px; font-size: 1rem;" />
            <button type="submit" style="padding: 0.75rem; background-color: #2563eb; color: white; border: none; border-radius: 4px; font-size: 1rem; cursor: pointer; font-weight: 500;">Enter</button>
          </form>
        </div>
      </body>
    </html>
  `;

  return new Response(html, {
    headers: { 'content-type': 'text/html;charset=UTF-8' },
  });
}
