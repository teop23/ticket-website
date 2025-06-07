export default {
    async fetch(request, env, ctx) {
        if (request.method !== 'GET') {
            return new Response('Not Allowed', { status: 405 });
        }

        const possible_paths = ['/pot', '/distributions'];
        const url = new URL(request.url);
        const path = url.pathname;
        if (!possible_paths.includes(path)) {
            return new Response('Not Allowed', { status: 405 });
        }

        const tokenAddress = "EqUJWhw3WHCrEEfcPVDigSkGapNfYWY2cuzRo6437obu";

        async function getDistributions() {
            const endpoint = `https://revshare.dev/api/token/${tokenAddress}/distributions`
            const response = await fetch(endpoint, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': '*/*',
                    'Origin': 'https://revshare.dev',
                    'Referer': 'https://revshare.dev/',
                },
            });

            if (!response.ok) {
                return new Response("Failed to fetch distributions", { status: 500 });
            }
            const data = await response.json();
            return new Response(JSON.stringify(data), {
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': request.headers.get('Origin') === 'http://localhost:5173'
                        ? 'http://localhost:5173'
                        : 'https://powermillions.org',
                    'Vary': 'Origin'
                },
            });
        }

        async function getPot() {
            try {

                const quickNodeEndpoint = 'https://yolo-indulgent-pond.solana-mainnet.quiknode.pro/bb262a4b29aa9cf952d5ef14abcb1ff5d2dbdf14';

                const rpcPayload = {
                    method: 'getBalance',
                    jsonrpc: '2.0',
                    params: ["A4G4Mz3mvdhnP2MTd4wP1fc8w5LH8TGgXovoMBSp2PY4"],
                    id: 'custom-id-001',
                };

                const response = await fetch(quickNodeEndpoint, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': '*/*',
                        'Origin': 'https://revshare.dev',
                        'Referer': 'https://revshare.dev/',
                    },
                    body: JSON.stringify(rpcPayload),
                });

                const data = await response.json();

                // we need to get the solana balance in lamports and convert it to SOL
                //data looks like this
                //{"jsonrpc":"2.0","result":{"context":{"apiVersion":"2.2.15","slot":345164959},"value":480858828},"id":"custom-id-001"}

                if (!data.result.value) {
                    return new Response(JSON.stringify({ error: 'Failed to fetch pot balance' }), {
                        status: 500,
                        headers: { 'Content-Type': 'application/json' },
                    });
                }

                const lamports = data.result.value;
                const sol = lamports / 1e9; // Convert lamports to SOL
                const response_data = {
                    potAmount: sol,
                }

                return new Response(JSON.stringify(response_data), {
                    status: 200,
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': request.headers.get('Origin') === 'http://localhost:5173'
                            ? 'http://localhost:5173'
                            : 'https://powermillions.org',
                        'Vary': 'Origin'
                    },
                });
            } catch (err) {
                return new Response(JSON.stringify({ error: 'Internal Error', detail: err.toString() }), {
                    status: 500,
                    headers: { 'Content-Type': 'application/json' },
                });
            }
        }

        if (path === '/distributions') {
            return await getDistributions();
        } else if (path === '/pot') {
            return await getPot();
        }
    },
};
