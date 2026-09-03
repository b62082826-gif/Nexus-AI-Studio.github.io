
export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ status: 'error', message: 'Method Not Allowed' });
    }

    const { source } = req.body;
    if (!source) return res.status(400).json({ status: 'error', message: 'No source code provided' });

    try {
        // --- ใส่ระบบ Obfuscate โค้ด Lua ของคุณตรงนี้ ---
        // ตัวอย่างจำลองการทำงาน:
        const fakeObfuscated = `-- Obfuscated by DexCode\nprint("Hello")\n-- ` + source;

        return res.status(200).json({ 
            status: 'success', 
            result: fakeObfuscated 
        });
    } catch (error) {
        return res.status(500).json({ status: 'error', message: error.message });
    }
}
