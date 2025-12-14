import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const { pathname } = request.nextUrl;

  // Daftar path yang boleh diakses tanpa login
  const publicPaths = [
    '/',
    '/auth/login',
    '/auth/register',
    '/auth/forgot-password',
    '/api/auth' // Jika menggunakan NextAuth.js
  ];

  // Cek apakah path saat ini public
  const isPublicPath = publicPaths.some(path => 
    pathname.startsWith(path) || 
    pathname.startsWith('/_next') || // File internal Next.js
    pathname.startsWith('/favicon.ico') // Ikon website
  );

  // Redirect ke home jika mencoba akses halaman terproteksi tanpa token
  if (!token && !isPublicPath) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Jika sudah login tapi mencoba akses halaman auth, redirect ke dashboard
  if (token && (pathname.startsWith('/auth/login') || pathname.startsWith('/auth/register'))) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Tambahkan header/user info untuk route terproteksi
  if (token && !isPublicPath) {
    const response = NextResponse.next();
    // Contoh: Tambahkan header khusus
    response.headers.set('x-auth-user', 'authenticated');
    return response;
  }

  return NextResponse.next();
}

// Konfigurasi matcher untuk optimasi performa
export const config = {
  matcher: [
    /*
     * Match semua request kecuali:
     * - _next/static (static files)
     * - _next/img (img optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/img|favicon.ico).*)'
  ]
};