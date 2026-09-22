window.WS = {
    socket: null,
    connected: false,
    reconnectTimer: null,
    reconnectDelay: 3000,
    url: null,

    init(){
        // Detecta dinámicamente el host/IP actual
        this.url =
            (location.protocol === 'https:' ? 'wss://' : 'ws://') +
            location.hostname + 
            '/ws/local/connect';

        this.connect();
    },

    connect(){
        if (this.socket && (this.socket.readyState === WebSocket.OPEN || this.socket.readyState === WebSocket.CONNECTING)){
            return;
        }

        console.log('🔌 WS conectando...');
        this.socket = new WebSocket(this.url);

        this.socket.onopen = () => {
            console.log('🟢 WS conectado');
            this.connected = true;
        };

        this.socket.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                this.receive(data);
            } catch(e){
                console.error('WS mensaje inválido', event.data);
            }
        };

        this.socket.onclose = () => {
            console.log('🔴 WS desconectado');
            this.connected = false;
            this.reconnect(); // Descomentado para activar auto-reconexión
        };

        this.socket.onerror = (error) => {
            console.error('❌ WS error', error);
        };
    },

    send(data){
        if (!this.socket || this.socket.readyState !== WebSocket.OPEN){
            console.warn('WS no conectado', data);
            return false;
        }
        this.socket.send(JSON.stringify(data));
        return true;
    },

    receive(data){
        // ... (Tu lógica actual de filtros de "auth", "workflow", "solicitudes", etc.)
        if(data.type === 'workflow'){
            this.workflow(data);
            return;
        }
        // ... rest de filtros
    },

    workflow(data){
        console.log('🔄 Workflow actualizado', data);
        if(typeof window.workflowUpdate === 'function'){
            window.workflowUpdate(data.data);
        }
    },

    reconnect(){
        if(this.reconnectTimer) return;

        this.reconnectTimer = setTimeout(() => {
            this.reconnectTimer = null;
            this.connect();
        }, this.reconnectDelay);
    }
};

// Exportación por si deseas importarlo en archivos tipo módulo
export const WS = window.WS;
