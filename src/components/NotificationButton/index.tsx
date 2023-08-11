
import { Title } from "@components/common/Title/styles"
import { NotificationButtonContainer } from "./styles"
import { Button } from "@components/common/Button/styles"
import { Alert } from "react-native"
import { constants } from "../../theme/constants"

export const NotificationButton = () => {

  const handleScheduleNotification = () => {
    Alert.alert("Notificação agendada", "A notificação solicitada foi agendada com sucesso")
  }
  return <NotificationButtonContainer>
      <Button 
      color={constants.COLORS.RED_ERROR}
      onPress={handleScheduleNotification}>

        <Title
          fontStyle="REGULAR"
          fontSize="25px"
          color={constants.COLORS.WHITE}
        >
          Desativar lembretes
        </Title>
      </Button>
    </NotificationButtonContainer>
}

