export async function requestNotificationPermission() {
  if (!('Notification' in window)) return false;

  if (Notification.permission === 'granted') return true;

  const result = await Notification.requestPermission();
  return result === 'granted';
}

export function sendNotification(title: string, body: string) {
  if (Notification.permission !== 'granted') return;

  new Notification(title, {
    body,
    icon: '/icon.png', // optional
  });
}
