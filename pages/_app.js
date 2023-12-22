import { ThirdwebProvider } from '@thirdweb-dev/react';
import '../styles/globals.css';
import { Zksync } from "@thirdweb-dev/chains";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";

// This is the chain your dApp will work on.
// Change this to the chain your app is built for.
// You can also import additional chains from `@thirdweb-dev/chains` and pass them directly.
//const activeChain = 'zksync-era';

function MyApp({ Component, pageProps }) {
	return (
		<ThirdwebProvider
			activeChain={Zksync}
			clientId={process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID}
		>
			<Component {...pageProps} />
		</ThirdwebProvider>
	);
}

export default MyApp;
