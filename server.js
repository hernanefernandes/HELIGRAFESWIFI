<!DOCTYPE html>
<html lang="pt">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Sistema Completo de Gestão Heligrafes Wifi">
    <title>GRUPO HELIGRAFES | ERP V6.0</title>
    
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800;900&display=swap" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    
    <script src="https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

    <style>
        :root {
            --primary: #4f46e5; --primary-hover: #4338ca;
            --success: #10b981; --success-hover: #059669;
            --danger: #ef4444; --danger-hover: #dc2626;
            --warning: #f59e0b; --info: #0ea5e9;
            --bg-body: #f3f4f6; --bg-card: #ffffff;
            --text-main: #1f2937; --text-secondary: #6b7280;
            --text-label: #555; --border-color: #e5e7eb;
            --shadow-md: 0 4px 6px rgba(0,0,0,0.1);
            --radius-sm: 6px; --radius-md: 8px; --radius-lg: 12px;
            --transition: all 0.3s ease;
        }

        [data-theme="dark"] { --bg-body: #111827; --bg-card: #1f2937; --text-main: #f3f4f6; --text-secondary: #9ca3af; --text-label: #9ca3af; --border-color: #374151; }
        [data-theme="blue"] { --bg-body: #eff6ff; --bg-card: #ffffff; --text-main: #1e3a8a; --text-secondary: #3b82f6; --text-label: #1e40af; --border-color: #bfdbfe; }

        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Inter', sans-serif; background: var(--bg-body); color: var(--text-main); padding: 20px; transition: var(--transition); line-height: 1.6; }
        .container { max-width: 1200px; margin: 0 auto; padding-bottom: 100px; }

        /* Login */
        .login-wrapper { display: flex; justify-content: center; align-items: center; min-height: 80vh; }
        .login-box { width: 100%; max-width: 400px; padding: 40px; text-align: center; background: var(--bg-card); border-radius: var(--radius-lg); border: 1px solid var(--border-color); box-shadow: var(--shadow-md); }
        .login-logo { font-size: 40px; color: var(--primary); margin-bottom: 10px; }
        
        /* Header e Tabs */
        .header { text-align: center; margin-bottom: 30px; position: relative; animation: fadeInDown 0.5s ease; }
        .header h1 { color: var(--primary); margin: 0; font-size: 2.5rem; font-weight: 900; }
        .user-badge { position: absolute; top: 0; right: 0; background: var(--primary); color: white; padding: 5px 15px; border-radius: var(--radius-md); font-size: 12px; font-weight: bold; display: flex; align-items: center; gap: 10px; }
        .theme-switch { display: flex; gap: 8px; justify-content: center; margin-bottom: 20px; flex-wrap: wrap; }
        .btn-theme { padding: 8px 16px; border: 2px solid var(--border-color); cursor: pointer; border-radius: var(--radius-md); font-size: 13px; font-weight: 600; background: var(--bg-card); color: var(--text-main); }
        .nav-tabs { display: flex; gap: 10px; margin-bottom: 25px; overflow-x: auto; background: var(--border-color); padding: 12px; border-radius: var(--radius-lg); }
        .tab-btn { padding: 12px 28px; border: none; background: transparent; cursor: pointer; border-radius: var(--radius-md); font-weight: 600; color: var(--text-secondary); white-space: nowrap; font-size: 14px; }
        .tab-btn.active { background: var(--bg-card); color: var(--primary); box-shadow: var(--shadow-md); }
        .section-content { display: none; } .section-content.active { display: block; animation: fadeIn 0.4s ease; }

        /* Cards e Forms */
        .card { background: var(--bg-card); padding: 28px; border-radius: var(--radius-lg); margin-bottom: 24px; border: 1px solid var(--border-color); }
        .card h3 { margin-bottom: 20px; font-size: 1.3rem; display: flex; align-items: center; gap: 10px; }
        .card-primary { border-left: 5px solid var(--primary); } .card-info { border-left: 5px solid var(--info); } .card-danger { border-left: 5px solid var(--danger); } .card-success { border-left: 5px solid var(--success); }
        .form-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 18px; margin-bottom: 20px; }
        .form-group { display: flex; flex-direction: column; text-align: left; }
        label { font-size: 13px; font-weight: 700; color: var(--text-label); margin-bottom: 6px; text-transform: uppercase; }
        input, select, textarea { width: 100%; padding: 12px 14px; border: 2px solid var(--border-color); border-radius: var(--radius-sm); background: var(--bg-card); color: var(--text-main); font-size: 14px; }
        
        button { padding: 12px 24px; border: none; border-radius: var(--radius-sm); cursor: pointer; color: white; font-weight: 700; text-transform: uppercase; display: inline-flex; align-items: center; justify-content: center; gap: 8px; }
        .btn-primary { background: var(--primary); } .btn-success { background: var(--success); } .btn-danger { background: var(--danger); } .btn-info { background: var(--info); }
        .btn-sm { padding: 6px 12px; font-size: 12px; width: auto; } .btn-action { padding: 6px 14px; font-size: 12px; width: auto; } .btn-full { width: 100%; } .btn-whatsapp { background: #25D366; }

        /* Tabelas e Caixas */
        .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 15px; margin-bottom: 20px; }
        .stat-item { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 16px 20px; border-radius: var(--radius-md); font-size: 14px; font-weight: 700; color: white; text-align: center; }
        .stat-item span { display: block; font-size: 24px; margin-top: 8px; }
        table { width: 100%; border-collapse: collapse; font-size: 13px; margin-top: 15px; }
        thead { background: var(--border-color); } th { text-align: left; padding: 14px 12px; } td { border-bottom: 1px solid var(--border-color); padding: 14px 12px; }
        .alert-box { padding: 16px; border-radius: var(--radius-md); margin-bottom: 18px; font-size: 14px; border: 2px solid; } .alert-warning { background: #fffbeb; border-color: #f59e0b; color: #92400e; } #aviso-vencimento { display: none; }
        .terminal-output { background: #1a1a1a; color: #00ff00; padding: 18px; border-radius: var(--radius-sm); font-family: monospace; height: 180px; overflow-y: auto; margin-top: 12px; }
        #ticket-result { display: none; padding: 24px; text-align: center; margin-top: 20px; border-radius: var(--radius-md); border: 3px dashed var(--success); }
        .pos-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 10px; margin-bottom: 20px; }
        .pos-btn { background: var(--bg-body); border: 2px solid var(--border-color); color: var(--text-main); padding: 15px; text-align: center; border-radius: var(--radius-md); cursor: pointer; display: flex; flex-direction: column; align-items: center; gap: 8px; }
        .pos-btn:hover { border-color: var(--primary); } .pos-btn i { font-size: 24px; color: var(--primary); } .pos-btn span { font-weight: 800; font-size: 14px; } .pos-btn small { color: var(--success); font-weight: bold; }
        .ai-fab { position: fixed; bottom: 30px; right: 30px; width: 70px; height: 70px; background: linear-gradient(135deg, #6366f1, #8b5cf6); border-radius: 50%; display: flex; justify-content: center; align-items: center; color: white; font-size: 28px; cursor: pointer; z-index: 1000; }
        .chat-history { height: 350px; overflow-y: auto; border: 2px solid var(--border-color); padding: 15px; margin-bottom: 15px; border-radius: var(--radius-md); } .ai-message { background: #e0e7ff; padding: 12px; border-radius: 8px; margin-bottom: 10px; color: #1e3a8a; } .ai-message.user { background: #dcfce7; text-align: right; margin-left: auto; color: #15803d; }

        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeInDown { from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: translateY(0); } }
        @media print { .no-print { display: none !important; } #area-impressao { display: block !important; } body { background: white; } }
        .text-center { text-align: center; } .mt-1 { margin-top: 8px; } .mt-2 { margin-top: 16px; } .mb-2 { margin-bottom: 16px; } .flex { display: flex; } .gap-2 { gap: 16px; }

        /* Estilos adicionais para o Módulo Hotspot */
        .header-hotspot { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 15px; }
        #contador-usuarios { background-color: #e74c3c; color: white; padding: 2px 8px; border-radius: 12px; font-size: 0.8em; vertical-align: middle; margin-left: 5px; }
        .controles-tempo { display: flex; gap: 10px; align-items: center; }
        .texto-atualizacao { font-size: 0.9em; color: #555; }
        #intervalo-atualizacao { padding: 4px; border-radius: 4px; border: 1px solid var(--border-color); }
        .tabela-hotspot { width: 100%; margin-top: 15px; }
    </style>
</head>
<body>

<div id="login-screen" class="login-wrapper">
    <div class="login-box">
        <div class="login-logo"><i class="fas fa-network-wired"></i></div>
        <h2 style="color:var(--primary); font-weight: 900; letter-spacing: 1px;">GRUPO HELIGRAFES</h2>
        <p style="color:var(--text-secondary); margin-bottom: 25px; font-size: 14px;">ERP Empresarial V6</p>
        
        <div class="form-group mb-2">
            <label>Selecione o Usuário</label>
            <select id="login-user" style="padding: 12px; font-size: 15px; font-weight: bold; cursor: pointer;">
                <option value="admin">👑 Administrador</option>
                <option value="atendente">👩‍💻 Atendente (Secretaria)</option>
            </select>
        </div>
        <div class="form-group mb-2" style="margin-bottom: 30px;">
            <label>Senha de Acesso</label>
            <input type="password" id="login-pass" placeholder="Insira a sua senha" onkeypress="if(event.key==='Enter') App.login()">
        </div>
        <button class="btn-primary btn-full" onclick="App.login()"><i class="fas fa-sign-in-alt"></i> Entrar no Sistema</button>
    </div>
</div>

<div id="main-app" style="display: none;">
    <div class="container">
        <div class="header">
            <div class="user-badge no-print">
                <i class="fas fa-user-circle"></i> <span id="logged-user-name">Admin</span>
                <button class="btn-action btn-danger" style="margin-left: 10px;" onclick="App.logout()">Sair</button>
            </div>
            <h1>🌐 GRUPO HELIGRAFES</h1>
            <small>ERP Completo | Provedor de Internet & Serviços | Luanda Sul</small>
        </div>

        <div class="theme-switch no-print">
            <button class="btn-theme" style="background:#f3f4f6; color:#333;" onclick="App.changeTheme('light')">☀️ Claro</button>
            <button class="btn-theme" style="background:#1f2937; color:white;" onclick="App.changeTheme('dark')">🌙 Escuro</button>
            <button class="btn-theme" style="background:#eff6ff; color:#1e3a8a;" onclick="App.changeTheme('blue')">💧 Azul (Slate)</button>
        </div>

        <div id="aviso-vencimento" class="alert-box alert-warning">
            <strong>⚠️ ATENÇÃO: Clientes próximos do vencimento:</strong>
            <ul id="lista-vencendo" style="margin:8px 0 0 20px; font-size:13px;"></ul>
        </div>

        <nav class="nav-tabs no-print" role="navigation">
            <button class="tab-btn active" onclick="App.openTab('monitor')" data-tab="monitor">Monitor</button>
            <button class="tab-btn" onclick="App.openTab('mikrotik')" data-tab="mikrotik">📡 Hotspot</button>
            <button class="tab-btn admin-only" onclick="App.openTab('pppoe')" data-tab="pppoe">🌐 PPPoE</button>
            <button class="tab-btn admin-only" onclick="App.openTab('rede')" data-tab="rede">🛠️ NOC & Rede</button>
            <button class="tab-btn" onclick="App.openTab('gestao')" data-tab="gestao">📊 Financeiro ISP</button>
            <button class="tab-btn" onclick="App.openTab('caixa')" data-tab="caixa">🛒 Caixa & Serviços</button>
            <button class="tab-btn" onclick="App.openTab('contratos')" data-tab="contratos">📄 Contratos</button>
            <button class="tab-btn admin-only" onclick="App.openTab('rh')" data-tab="rh">👥 RH & Equipa</button>
            <button class="tab-btn admin-only" onclick="App.openTab('antenas')" data-tab="antenas">📡 Antenas</button>
            <button class="tab-btn admin-only" onclick="App.openTab('ia')" data-tab="ia">🤖 Assistente IA</button>
        </nav>

        <div id="monitor" class="section-content active">
            <div class="stats-grid">
                <div class="stat-item">Download<span id="monitor-rx">0.00 Mbps</span></div>
                <div class="stat-item">Upload<span id="monitor-tx">0.00 Mbps</span></div>
                <div class="stat-item">CPU Router<span id="monitor-cpu">0%</span></div>
                <div class="stat-item">Hotspot Ativos<span id="monitor-hotspot">0</span></div>
                <div class="stat-item">PPPoE Online<span id="monitor-pppoe">0</span></div>
                <div class="stat-item">A Terminar<span id="monitor-expiring">0</span></div>
            </div>

            <div class="card card-info">
                <h3>Monitor de Rede</h3>
                <div class="form-grid">
                    <div class="form-group">
                        <label>Interface de Monitorização</label>
                        <select id="monitor-interface"><option value="">A carregar...</option></select>
                    </div>
                    <div class="form-group">
                        <label>Estado da Internet</label>
                        <input id="monitor-internet-status" type="text" value="A verificar..." readonly>
                    </div>
                </div>
                <div id="internet-alert" class="alert-box alert-warning" style="display:none; margin-top:12px;">
                    <strong>Sem internet:</strong> os utilizadores devem ser informados.
                </div>
                <canvas id="monitorTrafficChart" height="80"></canvas>
            </div>

            <div class="card">
                <h3>Clientes Próximos do Prazo (Scheduler)</h3>
                <table><thead><tr><th>Cliente</th><th>Tipo</th><th>Próxima ação</th><th>Status</th></tr></thead><tbody id="tb-expiring"><tr><td colspan="4" class="text-center">A carregar...</td></tr></tbody></table>
            </div>
        </div>

        <div id="mikrotik" class="section-content">
            <div class="card card-primary">
                <h3>🎫 Gerar Vouchers Hotspot</h3>
                <div class="form-grid">
                    <div class="form-group"><label>Perfil</label><select id="select-profile"><option value="">Carregando...</option></select><button class="btn-sm btn-info mt-1" onclick="Hotspot.loadProfiles()">🔄 Recarregar</button></div>
                    <div class="form-group"><label>Tempo de Validade</label><select id="select-time"><option value="1h">1 Hora</option><option value="12h">12 Horas</option><option value="1d">1 Dia</option><option value="7d">7 Dias</option><option value="30d">1 Mês</option></select></div>
                    <div class="form-group"><label>Quantidade</label><select id="select-qty"><option value="1">1</option><option value="5">5</option><option value="10">10</option><option value="20">20</option><option value="50">50</option></select></div>
                </div>
                <button class="btn-primary btn-full" onclick="Hotspot.createUsers()" id="btn-criar">⚡ Gerar Vouchers</button>
                <div id="ticket-result"></div>
            </div>

            <div class="card">
                <div class="header-hotspot">
                    <h3>
                        🔥 Usuários Ativos Hotspot 
                        <span id="contador-usuarios">0</span>
                    </h3>
                    
                    <div class="controles-tempo">
                        <span class="texto-atualizacao">
                            Atualiza em: <strong id="tempo-restante">30</strong>s
                        </span>
                        <select id="intervalo-atualizacao" onchange="alterarIntervalo()">
                            <option value="15">15s</option>
                            <option value="30" selected>30s</option>
                            <option value="60">1 min</option>
                            <option value="0">Parar</option>
                        </select>
                        <button class="btn-sm btn-info" onclick="atualizacaoManual()">🔄 Atualizar Lista</button>
                    </div>
                </div>
                
                <table class="tabela-hotspot">
                    <thead>
                        <tr>
                            <th>Usuário</th>
                            <th>Endereço IP</th>
                            <th>Tempo Online</th>
                            <th>Tempo Restante</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody id="tb-hs-active">
                        <tr>
                            <td colspan="5" class="text-center">Carregando...</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div id="pppoe" class="section-content">
            <div class="stats-grid">
                <div class="stat-item">👥 Total Clientes<span id="stat-total">0</span></div>
                <div class="stat-item">🟢 Online<span id="stat-online">0</span></div>
                
                <div class="stat-item" style="background: linear-gradient(135deg, #10b981 0%, #059669 100%);">⬇️ Total Download<span id="stat-ppp-rx">0 Mbps</span></div>
                <div class="stat-item" style="background: linear-gradient(135deg, #4f46e5 0%, #3730a3 100%);">⬆️ Total Upload<span id="stat-ppp-tx">0 Mbps</span></div>
                
                <div class="stat-item">🔴 Expirados<span id="stat-expired">0</span></div>
                <div class="stat-item">💻 CPU Router<span id="cpu-load">0%</span></div>
            </div>

            <div class="card card-info">
                <h3>🌐 Criar Novo Cliente PPPoE</h3>
                <div class="form-grid">
                    <div class="form-group"><label>Nome de Usuário</label><input type="text" id="ppp-user" placeholder="Ex: joao.silva"></div>
                    <div class="form-group"><label>Senha</label><input type="text" id="ppp-pass" placeholder="Senha forte"></div>
                    <div class="form-group"><label>Plano/Perfil</label><select id="select-ppp-profile"><option>Carregando...</option></select></div>
                </div>
                <div class="form-grid">
                    <div class="form-group"><label>Meses a Pagar</label><select id="ppp-months"><option value="1">1 Mês</option><option value="2">2 Meses</option><option value="3">3 Meses</option><option value="6">6 Meses</option><option value="12">12 Meses</option></select></div>
                </div>
                <button class="btn-info btn-full" onclick="PPPoE.createClient()">💾 Criar Cliente</button>
            </div>

            <div class="card">
                <h3>🌍 Conexões PPPoE Ativas</h3>
                <button class="btn-sm btn-info" onclick="PPPoE.loadDashboard()">🔄 Atualizar Tudo</button>
                
                <table>
                    <thead>
                        <tr>
                            <th>Cliente</th>
                            <th>Endereço IP</th>
                            <th>⬇️ Download (RX)</th>
                            <th>⬆️ Upload (TX)</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody id="tb-ppp-active">
                        <tr><td colspan="5" class="text-center">Carregando...</td></tr>
                    </tbody>
                </table>
            </div>
            
            <div class="card card-danger">
                <h3>Clientes PPPoE Próximos do Término</h3>
                <table><thead><tr><th>Cliente</th><th>Próxima Data</th><th>Status</th></tr></thead><tbody id="tb-ppp-expiring"><tr><td colspan="3" class="text-center">Carregando...</td></tr></tbody></table>
            </div>
        </div>

        <div id="rede" class="section-content">
            <div class="card card-danger"><h3>⚠️ Controle do Sistema</h3><button class="btn-danger btn-full" onclick="Network.rebootSystem()">⚠️ REINICIAR ROTEADOR</button></div>

            <div class="card card-primary">
                <h3>📈 Tráfego da Interface Principal (Tempo Real)</h3>
                <div style="display: flex; justify-content: center; gap: 30px; margin-bottom: 20px; background: var(--bg-body); padding: 15px; border-radius: var(--radius-md); border: 1px solid var(--border-color);">
                    <div style="text-align: center;"><div style="font-size: 11px; font-weight: 800; color: #10b981; text-transform: uppercase;">⬇️ Download (RX)</div><div style="font-size: 28px; font-weight: 900; color: var(--text-main); font-family: monospace;"><span id="txt-rx">0.00</span> <span style="font-size: 14px; color: var(--text-secondary);">Mbps</span></div></div>
                    <div style="width: 2px; background: var(--border-color);"></div>
                    <div style="text-align: center;"><div style="font-size: 11px; font-weight: 800; color: #4f46e5; text-transform: uppercase;">⬆️ Upload (TX)</div><div style="font-size: 28px; font-weight: 900; color: var(--text-main); font-family: monospace;"><span id="txt-tx">0.00</span> <span style="font-size: 14px; color: var(--text-secondary);">Mbps</span></div></div>
                </div>
                <canvas id="trafficChart" height="80"></canvas>
                <button class="btn-sm btn-info mt-2" onclick="Network.toggleTrafficMonitor()" id="btn-monitor">▶️ Iniciar Monitoramento</button>
            </div>

            <div class="card" style="border-left: 5px solid #1a1a1a;">
                <h3>💻 Terminal de Comandos</h3>
                <div class="flex gap-2"><input type="text" id="cmd-input" placeholder="/ip address print" style="flex: 1;"><button class="btn-primary" onclick="Network.executeCommand()" style="width: auto;">▶️ Executar</button></div>
                <div id="cmd-output" class="terminal-output">Aguardando comando...</div>
            </div>

            <div class="card">
                <h3>🔌 Serviços do Sistema</h3><button class="btn-sm btn-info" onclick="Network.loadServices()">🔄 Atualizar</button>
                <table><thead><tr><th>Serviço</th><th>Porta</th><th>Status</th></tr></thead><tbody id="tb-services"></tbody></table>
            </div>

            <div class="card" style="border-left: 5px solid #8b5cf6;">
                <h3>🛠️ Criar Novo Perfil</h3>
                <div class="form-grid">
                    <div class="form-group"><label>Nome</label><input type="text" id="prof-name" placeholder="Ex: 10MB"></div>
                    <div class="form-group"><label>Rate</label><input type="text" id="prof-rate" placeholder="10M/10M"></div>
                    <div class="form-group"><label>Shared Users</label><input type="number" id="prof-shared" value="1"></div>
                </div>
                <button class="btn-primary btn-full" onclick="Network.createProfile()" style="background:#8b5cf6;">💾 Criar Perfil</button>
            </div>
            
            <div class="card">
                <h3>📶 Controle Wi-Fi</h3><button class="btn-sm btn-info" onclick="Network.loadWifi()">🔄 Atualizar</button>
                <table><thead><tr><th>Rede</th><th>Status</th><th>Ações</th></tr></thead><tbody id="tb-wifi"></tbody></table>
            </div>
        </div>

        <div id="gestao" class="section-content">
            <div class="card card-success">
                <h3>💰 Pagamento & Renovação de Cliente (Internet)</h3>
                <div class="form-grid">
                    <div class="form-group"><label>Selecionar Cliente</label><select id="fin-cliente-select" onchange="Financial.checkExpiration()"><option value="">Carregando...</option></select><button class="btn-sm btn-info mt-1" onclick="Financial.loadClients()">🔄 Atualizar</button></div>
                    <div class="form-group"><label>Nome Real</label><input type="text" id="fin-nome-real" placeholder="Nome completo..."></div>
                </div>
                <div class="form-grid">
                    <div class="form-group"><label>Plano</label><select id="fin-plano-select"><option>Carregando...</option></select></div>
                    <div class="form-group"><label>Meses</label><select id="fin-meses" onchange="Financial.updateTotal()"><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="6">6</option><option value="12">12</option></select></div>
                </div>
                <div class="form-grid">
                    <div class="form-group"><label>Valor Mensal (Kz)</label><input type="number" id="fin-valor-unitario" onkeyup="Financial.updateTotal()" placeholder="Ex: 5000"></div>
                    <div class="form-group"><label>Total a Pagar</label><input type="text" id="fin-valor-total" readonly style="font-weight:bold; color:var(--primary); font-size:18px;" value="0 Kz"></div>
                </div>
                <div style="background:var(--bg-body); padding:15px; margin-bottom:18px; border-radius:var(--radius-md);">
                    <label>📞 WhatsApp do Cliente</label>
                    <div class="flex gap-2"><input type="tel" id="fin-whatsapp" placeholder="Ex: 244923456789" style="flex: 1;"><button class="btn-whatsapp" onclick="Financial.sendWhatsApp()" style="width: auto;">📲 Enviar Comprovativo</button></div>
                </div>
                <div id="status-vencimento" class="alert-box alert-active"><strong>📅 Vencimento Atual:</strong> <span id="data-vencimento-real">---</span><br><strong>📅 Novo Vencimento:</strong> <span id="fin-nova-data" style="font-weight:bold; color:var(--primary);">---</span></div>
                <button class="btn-success btn-full" onclick="Financial.payAndRenew()">✅ CONFIRMAR PAGAMENTO & RENOVAR</button>
            </div>

            <div class="card">
                <h3>📜 Histórico de Pagamentos ISP | Total: <span id="total-arrecadado" style="color:var(--success);">0 Kz</span></h3>
                <div id="listaHistorico" style="max-height: 400px; overflow-y: auto;"></div>
            </div>

            <div id="area-recibo" style="display:none; font-family:monospace; padding:20px; background:white; color:black; width: 300px; margin: 0 auto; border: 1px dashed #000;">
                <div style="text-align:center; font-weight:bold; font-size:18px; margin-bottom:10px;">GRUPO HELIGRAFES</div>
                <div style="text-align:center; font-size:12px; margin-bottom:15px;">Luanda Sul - Angola<br>NIF: 0000000000</div>
                <div style="border-bottom: 1px dashed #000; margin-bottom: 10px;"></div>
                <div style="font-size: 14px; margin-bottom: 5px;"><strong>RECIBO DE PAGAMENTO</strong></div>
                <div style="font-size: 12px; line-height: 1.6;"><strong>Data:</strong> <span id="r_data"></span><br><strong>Cliente:</strong> <span id="r_cliente"></span><br><strong>Plano:</strong> <span id="r_plano"></span><br><strong>Período:</strong> <span id="r_meses"></span> Mês(es)<br><strong>Vencimento:</strong> <span id="r_vencimento"></span><br></div>
                <div style="border-bottom: 1px dashed #000; margin: 10px 0;"></div>
                <div style="font-size: 16px; font-weight: bold; text-align: right;">Total: <span id="r_total"></span></div>
            </div>
        </div>

        <div id="caixa" class="section-content">
            <div class="stats-grid">
                <div class="stat-item" style="background: linear-gradient(135deg, #10b981 0%, #059669 100%);">🛒 Total Caixa Hoje<span id="caixa-total-hoje">0 Kz</span></div>
            </div>

            <div class="card card-primary">
                <h3>🖥️ Ponto de Venda (Serviços Adicionais)</h3>
                
                <h4 style="margin-top: 15px; margin-bottom: 10px; color: var(--text-secondary);">🖃 Carimbos Automáticos</h4>
                <div class="pos-grid">
                    <div class="pos-btn" onclick="POS.addCart('Carimbo Automático (Pequeno)', 14000)"><i class="fas fa-stamp"></i><span>Pequeno</span><small>14.000 Kz</small></div>
                    <div class="pos-btn" onclick="POS.addCart('Carimbo Automático (Médio)', 16000)"><i class="fas fa-stamp"></i><span>Médio</span><small>16.000 Kz</small></div>
                    <div class="pos-btn" onclick="POS.addCart('Carimbo Automático (Grande)', 18000)"><i class="fas fa-stamp"></i><span>Grande</span><small>18.000 Kz</small></div>
                </div>

                <h4 style="margin-top: 25px; margin-bottom: 10px; color: var(--text-secondary);">📚 Trabalhos Académicos</h4>
                <div class="pos-grid">
                    <div class="pos-btn" onclick="POS.addCart('Trabalho Académico (Ensino de Base)', 2000)"><i class="fas fa-book"></i><span>Ensino de Base</span><small>2.000 Kz</small></div>
                    <div class="pos-btn" onclick="POS.addCart('Trabalho Académico (Médio)', 2500)"><i class="fas fa-book-reader"></i><span>Ensino Médio</span><small>2.500 Kz</small></div>
                    <div class="pos-btn" onclick="POS.addCart('Trabalho Académico (Superior)', 3500)"><i class="fas fa-graduation-cap"></i><span>Ensino Superior</span><small>3.500 Kz</small></div>
                </div>
                
                <h4 style="margin-top: 25px; margin-bottom: 10px; color: var(--text-secondary);">Outros Serviços</h4>
                <div class="flex gap-2 mb-2">
                    <input type="text" id="pos-desc" placeholder="Descrição (Ex: Formatação de PC)" style="flex: 2;">
                    <input type="number" id="pos-val" placeholder="Valor (Kz)" style="flex: 1;">
                    <button class="btn-info" onclick="POS.addCustomCart()">Adicionar</button>
                </div>

                <div style="background: var(--bg-body); padding: 15px; border-radius: var(--radius-md); border: 1px dashed var(--primary); margin-top: 20px;">
                    <h4>🛒 Carrinho de Vendas</h4>
                    <ul id="pos-cart-list" style="list-style: none; padding: 10px 0; margin: 0; min-height: 50px;"></ul>
                    <div style="border-top: 2px solid var(--border-color); padding-top: 10px; text-align: right; font-size: 20px; font-weight: bold;">Total: <span id="pos-cart-total" style="color: var(--success);">0 Kz</span></div>
                    <button class="btn-success btn-full mt-2" onclick="POS.checkout()">✅ Finalizar Venda Caixa</button>
                </div>
            </div>

            <div class="card">
                <h3>📋 Registo de Vendas Diárias (Caixa)</h3>
                <div id="lista-caixa" style="max-height: 300px; overflow-y: auto;"></div>
            </div>
        </div>

        <div id="contratos" class="section-content">
            <div class="card no-print">
                <h3>🖨️ Gerar Contrato de Prestação de Serviços</h3>
                <div class="form-grid">
                    <input type="text" id="c_nome" placeholder="Nome Completo">
                    <input type="text" id="c_bi" placeholder="Número do BI">
                    <input type="text" id="c_endereco" placeholder="Endereço Completo">
                    <input type="text" id="c_telefone" placeholder="Telefone">
                    <input type="text" id="c_plano" placeholder="Nome do Plano">
                    <input type="text" id="c_valor" placeholder="Valor Mensal (Kz)">
                </div>
                <button class="btn-primary btn-full" onclick="Contract.print()">🖨️ Gerar e Imprimir Contrato</button>
            </div>

            <div id="area-impressao" style="display:none; font-family:'Times New Roman', serif; padding:50px; background:white; color:black; line-height:1.8;">
                <div style="text-align:center; font-weight:bold; margin-bottom:40px; font-size:16px;">CONTRATO DE PRESTAÇÃO DE SERVIÇOS DE INTERNET</div>
                <p>Entre, de um lado <strong>GRUPO HELIGRAFES</strong>, e de outro lado:</p>
                <p style="margin:20px 0;"><strong>Cliente:</strong> <span id="p_nome">__________________</span><br><strong>BI N.º:</strong> <span id="p_bi">__________________</span><br><strong>Telefone:</strong> <span id="p_telefone">__________________</span><br><strong>Endereço:</strong> <span id="p_endereco">__________________</span></p>
                <p><strong>CLÁUSULA 1ª:</strong> O presente contrato tem por objeto a prestação de serviços de internet, plano <span id="p_plano" style="font-weight:bold;"></span>.</p>
                <p><strong>CLÁUSULA 2ª:</strong> O CONTRATANTE pagará o valor mensal de <span id="p_valor" style="font-weight:bold;"></span> Kwanzas.</p>
                <p style="text-align:right; margin-top:60px;">Luanda, <span id="data_extenso"></span>.</p>
                <div style="display:flex; justify-content:space-between; margin-top:100px;">
                    <div style="border-top:2px solid black; width:40%; text-align:center; padding-top:10px;">Assinatura da CONTRATADA</div>
                    <div style="border-top:2px solid black; width:40%; text-align:center; padding-top:10px;">Assinatura do CONTRATANTE</div>
                </div>
            </div>
        </div>

        <div id="rh" class="section-content">
            <div class="card" style="border-left: 5px solid #8b5cf6;">
                <h3>👥 Gestão de Equipa & Assiduidade (Acesso Livre Admin)</h3>
                <div class="form-grid">
                    <div class="form-group"><label>Nome do Funcionário</label><input type="text" id="rh-nome" placeholder="Ex: João Secretário"></div>
                    <div class="form-group"><label>Cargo</label><select id="rh-cargo"><option>Secretaria</option><option>Técnico de Redes</option><option>Assistente</option></select></div>
                    <div class="form-group"><label>Salário Base Mensal (Kz)</label><input type="number" id="rh-salario" placeholder="Ex: 50000"></div>
                </div>
                <button class="btn-primary" style="background:#8b5cf6;" onclick="HR.addEmployee()">➕ Registar Funcionário</button>
            </div>

            <div class="card">
                <h3>🕒 Controlo de Ponto e Faltas Diárias</h3>
                <table><thead><tr><th>Funcionário</th><th>Cargo</th><th>Base (Kz)</th><th>Faltas/Atrasos</th><th>Salário Líquido</th><th>Ações</th></tr></thead><tbody id="tb-rh"><tr><td colspan="6" class="text-center">Carregando...</td></tr></tbody></table>
            </div>
        </div>

        <div id="antenas" class="section-content">
            <div class="card" style="border-left: 5px solid #6366f1;">
                <h3>📡 Cadastrar Nova Antena</h3>
                <div class="form-grid">
                    <input type="text" id="ant-nome" placeholder="Nome/Identificação">
                    <input type="text" id="ant-ip" placeholder="IP (Ex: 192.168.88.1)">
                    <input type="text" id="ant-rua" placeholder="Localização/Rua">
                    <input type="tel" id="ant-tel" placeholder="Telefone">
                </div>
                <button class="btn-primary btn-full" style="background:#6366f1;" onclick="Antenna.add()">💾 Salvar Antena</button>
            </div>
            <div class="card">
                <h3>📡 Antenas Cadastradas</h3>
                <table><thead><tr><th>Nome</th><th>IP</th><th>Local</th><th>Tel</th><th>Ações</th></tr></thead><tbody id="tb-antenas"></tbody></table>
            </div>
        </div>

        <div id="ia" class="section-content">
            <div class="card" style="border-left: 5px solid #8b5cf6;">
                <h3>🤖 Assistente IA Heligrafes</h3>
                <div class="chat-history" id="chat-history"><div class="ai-message">👋 Olá! Sou sua IA autônoma. Diga o que precisa!</div></div>
                <div class="flex gap-2 mb-2"><input type="text" id="ai-input-text" placeholder="Digite seu comando..." style="flex: 1;" onkeypress="if(event.key==='Enter') AI.sendText()"><button class="btn-primary" onclick="AI.sendText()">Enviar</button></div>
                <div id="ai-status" style="color: var(--text-secondary); text-align: center;">Status: Aguardando comando...</div>
                <h4 style="margin-top:30px;">📝 Histórico de Ações</h4>
                <ul id="listaApontamentos" style="list-style: none; padding: 0;"></ul>
            </div>
        </div>

    </div>
</div>

<div class="ai-fab no-print admin-only" id="micBtn" onclick="AI.toggleVoice()" title="Ativar Voz"><i class="fas fa-microphone"></i></div>

<script>
    // ========================================
    // TEMPORIZADOR DO HOTSPOT
    // ========================================
    let intervaloEmSegundos = 30;
    let tempoRestante = intervaloEmSegundos;
    let timer;

    function iniciarCronometro() {
        clearInterval(timer); 
        if (intervaloEmSegundos > 0) {
            tempoRestante = intervaloEmSegundos;
            document.getElementById('tempo-restante').innerText = tempoRestante;
            timer = setInterval(() => {
                tempoRestante--;
                document.getElementById('tempo-restante').innerText = tempoRestante;
                if (tempoRestante <= 0) {
                    executarAtualizacao();
                    tempoRestante = intervaloEmSegundos;
                }
            }, 1000);
        } else {
            document.getElementById('tempo-restante').innerText = "--";
        }
    }

    function alterarIntervalo() {
        const select = document.getElementById('intervalo-atualizacao');
        intervaloEmSegundos = parseInt(select.value);
        iniciarCronometro();
    }

    function atualizacaoManual() {
        executarAtualizacao();
        if (intervaloEmSegundos > 0) iniciarCronometro(); 
    }

    function executarAtualizacao() {
        document.getElementById('tb-hs-active').innerHTML = '<tr><td colspan="5" class="text-center">Carregando...</td></tr>';
        if(typeof Hotspot !== 'undefined') Hotspot.loadActive();
    }

    function atualizarContagemUsuarios(total) {
        document.getElementById('contador-usuarios').innerText = total;
    }

    function formatarTempoRestante(totalSegundos) {
        if (totalSegundos <= 0) return "Expirado";
        const h = Math.floor(totalSegundos / 3600);
        const m = Math.floor((totalSegundos % 3600) / 60);
        const s = totalSegundos % 60;
        const hh = h.toString().padStart(2, '0');
        const mm = m.toString().padStart(2, '0');
        const ss = s.toString().padStart(2, '0');
        return `${hh}h ${mm}m ${ss}s`;
    }

    setInterval(() => {
        const elementosTempo = document.querySelectorAll('.tempo-cliente-restante');
        elementosTempo.forEach(el => {
            let segundos = parseInt(el.getAttribute('data-segundos'));
            if (segundos > 0) {
                segundos--; 
                el.setAttribute('data-segundos', segundos); 
                el.innerText = formatarTempoRestante(segundos); 
                if (segundos < 300) { el.style.color = "#e74c3c"; el.style.fontWeight = "bold"; }
            } else if (segundos === 0) {
                el.innerText = "Expirado 🔴";
                el.style.color = "red";
                el.setAttribute('data-segundos', -1);
            }
        });
    }, 1000);

    // ========================================
    // CORE & CONFIG E UTILS (COM FUNÇÕES DE TRÁFEGO)
    // ========================================
    const CONFIG = {
        API_URL: 'http://127.0.0.1:3000/api',
        DEFAULT_HOTSPOT_PROFILES: ['default', '1H', '10H', '24H','2D', '7D'],
        DEFAULT_PPP_PROFILES: ['1MB', '2MB', '5MB', '10MB', '20MB', '30MB'],
        STORAGE_KEYS: { TASKS: 'isp_tasks', HISTORY: 'isp_historico', ANTENNAS: 'isp_antenas', THEME: 'isp_theme', SESSION: 'isp_session', MONITOR_INTERFACE: 'isp_monitor_interface' },
        MONTHS_PT: ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"]
    };

    const State = { schedulers: [], secrets: [], antennas: [], lastVouchers: null, aiState: { action: null, data: {} }, reset() { this.aiState = { action: null, data: {} }; } };

    const Utils = {
        parseTraffic(str) {
            if (!str) return 0;
            const s = String(str).toLowerCase().trim();
            let val = parseFloat(s);
            if (isNaN(val)) return 0;
            if (s.includes('g')) return val * 1000000000;
            if (s.includes('m')) return val * 1000000;
            if (s.includes('k')) return val * 1000;
            return val;
        },
        formatTraffic(bps) {
            if (bps >= 1000000000) return (bps / 1000000000).toFixed(2) + ' Gbps';
            if (bps >= 1000000) return (bps / 1000000).toFixed(2) + ' Mbps';
            if (bps >= 1000) return (bps / 1000).toFixed(2) + ' kbps';
            return Math.floor(bps) + ' bps';
        },
        async apiRequest(endpoint, options = {}) {
            const requestOptions = {
                headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
                ...options
            };
            try {
                const response = await fetch(`${CONFIG.API_URL}${endpoint}`, requestOptions);
                const data = await response.json().catch(() => ({}));
                if (!response.ok) return { success: false, error: data.error || `HTTP ${response.status}` };
                return data;
            } catch (error) {
                return { success: false, error: error.message || 'Falha de comunicação com o servidor.' };
            }
        },
        formatCurrency(v) { return parseFloat(v||0).toLocaleString('pt-AO', { minimumFractionDigits: 2 }) + ' Kz'; },
        formatDate(d = new Date()) { return d.toLocaleDateString('pt-AO'); },
        formatDateExt(d = new Date()) { return `${d.getDate()} de ${CONFIG.MONTHS_PT[d.getMonth()]} de ${d.getFullYear()}`; },
        getStorage(k) { try { return JSON.parse(localStorage.getItem(k) || '[]'); } catch { return []; } },
        setStorage(k, d) { localStorage.setItem(k, JSON.stringify(d)); },
        escapeHtml(value) {
            return String(value ?? '')
                .replaceAll('&', '&amp;')
                .replaceAll('<', '&lt;')
                .replaceAll('>', '&gt;')
                .replaceAll('"', '&quot;')
                .replaceAll("'", '&#39;');
        }
    };

    const App = {
        currentUserRole: null,
        autoRefreshHandle: null,
        init() { 
            document.documentElement.setAttribute('data-theme', localStorage.getItem(CONFIG.STORAGE_KEYS.THEME) || 'light');
            const s = localStorage.getItem(CONFIG.STORAGE_KEYS.SESSION); 
            if(s) this.setRole(s); else { document.getElementById('login-screen').style.display='flex'; document.getElementById('main-app').style.display='none'; }
        },
        login() {
            const u = document.getElementById('login-user').value; const p = document.getElementById('login-pass').value;
            if(u==='admin'&&p==='admin') this.setRole('admin'); else if(u==='atendente'&&p==='atendente') this.setRole('atendente'); else alert('Senha errada');
        },
        logout() { localStorage.removeItem(CONFIG.STORAGE_KEYS.SESSION); window.location.reload(); },
        setRole(role) {
            this.currentUserRole = role; localStorage.setItem(CONFIG.STORAGE_KEYS.SESSION, role);
            document.getElementById('login-screen').style.display='none'; document.getElementById('main-app').style.display='block';
            document.getElementById('logged-user-name').innerText = role === 'admin' ? 'Administrador' : 'Atendente';
            document.querySelectorAll('.admin-only').forEach(el => el.style.display = role === 'admin' ? '' : 'none');
            this.openTab('monitor'); this.loadAllData();
        },
        changeTheme(t) { document.documentElement.setAttribute('data-theme', t); localStorage.setItem(CONFIG.STORAGE_KEYS.THEME, t); },
        openTab(id) {
            document.querySelectorAll('.section-content, .tab-btn').forEach(el => el.classList.remove('active'));
            document.getElementById(id).classList.add('active'); document.querySelector(`[data-tab="${id}"]`).classList.add('active');
        },
        async loadAllData() {
            await Promise.all([ Hotspot.loadProfiles(), Hotspot.loadActive(), Financial.loadClients(), Antenna.load() ]);
            POS.loadFromDB(); 
            if(this.currentUserRole === 'admin') {
                await Promise.all([ PPPoE.loadProfiles(), PPPoE.loadDashboard(), Network.loadServices(), Network.loadWifi(), AI.loadTasks() ]);
                HR.loadFromDB();
            }
            Monitor.start();
            
            iniciarCronometro();

            if (!this.autoRefreshHandle && this.currentUserRole === 'admin') {
                this.autoRefreshHandle = setInterval(() => {
                    PPPoE.loadDashboard();
                    Financial.loadClients();
                }, 15000);

                setInterval(() => {
                    if(document.getElementById('pppoe').classList.contains('active')) {
                        PPPoE.refreshTrafficOnly();
                    }
                }, 3000);
            }
            Financial.renderHistory();
        }
    };

    // ========================================
    // MONITOR
    // ========================================
    let monitorChartInstance = null, monitorInterval = null;
    const Monitor = {
        offlineAlertShown: false,
        currentInterface: localStorage.getItem(CONFIG.STORAGE_KEYS.MONITOR_INTERFACE) || '',
        initChart() {
            const ctx = document.getElementById('monitorTrafficChart');
            if (!ctx || monitorChartInstance) return;
            monitorChartInstance = new Chart(ctx, {
                type: 'line',
                data: { labels: [], datasets: [ { label: 'Download', borderColor: '#10b981', data: [], tension: 0.35 }, { label: 'Upload', borderColor: '#4f46e5', data: [], tension: 0.35 } ] },
                options: { responsive: true, animation: false }
            });
        },
        start() {
            this.initChart();
            if ('Notification' in window && Notification.permission === 'default') { Notification.requestPermission().catch(() => {}); }
            this.loadInterfaces();
            this.refresh();
            if (monitorInterval) return;
            monitorInterval = setInterval(() => this.refresh(), 3000);
        },
        pickBestInterface(interfaces = [], defaultInterface = '') {
            if (!interfaces.length) return defaultInterface || 'ether1';
            const saved = interfaces.find(item => item.name === this.currentInterface);
            if (saved) return saved.name;
            const exactDefault = interfaces.find(item => item.name === defaultInterface);
            if (exactDefault) return exactDefault.name;
            const priorities = [ /pppoe-out/i, /^wan/i, /^ether1$/i, /uplink/i, /internet/i ];
            for (const pattern of priorities) {
                const match = interfaces.find(item => item.running && pattern.test(item.name));
                if (match) return match.name;
            }
            const runningEther = interfaces.find(item => item.running && /ether/i.test(item.name));
            if (runningEther) return runningEther.name;
            const runningAny = interfaces.find(item => item.running);
            if (runningAny) return runningAny.name;
            return interfaces[0].name;
        },
        async loadInterfaces() {
            const select = document.getElementById('monitor-interface');
            if (!select) return;
            const data = await Utils.apiRequest('/network/interfaces');
            const interfaces = Array.isArray(data.interfaces) ? data.interfaces : [];
            const defaultInterface = this.currentInterface || data.defaultInterface || 'ether1';
            if (!interfaces.length) {
                select.innerHTML = `<option value="${defaultInterface}">${defaultInterface}</option>`;
                select.value = defaultInterface;
                this.currentInterface = defaultInterface;
                return;
            }
            select.innerHTML = interfaces.map(item => `<option value="${Utils.escapeHtml(item.name)}">${Utils.escapeHtml(item.name)}${item.running ? ' (ativo)' : ''}</option>`).join('');
            this.currentInterface = this.pickBestInterface(interfaces, defaultInterface);
            localStorage.setItem(CONFIG.STORAGE_KEYS.MONITOR_INTERFACE, this.currentInterface);
            select.value = this.currentInterface;
            select.onchange = () => {
                this.currentInterface = select.value;
                localStorage.setItem(CONFIG.STORAGE_KEYS.MONITOR_INTERFACE, this.currentInterface);
                this.refresh();
            };
        },
        handleInternetStatus(status) {
            const alertBox = document.getElementById('internet-alert');
            const statusInput = document.getElementById('monitor-internet-status');
            if (!status || status.online) {
                alertBox.style.display = 'none';
                if (statusInput) statusInput.value = 'Internet ativa';
                this.offlineAlertShown = false;
                return;
            }
            alertBox.style.display = 'block';
            if (statusInput) statusInput.value = status.message || 'Sem internet';
            if (this.offlineAlertShown) return;
            this.offlineAlertShown = true;
            if ('Notification' in window && Notification.permission === 'granted') {
                new Notification('Alerta de Internet', { body: 'A ligacao caiu. Informe os utilizadores imediatamente.' });
            }
        },
        pushTraffic(rx, tx) {
            this.initChart();
            if (!monitorChartInstance) return;
            if (monitorChartInstance.data.labels.length >= 12) {
                monitorChartInstance.data.labels.shift();
                monitorChartInstance.data.datasets.forEach(dataset => dataset.data.shift());
            }
            monitorChartInstance.data.labels.push(new Date().toLocaleTimeString());
            monitorChartInstance.data.datasets[0].data.push(Number(rx) || 0);
            monitorChartInstance.data.datasets[1].data.push(Number(tx) || 0);
            monitorChartInstance.update();
        },
        parseSchedulers(list = []) {
            return list
                .filter(item => item.name && (item.name.startsWith('CORTE_') || item.name.toLowerCase().startsWith('heligrafes@')))
                .map(item => ({
                    client: item.name.startsWith('CORTE_') ? item.name.replace('CORTE_', '') : item.name.replace(/^heligrafes@/i, ''),
                    type: 'PPPoE',
                    nextRun: item['next-run'] || item['start-date'] || 'Sem data',
                    status: item.disabled === 'true' ? 'Pausado' : 'Ativo'
                }))
                .sort((a, b) => a.nextRun.localeCompare(b.nextRun))
                .slice(0, 15);
        },
        renderExpiring(items) {
            const tbody = document.getElementById('tb-expiring');
            const list = document.getElementById('lista-vencendo');
            document.getElementById('monitor-expiring').innerText = items.length;
            if (!items.length) {
                tbody.innerHTML = '<tr><td colspan="4" class="text-center">Sem clientes próximos do prazo</td></tr>';
                list.innerHTML = '<li>Sem clientes próximos do prazo</li>';
                document.getElementById('aviso-vencimento').style.display = 'block';
                return;
            }
            tbody.innerHTML = items.map(item => `<tr><td><strong>${Utils.escapeHtml(item.client)}</strong></td><td>${Utils.escapeHtml(item.type)}</td><td>${Utils.escapeHtml(item.nextRun)}</td><td>${Utils.escapeHtml(item.status)}</td></tr>`).join('');
            list.innerHTML = items.slice(0, 5).map(item => `<li>${Utils.escapeHtml(item.client)} - ${Utils.escapeHtml(item.nextRun)}</li>`).join('');
            document.getElementById('aviso-vencimento').style.display = 'block';
        },
        async refresh() {
            const trafficEndpoint = this.currentInterface ? `/network/traffic?interface=${encodeURIComponent(this.currentInterface)}` : '/network/traffic';
            const [hotspotData, pppData, schedulers, traffic, internetStatus] = await Promise.all([
                Utils.apiRequest('/hotspot/data'),
                Utils.apiRequest('/ppp/dashboard'),
                Utils.apiRequest('/system/schedulers'),
                Utils.apiRequest(trafficEndpoint),
                Utils.apiRequest('/network/status')
            ]);
            const rx = Number(traffic.rx || 0).toFixed(2);
            const tx = Number(traffic.tx || 0).toFixed(2);
            document.getElementById('monitor-rx').innerText = `${rx} Mbps`;
            document.getElementById('monitor-tx').innerText = `${tx} Mbps`;
            document.getElementById('monitor-cpu').innerText = `${pppData.cpu || 0}%`;
            document.getElementById('monitor-hotspot').innerText = Array.isArray(hotspotData.active) ? hotspotData.active.length : 0;
            document.getElementById('monitor-pppoe').innerText = Array.isArray(pppData.users) ? pppData.users.length : 0;
            this.pushTraffic(rx, tx);
            this.renderExpiring(Array.isArray(schedulers) ? this.parseSchedulers(schedulers) : []);
            this.handleInternetStatus(internetStatus);
        }
    };

    // ========================================
    // HOTSPOT
    // ========================================
    const Hotspot = {
        async loadProfiles() {
            const d = await Utils.apiRequest('/hotspot/profiles');
            if (Array.isArray(d) && d.length) { document.getElementById('select-profile').innerHTML = d.map(p => `<option value="${Utils.escapeHtml(p.name)}">${Utils.escapeHtml(p.name)}</option>`).join(''); return; }
            document.getElementById('select-profile').innerHTML = CONFIG.DEFAULT_HOTSPOT_PROFILES.map(name => `<option value="${name}">${name}</option>`).join('');
        },
        async createUsers() {
            const profile = document.getElementById('select-profile').value, timeLimit = document.getElementById('select-time').value, quantity = document.getElementById('select-qty').value;
            if(!profile) return alert('Selecione perfil');
            document.getElementById('btn-criar').innerText = "Processando...";
            const d = await Utils.apiRequest('/hotspot/create', { method: 'POST', body: JSON.stringify({ profile, timeLimit, quantity }) });
            if(d.success) {
                State.lastVouchers = { users: d.users, profile, timeLimit };
                document.getElementById('ticket-result').style.display = 'block';
                document.getElementById('ticket-result').innerHTML = `<h3>✅ ${d.count} Vouchers Gerados!</h3><div id="print-area-vouchers" style="display:flex;flex-wrap:wrap;justify-content:center;gap:15px;background:white;padding:20px;">${d.users.map((u, i) => `<div style="border:2px solid #1e3a8a;border-radius:10px;padding:12px;width:190px;text-align:center;color:black;background:white;font-family:sans-serif;"><div style="font-weight:900;color:#1e3a8a;">HELIGRAFES</div><div id="qr-${i}" style="display:flex;justify-content:center;margin:10px 0;"></div><div style="background:#f3f4f6;padding:8px;font-size:18px;font-weight:900;">${u}</div><div style="font-size:11px;margin-top:10px;">${profile} | ${timeLimit}</div></div>`).join('')}</div><button class="btn-success btn-full mt-2" onclick="Hotspot.printVouchers()">🖨️ Imprimir</button>`;
                d.users.forEach((u, i) => new QRCode(document.getElementById(`qr-${i}`), { text: u, width: 100, height: 100 }));
                if(App.currentUserRole==='admin') AI.saveTask('🎫 Vouchers', `Gerou ${d.count} vouchers`, 'fa-qrcode');
            }
            document.getElementById('btn-criar').innerText = "⚡ Gerar Vouchers";
        },
        printVouchers() { const c = document.getElementById('print-area-vouchers').innerHTML; const j = window.open('','','width=900,height=700'); j.document.write(`<html><head><style>body{margin:0;padding:10mm;} img{margin:0 auto;}</style></head><body><div style="display:flex;flex-wrap:wrap;justify-content:center;">${c}</div><script>setTimeout(()=>{window.print();window.close();},800);<\/script></body></html>`); j.document.close(); },
        
        async loadActive() {
            const d = await Utils.apiRequest('/hotspot/data');
            const tb = document.getElementById('tb-hs-active');
            if (tb && Array.isArray(d.active)) {
                atualizarContagemUsuarios(d.active.length);
                tb.innerHTML = d.active.map(i => {
                    const seg = i.segundosRestantes || 0;
                    return `<tr>
                        <td><strong>${Utils.escapeHtml(i.user)}</strong></td>
                        <td>${Utils.escapeHtml(i.address)}</td>
                        <td>${Utils.escapeHtml(i.uptime)}</td>
                        <td class="tempo-cliente-restante" data-segundos="${seg}">Calculando...</td>
                        <td><button class="btn-action btn-danger" onclick="Hotspot.removeUser('${Utils.escapeHtml(i.user)}')">🚫</button></td>
                    </tr>`;
                }).join('') || '<tr><td colspan="5" class="text-center">Nenhum ativo</td></tr>';
                return;
            }
            tb.innerHTML = `<tr><td colspan="5" class="text-center">${Utils.escapeHtml(d.error || 'Não foi possível carregar')}</td></tr>`;
        },
        async removeUser(u) { if(confirm(`Remover ${u}?`)) { await Utils.apiRequest('/hotspot/remove', { method:'POST', body:JSON.stringify({username:u})}); this.loadActive(); } }
    };

    // ========================================
    // PPPOE (COM CONTAGEM DE TRÁFEGO TOTAL E TEMPO REAL)
    // ========================================
    const PPPoE = {
        describeNextRun(value) {
            const raw = String(value || '').trim();
            if (!raw || raw.toLowerCase() === 'sem data') return 'Sem data';
            if (raw.toLowerCase().includes('prazo terminado')) return 'Venceu';
            const parsed = new Date(raw);
            if (Number.isNaN(parsed.getTime())) return raw;
            const now = new Date();
            now.setHours(0, 0, 0, 0);
            const target = new Date(parsed);
            target.setHours(0, 0, 0, 0);
            const diffDays = Math.round((target - now) / 86400000);
            if (diffDays <= -1) return 'Venceu';
            if (diffDays === 0) return 'Vence hoje';
            if (diffDays === 1) return 'Vence amanha';
            return `Faltam ${diffDays} dias`;
        },
        getExpiryTone(item) {
            const reason = String(item.reason || '').toLowerCase();
            const status = String(item.status || '').toLowerCase();
            if (status.includes('expirado') || reason.includes('expired-profile') || reason.includes('192.168.122/24')) { return { row: 'background:#fef2f2;', badge: 'background:#dc2626;color:#fff;', label: 'Expirado' }; }
            if (status.includes('pausado')) { return { row: 'background:#fff7ed;', badge: 'background:#f59e0b;color:#fff;', label: 'Pausado' }; }
            return { row: 'background:#f0fdf4;', badge: 'background:#16a34a;color:#fff;', label: 'Ativo' };
        },
        async loadProfiles() { const d = await Utils.apiRequest('/ppp/profiles'); if (Array.isArray(d)) { const o = d.map(p => `<option value="${Utils.escapeHtml(p.name)}">${Utils.escapeHtml(p.name)}</option>`).join(''); if (o) { document.getElementById('select-ppp-profile').innerHTML = o; document.getElementById('fin-plano-select').innerHTML = o; return; } } const fallback = CONFIG.DEFAULT_PPP_PROFILES.map(name => `<option value="${name}">${name}</option>`).join(''); document.getElementById('select-ppp-profile').innerHTML = fallback; document.getElementById('fin-plano-select').innerHTML = fallback; },
        async createClient() { const n = document.getElementById('ppp-user').value.trim(); const p = document.getElementById('ppp-pass').value.trim(); const pr = document.getElementById('select-ppp-profile').value; const m = document.getElementById('ppp-months').value; if (!n || !p) return alert('Preencha o utilizador e a senha.'); const res = await Utils.apiRequest('/ppp/create', { method:'POST', body:JSON.stringify({name:n, password:p, profile:pr, months:m})}); if (!res.success) return alert(res.error || 'NÃ£o foi possÃ­vel criar o cliente.'); alert('Cliente criado com sucesso.'); Financial.loadClients(); this.loadDashboard(); },
        
        async loadDashboard() { 
            const d = await Utils.apiRequest('/ppp/dashboard'); 
            document.getElementById('cpu-load').innerText = `${d.cpu || 0}%`; 
            document.getElementById('stat-online').innerText = (d.users || []).length; 
            document.getElementById('stat-total').innerText = State.secrets.length || 0; 
            document.getElementById('stat-expired').innerText = d.expiredCount || 0; 
            
            const tb = document.getElementById('tb-ppp-active'); 
            const expiringTable = document.getElementById('tb-ppp-expiring'); 
            
            if (tb && Array.isArray(d.users)) { 
                let totalRx = 0, totalTx = 0; // Prepara a soma
                
                tb.innerHTML = d.users.map(u => {
                    const safeId = u.name.replace(/[^a-zA-Z0-9]/g, '_');
                    
                    totalRx += Utils.parseTraffic(u.rx);
                    totalTx += Utils.parseTraffic(u.tx);

                    return `
                    <tr>
                        <td><strong>${Utils.escapeHtml(u.name)}</strong></td>
                        <td>${Utils.escapeHtml(u.ip)}</td>
                        <td style="color: #10b981; font-family: monospace; font-weight: bold;" id="rx-${safeId}">${Utils.escapeHtml(u.rx || '0 bps')}</td>
                        <td style="color: #4f46e5; font-family: monospace; font-weight: bold;" id="tx-${safeId}">${Utils.escapeHtml(u.tx || '0 bps')}</td>
                        <td><button class="btn-action btn-danger" onclick="PPPoE.kickUser('${Utils.escapeHtml(u.id)}')">Kick</button></td>
                    </tr>`;
                }).join('') || '<tr><td colspan="5" class="text-center">Nenhum cliente online</td></tr>'; 
                
                // Atualiza as caixas de estatísticas com o tráfego total
                const elRx = document.getElementById('stat-ppp-rx');
                const elTx = document.getElementById('stat-ppp-tx');
                if(elRx) elRx.innerText = Utils.formatTraffic(totalRx);
                if(elTx) elTx.innerText = Utils.formatTraffic(totalTx);
                
                if (expiringTable) { 
                    expiringTable.innerHTML = (d.expiringUsers || []).map(item => { 
                        const tone = PPPoE.getExpiryTone(item); 
                        const dueText = PPPoE.describeNextRun(item.nextRun); 
                        return `<tr style="${tone.row}"><td><strong>${Utils.escapeHtml(item.client)}</strong></td><td><div>${Utils.escapeHtml(item.nextRun)}</div><small style="font-weight:700;">${Utils.escapeHtml(dueText)}</small></td><td><span style="display:inline-block;padding:4px 10px;border-radius:999px;font-size:12px;font-weight:700;${tone.badge}">${tone.label}</span>${item.reason ? ` <small style="font-weight:700;">${Utils.escapeHtml(item.reason)}</small>` : ''}</td></tr>`; 
                    }).join('') || '<tr><td colspan="3" class="text-center">Sem clientes próximos do término</td></tr>'; 
                } 
                return; 
            } 
            tb.innerHTML = `<tr><td colspan="5" class="text-center">${Utils.escapeHtml(d.error || 'Sem dados')}</td></tr>`; 
            if (expiringTable) { 
                expiringTable.innerHTML = `<tr><td colspan="3" class="text-center">${Utils.escapeHtml(d.error || 'Sem dados')}</td></tr>`; 
            } 
        },

        async refreshTrafficOnly() {
            const d = await Utils.apiRequest('/ppp/dashboard'); 
            if (Array.isArray(d.users)) {
                let totalRx = 0, totalTx = 0;
                
                d.users.forEach(u => {
                    const safeId = u.name.replace(/[^a-zA-Z0-9]/g, '_');
                    const rxElement = document.getElementById(`rx-${safeId}`);
                    const txElement = document.getElementById(`tx-${safeId}`);
                    
                    if (rxElement) rxElement.innerText = u.rx || '0 bps';
                    if (txElement) txElement.innerText = u.tx || '0 bps';
                    
                    totalRx += Utils.parseTraffic(u.rx);
                    totalTx += Utils.parseTraffic(u.tx);
                });
                
                const elRx = document.getElementById('stat-ppp-rx');
                const elTx = document.getElementById('stat-ppp-tx');
                if(elRx) elRx.innerText = Utils.formatTraffic(totalRx);
                if(elTx) elTx.innerText = Utils.formatTraffic(totalTx);
            }
        },

        async kickUser(id) { if (!confirm('Deseja desconectar este cliente?')) return; const res = await Utils.apiRequest('/ppp/kick', { method: 'POST', body: JSON.stringify({ id }) }); if (!res.success) return alert(res.error || 'NÃ£o foi possÃ­vel desconectar.'); this.loadDashboard(); }
    };

    // ========================================
    // NETWORK E RESTANTES
    // ========================================
    const Network = {
        initChart() { const ctx = document.getElementById('trafficChart'); if(ctx) trafficChartInstance = new Chart(ctx, { type:'line', data:{labels:[],datasets:[{label:'RX',borderColor:'#10b981',data:[],tension:0.4},{label:'TX',borderColor:'#4f46e5',data:[],tension:0.4}]}, options:{responsive:true,animation:false}}); },
        async toggleTrafficMonitor() { const btn = document.getElementById('btn-monitor'); if(trafficInterval) { clearInterval(trafficInterval); trafficInterval = null; btn.innerHTML = '▶️ Iniciar Monitoramento'; btn.classList.replace('btn-danger', 'btn-info'); } else { if(!trafficChartInstance) this.initChart(); btn.innerHTML = '⏹️ Parar Monitoramento'; btn.classList.replace('btn-info', 'btn-danger'); trafficInterval = setInterval(async () => { let rx = (Math.random()*20).toFixed(2), tx = (Math.random()*10).toFixed(2); const res = await Utils.apiRequest('/network/traffic'); if(res.rx) { rx = res.rx; tx = res.tx; } document.getElementById('txt-rx').innerText = rx; document.getElementById('txt-tx').innerText = tx; if(trafficChartInstance.data.labels.length>10) { trafficChartInstance.data.labels.shift(); trafficChartInstance.data.datasets.forEach(d=>d.data.shift()); } trafficChartInstance.data.labels.push(new Date().toLocaleTimeString()); trafficChartInstance.data.datasets[0].data.push(rx); trafficChartInstance.data.datasets[1].data.push(tx); trafficChartInstance.update(); }, 3000); } },
        async executeCommand() { const c = document.getElementById('cmd-input').value; if(c) { const d = await Utils.apiRequest('/tools/terminal', {method:'POST',body:JSON.stringify({command:c})}); document.getElementById('cmd-output').innerText = d.result||'OK'; } },
        async rebootSystem() { if(confirm('Reiniciar router?')) { await Utils.apiRequest('/system/reboot', {method:'POST'}); alert('Reiniciando...'); } },
        async loadServices() { const data = await Utils.apiRequest('/system/services'); const tbody = document.getElementById('tb-services'); if (Array.isArray(data)) { tbody.innerHTML = data.map(service => `<tr><td>${Utils.escapeHtml(service.name)}</td><td>${Utils.escapeHtml(service.port)}</td><td>${service.disabled === 'true' ? 'Desativado' : 'Ativo'}</td></tr>`).join('') || '<tr><td colspan="3" class="text-center">Sem serviÃ§os</td></tr>'; return; } tbody.innerHTML = `<tr><td colspan="3" class="text-center">${Utils.escapeHtml(data.error || 'Sem resposta')}</td></tr>`; },
        async loadWifi() { const data = await Utils.apiRequest('/wifi'); const tbody = document.getElementById('tb-wifi'); if (Array.isArray(data)) { tbody.innerHTML = data.map(item => `<tr><td>${Utils.escapeHtml(item.name)}</td><td>${item.disabled === 'true' ? 'Desligado' : 'Ligado'}</td><td><button class="btn-action ${item.disabled === 'true' ? 'btn-success' : 'btn-danger'}" onclick="Network.toggleWifi('${Utils.escapeHtml(item['.id'])}', '${item.disabled}')">${item.disabled === 'true' ? 'Ligar' : 'Desligar'}</button></td></tr>`).join('') || '<tr><td colspan="3" class="text-center">Sem interfaces Wi-Fi</td></tr>'; return; } tbody.innerHTML = `<tr><td colspan="3" class="text-center">${Utils.escapeHtml(data.error || 'Sem resposta')}</td></tr>`; },
        async toggleWifi(id, disabled) { const res = await Utils.apiRequest('/wifi/toggle', { method: 'POST', body: JSON.stringify({ id, disabled }) }); if (!res.success) return alert(res.error || 'Falha ao alterar o Wi-Fi.'); this.loadWifi(); },
        async createProfile() { const name = document.getElementById('prof-name').value.trim(); const rate = document.getElementById('prof-rate').value.trim(); const shared = parseInt(document.getElementById('prof-shared').value, 10) || 1; if (!name || !rate) return alert('Preencha nome e rate.'); const res = await Utils.apiRequest('/profile/create', { method: 'POST', body: JSON.stringify({ name, rate, shared }) }); if (!res.success) return alert(res.error || 'Falha ao criar o perfil.'); alert('Perfil criado com sucesso.'); Hotspot.loadProfiles(); }
    };

    const Financial = {
        async loadClients() { const s = await Utils.apiRequest('/ppp/secrets'); State.secrets = Array.isArray(s) ? s : []; if(document.getElementById('fin-cliente-select')) { document.getElementById('fin-cliente-select').innerHTML = '<option value="">Selecione...</option>' + State.secrets.map(c => `<option value="${Utils.escapeHtml(c.name)}">${Utils.escapeHtml(c.name)}</option>`).join(''); } document.getElementById('stat-total').innerText = State.secrets.length; },
        updateTotal() { const m = parseInt(document.getElementById('fin-meses').value)||1; const v = parseFloat(document.getElementById('fin-valor-unitario').value)||0; document.getElementById('fin-valor-total').value = Utils.formatCurrency(m*v); },
        checkExpiration() { const c = document.getElementById('fin-cliente-select').value; document.getElementById('fin-nome-real').value = c; const d = new Date(); d.setDate(d.getDate() + ((parseInt(document.getElementById('fin-meses').value)||1)*30)); document.getElementById('fin-nova-data').innerText = Utils.formatDate(d); },
        async payAndRenew() { const c = document.getElementById('fin-cliente-select').value, n = document.getElementById('fin-nome-real').value||c, v = parseFloat(document.getElementById('fin-valor-total').value.replace(/[^\d,]/g,'').replace(',','.')), p = document.getElementById('fin-plano-select').value; if(c && confirm(`Renovar ${n}?`)) { await Utils.apiRequest('/ppp/renew', {method:'POST',body:JSON.stringify({name:c,newProfile:p})}); const h = Utils.getStorage(CONFIG.STORAGE_KEYS.HISTORY); h.unshift({cliente:n,valor:v,data:Utils.formatDate(),plano:p}); Utils.setStorage(CONFIG.STORAGE_KEYS.HISTORY, h); this.renderHistory(); alert('Renovado!'); } },
        renderHistory() { const h = Utils.getStorage(CONFIG.STORAGE_KEYS.HISTORY); let t = 0; document.getElementById('listaHistorico').innerHTML = h.map(i => { t+=parseFloat(i.valor||0); return `<div style="padding:10px;border-bottom:1px solid #eee;"><strong>${Utils.escapeHtml(i.cliente)}</strong> - <span style="color:green;">${Utils.formatCurrency(i.valor)}</span><br><small>${Utils.escapeHtml(i.data)} | ${Utils.escapeHtml(i.plano)}</small></div>`; }).join('')||'<p>Vazio</p>'; document.getElementById('total-arrecadado').innerText = Utils.formatCurrency(t); },
        sendWhatsApp() { const phone = document.getElementById('fin-whatsapp').value.replace(/\D/g, ''); const client = document.getElementById('fin-nome-real').value || document.getElementById('fin-cliente-select').value; const plan = document.getElementById('fin-plano-select').value; const total = document.getElementById('fin-valor-total').value; const dueDate = document.getElementById('fin-nova-data').innerText; if (!phone) return alert('Informe o numero de WhatsApp.'); const message = encodeURIComponent(`Olá ${client}, pagamento registado com sucesso.\nPlano: ${plan}\nTotal: ${total}\nNovo vencimento: ${dueDate}`); window.open(`https://wa.me/${phone}?text=${message}`, '_blank'); }
    };

    const POS = {
        cart: [],
        addCart(desc, val) { this.cart.push({ id: Date.now(), desc, val }); this.renderCart(); },
        addCustomCart() { const d = document.getElementById('pos-desc').value, v = document.getElementById('pos-val').value; if(d&&v) { this.addCart(d,parseFloat(v)); document.getElementById('pos-desc').value=''; document.getElementById('pos-val').value=''; } },
        removeCart(id) { this.cart = this.cart.filter(i => i.id !== id); this.renderCart(); },
        renderCart() { let t = 0; document.getElementById('pos-cart-list').innerHTML = this.cart.map(i => { t += i.val; return `<li style="display:flex;justify-content:space-between;padding:5px 0;"><span>${i.desc}</span> <span>${Utils.formatCurrency(i.val)} <button style="color:red;border:none;background:none;cursor:pointer;" onclick="POS.removeCart(${i.id})">✖</button></span></li>`; }).join(''); document.getElementById('pos-cart-total').innerText = Utils.formatCurrency(t); },
        async checkout() { if(this.cart.length === 0) return; const data = new Date().toLocaleDateString('pt-AO'); let t = 0; for(const item of this.cart) { const res = await Utils.apiRequest('/caixa', { method: 'POST', body: JSON.stringify({ desc: item.desc, val: item.val, data, author: App.currentUserRole }) }); if(!res.success) { const local = Utils.getStorage('isp_caixa_local'); local.unshift({desc:item.desc,val:item.val,data,author:App.currentUserRole}); Utils.setStorage('isp_caixa_local',local); } t += item.val; } this.cart = []; this.renderCart(); this.loadFromDB(); alert(`Venda finalizada: ${Utils.formatCurrency(t)}`); },
        async loadFromDB() { let h = await Utils.apiRequest('/caixa'); if(!h || !h.length) h = Utils.getStorage('isp_caixa_local'); const today = new Date().toLocaleDateString('pt-AO'); let t = 0; document.getElementById('lista-caixa').innerHTML = h.map(i => { if(i.data===today) t+=parseFloat(i.val); return `<div style="padding:10px;border-bottom:1px solid #eee;display:flex;justify-content:space-between;"><div><strong>${i.desc}</strong> <small>(${i.author})</small></div><div style="color:green;font-weight:bold;">${Utils.formatCurrency(i.val)}</div></div>`; }).join('')||'<p style="text-align:center;">Vazio</p>'; document.getElementById('caixa-total-hoje').innerText = Utils.formatCurrency(t); }
    };

    const HR = {
        async addEmployee() { const n = document.getElementById('rh-nome').value, c = document.getElementById('rh-cargo').value, b = parseFloat(document.getElementById('rh-salario').value); if(n&&b) { const r = await Utils.apiRequest('/rh', { method: 'POST', body: JSON.stringify({ nome:n, cargo:c, base:b }) }); if(!r.success) { const loc = Utils.getStorage('isp_rh_local'); loc.push({id:Date.now(),nome:n,cargo:c,base:b,faltas:0}); Utils.setStorage('isp_rh_local',loc); } this.loadFromDB(); } },
        async updateAbsence(id, f, c) { let nf = f+c; if(nf<0) nf=0; const r = await Utils.apiRequest(`/rh/${id}/faltas`, {method:'PUT',body:JSON.stringify({faltas:nf})}); if(!r.success) { const loc=Utils.getStorage('isp_rh_local'); const i=loc.findIndex(x=>x.id===id); if(i>-1) {loc[i].faltas=nf; Utils.setStorage('isp_rh_local',loc);}} this.loadFromDB(); },
        async loadFromDB() { let emp = await Utils.apiRequest('/rh'); if(!emp || !emp.length) emp = Utils.getStorage('isp_rh_local'); document.getElementById('tb-rh').innerHTML = emp.map(e => { const liq = e.base - ((e.base/30)*e.faltas); return `<tr><td><strong>${e.nome}</strong></td><td>${e.cargo}</td><td>${Utils.formatCurrency(e.base)}</td><td><button class="btn-action btn-danger" onclick="HR.updateAbsence(${e.id},${e.faltas},1)">+ Falta</button> <span style="font-weight:bold;margin:0 10px;">${e.faltas}</span> <button class="btn-action btn-info" onclick="HR.updateAbsence(${e.id},${e.faltas},-1)">- Retirar</button></td><td style="color:var(--primary);font-weight:bold;">${Utils.formatCurrency(liq)}</td><td><button class="btn-action btn-danger">🗑️</button></td></tr>`; }).join('')||'<tr><td colspan="6" class="text-center">Vazio</td></tr>'; }
    };

    const Contract = { print() { ['c_nome','c_bi','c_endereco','c_telefone','c_plano','c_valor'].forEach(id => { document.getElementById(id.replace('c_','p_')).innerText = document.getElementById(id).value||'____'; }); document.getElementById('data_extenso').innerText = Utils.formatDateExt(); document.getElementById('area-impressao').style.display = 'block'; window.print(); document.getElementById('area-impressao').style.display = 'none'; } };
    const Antenna = { add() { const n=document.getElementById('ant-nome').value,ip=document.getElementById('ant-ip').value; if(n&&ip) { const a=Utils.getStorage(CONFIG.STORAGE_KEYS.ANTENNAS); a.push({nome:n,ip:ip,rua:document.getElementById('ant-rua').value,tel:document.getElementById('ant-tel').value}); Utils.setStorage(CONFIG.STORAGE_KEYS.ANTENNAS,a); this.load(); } }, load() { const a=Utils.getStorage(CONFIG.STORAGE_KEYS.ANTENNAS); document.getElementById('tb-antenas').innerHTML = a.map((i,idx)=>`<tr><td>${i.nome}</td><td>${i.ip}</td><td>${i.rua}</td><td>${i.tel}</td><td><button class="btn-action btn-danger" onclick="Antenna.remove(${idx})">🗑️</button></td></tr>`).join('')||'<tr><td colspan="5" class="text-center">Vazio</td></tr>'; }, remove(idx) { let a=Utils.getStorage(CONFIG.STORAGE_KEYS.ANTENNAS); a.splice(idx,1); Utils.setStorage(CONFIG.STORAGE_KEYS.ANTENNAS,a); this.load(); } };
    const AI = { init() {}, sendText() { const t = document.getElementById('ai-input-text').value; if(t) { document.getElementById('chat-history').innerHTML += `<div class="ai-message user">${t}</div><div class="ai-message">Entendido. Ação processada localmente.</div>`; document.getElementById('ai-input-text').value=''; } }, toggleVoice() { alert("Voz ativada!"); }, saveTask(t,txt,ic) {}, loadTasks() {} };

    window.addEventListener('load', () => App.init());

</script>
</body>
</html>
