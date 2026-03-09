// ARQUIVO: server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { RouterOSAPI } = require('node-routeros');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const mkConfig = {
    host: '192.168.10.1',
    user: 'gerente',
    password: 'hernane271088',
    port: 8728,
    timeout: 20000,
    keepalive: true
};

const connectMK = async () => {
    const client = new RouterOSAPI(mkConfig);
    await client.connect();
    return client;
};

// ... (MANTENHA TODAS AS ROTAS ANTERIORES AQUI) ...
// (Copie as rotas do código anterior: hotspot, system, ppp normal, etc...)

// --- ROTAS GERAIS (Recolocando as essenciais para garantir funcionamento) ---
app.get('/api/hotspot/profiles', async (req, res) => { let client; try { client = await connectMK(); const p = await client.write('/ip/hotspot/user/profile/print'); res.json(p); } catch (e) { res.status(500).json({error: e.message}); } finally { if(client) client.close(); } });
app.get('/api/hotspot/data', async (req, res) => { let client; try { client = await connectMK(); const a = await client.write('/ip/hotspot/active/print'); res.json({active: a}); } catch (e) { res.status(500).json({error: e.message}); } finally { if(client) client.close(); } });
app.post('/api/hotspot/create', async (req, res) => { let client; try { client = await connectMK(); const qtd = parseInt(req.body.quantity)||1; const users=[]; for(let i=0; i<qtd; i++){ const u=`GH${Math.floor(10000+Math.random()*90000)}`; const cmd=['/ip/hotspot/user/add', `=name=${u}`, `=password=`, `=profile=${req.body.profile||'default'}`]; if(req.body.timeLimit) cmd.push(`=limit-uptime=${req.body.timeLimit}`); await client.write(cmd); users.push(u); } res.json({success:true, users, count:qtd}); } catch (e) { res.status(500).json({error:e.message}); } finally { if(client) client.close(); } });
app.post('/api/hotspot/remove', async (req, res) => { let client; try { client = await connectMK(); const u = await client.write(['/ip/hotspot/user/print', '?name='+req.body.username]); if(u.length) await client.write(['/ip/hotspot/user/remove', `=numbers=${u[0]['.id']}`]); const a = await client.write(['/ip/hotspot/active/print', '?user='+req.body.username]); if(a.length) await client.write(['/ip/hotspot/active/remove', `=numbers=${a[0]['.id']}`]); res.json({success:true}); } catch (e) { res.status(500).json({error:e.message}); } finally { if(client) client.close(); } });
app.get('/api/system/services', async (req, res) => { let client; try { client = await connectMK(); const s = await client.write('/ip/service/print'); res.json(s); } catch(e){} finally{if(client)client.close()} });
app.get('/api/system/packages', async (req, res) => { let client; try { client = await connectMK(); const p = await client.write('/system/package/print'); res.json(p); } catch(e){} finally{if(client)client.close()} });
app.post('/api/tools/terminal', async (req, res) => { let client; try { client = await connectMK(); const r = await client.write(req.body.command); res.json({result:JSON.stringify(r,null,2)}); } catch(e){res.json({result:e.message})} finally{if(client)client.close()} });
app.post('/api/profile/create', async (req, res) => { let client; try { client = await connectMK(); await client.write(['/ip/hotspot/user/profile/add', `=name=${req.body.name}`, `=rate-limit=${req.body.rate}`, `=shared-users=${req.body.shared||1}`]); res.json({success:true}); } catch(e){} finally{if(client)client.close()} });
app.get('/api/ip/bindings', async (req, res) => { let client; try { client = await connectMK(); const b = await client.write('/ip/hotspot/ip-binding/print'); res.json(b); } catch(e){} finally{if(client)client.close()} });
app.post('/api/ip/binding/toggle', async (req, res) => { let client; try { client = await connectMK(); const ns = req.body.disabled==='true'?'no':'yes'; await client.write(['/ip/hotspot/ip-binding/set', `=numbers=${req.body.id}`, `=disabled=${ns}`]); res.json({success:true}); } catch(e){} finally{if(client)client.close()} });
app.get('/api/wifi', async (req, res) => { let client; try { client = await connectMK(); const w = await client.write(['/interface/print', '?type=wlan']); res.json(w); } catch(e){} finally{if(client)client.close()} });
app.post('/api/wifi/toggle', async (req, res) => { let client; try { client = await connectMK(); const ns = req.body.disabled==='true'?'no':'yes'; await client.write(['/interface/set', `=numbers=${req.body.id}`, `=disabled=${ns}`]); res.json({success:true}); } catch(e){} finally{if(client)client.close()} });
app.post('/api/system/reboot', async (req, res) => { let client; try { client = await connectMK(); client.write('/system/reboot'); res.json({success:true}); } catch(e){res.json({success:true})} finally{if(client)try{client.close()}catch(e){}} });
app.get('/api/ppp/dashboard', async (req, res) => { let client; try { client = await connectMK(); const [a, q, s, r] = await Promise.all([client.write('/ppp/active/print'), client.write('/queue/simple/print'), client.write('/system/scheduler/print'), client.write('/system/resource/print')]); const cpu = r[0]['cpu-load']; const d = a.map(u => ({ id: u['.id'], name: u.name, ip: u.address, uptime: u.uptime, tx: (q.find(x=>x.name===u.name)||{}).rate||'0/0', hasQueue: !!q.find(x=>x.name===u.name), hasScheduler: !!s.find(x=>x.name===u.name) })); res.json({users:d, cpu}); } catch (e) { res.status(500).json({error: e.message}); } finally { if(client) client.close(); } });
app.post('/api/ppp/create', async (req, res) => { let client; const { name, password, profile, months } = req.body; const dias = (parseInt(months) || 1) * 30; try { client = await connectMK(); await client.write(['/ppp/secret/add', `=name=${name}`, `=password=${password}`, `=profile=${profile}`, `=service=pppoe`]); const scriptCorte = `/ppp secret set [find name="${name}"] profile="Expired-Profile"; /ppp active remove [find name="${name}"]`; await client.write(['/system/scheduler/add', `=name=CORTE_${name}`, `=interval=${dias}d`, `=on-event=${scriptCorte}`]); res.json({ success: true }); } catch (e) { res.status(500).json({ error: e.message }); } finally { if (client) client.close(); } });
app.get('/api/ppp/profiles', async (req, res) => { let client; try { client = await connectMK(); const p = await client.write('/ppp/profile/print'); res.json(p); } catch (e) { res.status(500).json({error: e.message}); } finally { if(client) client.close(); } });
app.get('/api/ppp/secrets', async (req, res) => { let client; try { client = await connectMK(); const s = await client.write('/ppp/secret/print'); res.json(s); } catch (e) { res.status(500).json({error: e.message}); } finally { if(client) client.close(); } });
app.post('/api/ppp/kick', async (req, res) => { let client; try { client = await connectMK(); await client.write(['/ppp/active/remove', `=numbers=${req.body.id}`]); res.json({success:true}); } catch (e) { res.status(500).json({error: e.message}); } finally { if(client) client.close(); } });
app.get('/api/system/schedulers', async (req, res) => { let client; try { client = await connectMK(); const s = await client.write('/system/scheduler/print'); res.json(s); } catch (e) { res.status(500).json({error: e.message}); } finally { if(client) client.close(); } });
app.post('/api/ppp/renew', async (req, res) => { let client; try { client = await connectMK(); const s = await client.write(['/ppp/secret/print', '?name='+req.body.name]); if(s.length){ await client.write(['/ppp/secret/set', `=numbers=${s[0]['.id']}`, `=profile=${req.body.newProfile}`]); } const sch = await client.write(['/system/scheduler/print', '?name=CORTE_'+req.body.name]); if(sch.length) { await client.write(['/system/scheduler/remove', `=numbers=${sch[0]['.id']}`]); const scriptCorte = `/ppp secret set [find name="${req.body.name}"] profile="Expired-Profile"; /ppp active remove [find name="${req.body.name}"]`; await client.write(['/system/scheduler/add', `=name=CORTE_${req.body.name}`, `=interval=30d`, `=on-event=${scriptCorte}`]); } const a = await client.write(['/ppp/active/print', '?name='+req.body.name]); if(a.length){ await client.write(['/ppp/active/remove', `=numbers=${a[0]['.id']}`]); } res.json({success:true}); } catch (e) { res.status(500).json({error: e.message}); } finally { if(client) client.close(); } });

// --- NOVO: CRIAR PERFIL PPPOE COM BURST (TURBO) ---
app.post('/api/ppp/profile/create_burst', async (req, res) => {
    let client;
    try {
        client = await connectMK();
        const { name, baseRate, burstRate, burstTime } = req.body;
        
        // Formato MikroTik Rate-Limit: Rx/Tx RxBurst/TxBurst RxThreshold/TxThreshold RxBurstTime/TxBurstTime
        // Ex: 2M/2M 4M/4M 2M/2M 60/60
        // Threshold definido igual ao Base Rate para garantir que o Burst ative quando passar do base.
        const rateLimitString = `${baseRate}M/${baseRate}M ${burstRate}M/${burstRate}M ${baseRate}M/${baseRate}M ${burstTime}/${burstTime}`;

        await client.write([
            '/ppp/profile/add',
            `=name=${name}`,
            `=rate-limit=${rateLimitString}`,
            `=only-one=yes`,
            `=dns-server=8.8.8.8,8.8.4.4`
        ]);
        res.json({ success: true });
    } catch (err) { res.status(500).json({ error: err.message }); } 
    finally { if (client) client.close(); }
});

app.listen(3000, () => { console.log('--- ISP MANAGER V6 (BURST ADDED) ---'); });