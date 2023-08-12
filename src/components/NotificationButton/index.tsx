import { scheduleNotification } from "@utils/NotificationManager"

import { Title } from "@components/common/Title/styles"
import { NotificationButtonContainer } from "./styles"
import { Button } from "@components/common/Button/styles"
import { constants } from "../../theme/constants"

import { Alert } from "react-native"

export const NotificationButton = () => {

  // const handleScheduleNotification = () => {
  //   Alert.alert("Notificação agendada", "A notificação solicitada foi agendada com sucesso")
  // }

  const handleNotification = async () => {
    try {
      const title = 'Previsão do tempo de hoje!!';
      const body = 'Esta é a previsão do tempo para hoje: 32 graus com pouca chance de chuva.';
      const seconds = 5;

      const identifier = await scheduleNotification(title, body, seconds);
      console.log('Notificação agendada com o ID:', identifier);
      Alert.alert("Notificação agendada", "A notificação solicitada foi agendada com sucesso")
    } catch (error) {
      console.error('Erro ao agendar notificação:', error);
    }
  };

  return <NotificationButtonContainer>
      <Button 
      color={constants.COLORS.GREEN_CONFIRM}
      onPress={handleNotification}>

        <Title
          fontStyle="REGULAR"
          fontSize="25px"
          color={constants.COLORS.WHITE}
        >
          Ativar Lembretes
        </Title>
      </Button>
    </NotificationButtonContainer>
}

