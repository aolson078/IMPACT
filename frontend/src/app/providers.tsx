"use client";
import { ReactNode, useMemo } from "react";
import { http, WagmiProvider, fallback } from "wagmi";
import {
  RainbowKitProvider,
  midnightTheme,
  getDefaultConfig,
} from "@rainbow-me/rainbowkit";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { polygon } from "wagmi/chains";

const queryClient = new QueryClient();

export default function Providers({ children }: { children: ReactNode }) {
  const config = useMemo(() => {
    return getDefaultConfig({
      appName: "Impact",
      projectId: "e8c8a87407914a2eb1f233deda14637f",
      chains: [polygon],
      transports: {
        [polygon.id]: fallback([
          http(
            `https://polygon-mainnet.infura.io/v3/e8c8a87407914a2eb1f233deda14637f`
          ),
          http("https://polygon-rpc.com"),
        ]),
      },
      ssr: false,
    });
  }, []);

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider coolMode theme={midnightTheme()}>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
