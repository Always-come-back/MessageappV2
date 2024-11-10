export class NotificationManager {
    constructor() {
        this.init();
    }

    async init() {
        if (!("Notification" in window)) {
            console.log("Bu tarayıcı bildirim desteği sunmuyor");
            return;
        }

        if (Notification.permission === "default") {
            await Notification.requestPermission();
        }
    }

    async sendNotification(title, options = {}) {
        if (Notification.permission === "granted") {
            const notification = new Notification(title, {
                icon: '/vite.svg',
                badge: '/vite.svg',
                ...options
            });

            notification.onclick = function() {
                window.focus();
                this.close();
            };
        }
    }
}