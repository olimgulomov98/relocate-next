import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
	return (
		<Html lang="en">
			<Head>
				<meta name="robots" content="index,follow" />
				<link rel="icon" type="image/png" href="/img/logo/favicon.png" />

				{/* SEO */}
				<meta name="keyword" content={'relocate, relocate.uz'} />
				<meta
					name={'description'}
					content={
						'Book and Rent properties anywhere anytime in United Arab Emirates. Best Properties at Best prices on relocate.uz | ' +
						'Покупайте и продавайте недвижимость в любой точке Южной Кореи в любое время. Лучшая недвижимость по лучшим ценам на relocate.uz | ' +
						'احجز واستأجر العقارات في أي مكان وفي أي وقت في الإمارات العربية المتحدة. أفضل العقارات بأفضل الأسعار على relocate.uz'
					}
				/>
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
