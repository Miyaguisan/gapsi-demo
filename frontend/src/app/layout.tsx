import type { Metadata } from "next";
import { Suspense } from "react";
import { WebContextProvider } from "./_hooks/WebContext";

import "./globals.css";

export const metadata: Metadata = {
	title: 'e-Commerce Gapsi',
	description: 'e-Commerce Gapsi',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <html lang="es-MX">
		<head>
			<meta charSet="utf-8" />
			<meta name="viewport" content="width=device-width, initial-scale=1" />
			<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css" integrity="sha512-Evv84Mr4kqVGRNSgIGL/F/aIDqQb7xQ2vcrdIwxfjThSH8CSR7PBEakCr51Ck+w+/U6swU2Im1vVX0SVk9ABhg==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
			<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossOrigin="anonymous" />
			<title>e-Commerce - GAPSI</title>
		</head>
		<body>
			<Suspense>
				<WebContextProvider>
					{children}
				</WebContextProvider>
			</Suspense>
		</body>
	</html>
}
