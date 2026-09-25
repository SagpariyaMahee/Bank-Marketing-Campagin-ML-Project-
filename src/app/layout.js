import "./globals.css";

export const metadata = {
  title: "Bank Marketing Term Deposit Subscription Predictor",
  description:
    "Interactive Machine Learning Web Application to predict client term deposit subscriptions using customer demographics, contact history, and banking metrics.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var observer = new MutationObserver(function(mutations) {
                    for (var i = 0; i < mutations.length; i++) {
                      var m = mutations[i];
                      if (m.type === 'attributes' && m.attributeName === 'bis_skin_checked') {
                        m.target.removeAttribute('bis_skin_checked');
                      }
                    }
                  });
                  observer.observe(document.documentElement, { attributes: true, subtree: true, attributeFilter: ['bis_skin_checked'] });
                } catch(e) {}
                
                window.addEventListener('unhandledrejection', function (e) {
                  var str = String(e.reason && (e.reason.stack || e.reason.message || e.reason) || '');
                  if (str.indexOf('chrome-extension://') !== -1 || str.indexOf('M_ID') !== -1 || str.indexOf('bis_skin_checked') !== -1) {
                    e.preventDefault();
                    e.stopImmediatePropagation();
                  }
                });
              })();
            `,
          }}
        />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
