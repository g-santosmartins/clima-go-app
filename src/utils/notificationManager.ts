import * as Notifications from 'expo-notifications';

const DEBUG = false;

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export const scheduleNotification = async (title: string, body: string, hour: number, minute: number, repeat: boolean) => {
      const now = new Date();
      const scheduledTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hour, minute);
      
      if (scheduledTime < now) {
        scheduledTime.setDate(now.getDate() + 1);
      }
      
  const identifier = await Notifications.scheduleNotificationAsync({
    content: {
      title,
      body,
    },
    trigger: {
      hour: scheduledTime.getHours(),
      minute: scheduledTime.getMinutes(),
      repeats: repeat,
    }
  });
  return identifier;
};

export const cancelAllNotifications = () => {
  Notifications.cancelAllScheduledNotificationsAsync()
  if(DEBUG) return console.log("All notifications have been removed")
}
