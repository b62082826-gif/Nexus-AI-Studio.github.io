
export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ status: 'error', message: 'Method Not Allowed' });
    }

    const { code } = req.body;
    if (!code) return res.status(400).json({ status: 'error', message: 'No script code provided' });

    try {
        const pastefyRes = await fetch('https://pastefy.app/api/v2/paste', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify({
                title: 'DexCode Script',
                content: code,
                visibility: 'UNLISTED'
            })
        });

        const data = await pastefyRes.json();
        if (data.exists || data.paste) {
            return res.status(200).json({
                status: 'success',
                id: data.paste.id,
                raw_url: `https://pastefy.app/${data.paste.id}/raw`
            });
        } else {
            return res.status(500).json({ status: 'error', message: 'Pastefy API Error' });
        }
    } catch (error) {
        return res.status(500).json({ status: 'error', message: error.message });
    }
}
